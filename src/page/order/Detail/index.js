import React, { useState, useEffect } from 'react'
import { Header, HeaderLeft, HeaderBody } from '@elevenia/master-ui/components/Organisms/Mobile'
import {
    ButtonLink,
    Icon,
    Container,
    Row,
    Col,
    Text,
    Segment,
    Spinner,
} from '@elevenia/master-ui/components/Atom'
import { connect } from 'react-redux'
import { getOrderDetail, requestDownloadShippingLabel } from 'store/actions/order'
import moment from 'moment'
import { formatRupiah } from 'helper'
const convertOrderStatus = type => {
    switch (type) {
        case 'NEW_ORDER':
            return 'Pesanan Baru'
        case 'PRE_ORDER':
            return 'Pre Order'
        case 'ON_PROCESS':
            return 'Perlu Dikirim'
        case 'SENT':
            return 'Dalam Pengiriman'
        case 'DELIVERED':
            return 'Diterima'
        case 'PURCHASED':
            return 'Terkonfirmasi'
        default:
            return ''
    }
}
const OrderDetail = props => {
    const { match, getOrderDetail, order, setAlerts, requestDownloadShippingLabel } = props
    const [initial, setInitial] = useState(false)
    useEffect(() => {
        if (!initial) {
            getOrderDetail(match.params.deliveryId)
            setInitial(true)
        }
    }, [match.params.deliveryId, initial, getOrderDetail])
    const data = order.detail.data
    const downLoadData = async () => {
        const params = { orderId: data.orderId, deliveryId: data.deliveryId }
        await requestDownloadShippingLabel(params)
    }
    return (
        <>
            {setAlerts.alert.status && setAlerts.alert.componentMessage}
            <Header fixed border>
                <HeaderLeft>
                    <ButtonLink onClick={() => props.history.goBack()}>
                        <Icon fillColor="black50" name="arrow-left" size={24} />
                    </ButtonLink>
                </HeaderLeft>
                <HeaderBody>Detail Pesanan</HeaderBody>
            </Header>
            {!order.detail.isLoaded ? (
                <Segment width="100%" height={30} py={5} className="u-tx-center">
                    <Spinner />
                </Segment>
            ) : data ? (
                <Container mb={16}>
                    <Row px={16} pt={16} pb={8}>
                        <Col wide={8}>
                            <Text B10 color="black50" fontWeight="500">
                                No Pesanan : {data.orderId}
                            </Text>
                        </Col>
                        <Col wide={4} className="u-tx-right">
                            <Text B10 color="black50" fontWeight="500">
                                {moment.utc(data.orderDate).format('DD MMM YYYY, HH:mm')}
                            </Text>
                        </Col>
                    </Row>
                    <Row bg="white" px={16} py={16} borderBottom="1px solid black30">
                        <Col wide={8}>
                            <Text B10 color="black50" fontWeight="500">
                                STATUS TERAKHIR
                            </Text>
                            <Text B14 color="black70">
                                {convertOrderStatus(data.orderStatus)}
                            </Text>
                            <Text B10 color="black50">
                                (Pembayaran selesai.{' '}
                                {moment.utc(data.orderDate).format('DD MMM YYYY, HH:mm')})
                            </Text>
                        </Col>
                        {data.orderStatus === 'ON_PROCESS' || data.orderStatus === 'NEW_ORDER' ? (
                            <Col wide={4} className="u-tx-right">
                                <Text B10 color="black50" fontWeight="500">
                                    BATAS RESPON
                                </Text>
                                <Text B10 fontWeight="500" className="u-mt-8">
                                    <span className="u-bg-white u-tx-black70 u-bd u-bd-black30 u-rnd u-p-4">
                                        {data.deadlineDate}
                                    </span>
                                </Text>
                            </Col>
                        ) : (
                            ''
                        )}
                    </Row>
                    <Row bg="white" p={16}>
                        <Col>
                            <Text B10 color="black50" fontWeight="500">
                                PENGIRIMAN
                            </Text>
                            <Text B14 color="black70">
                                {data.delivery.courierName}
                            </Text>
                        </Col>
                    </Row>
                    {/*
                     * Informasi Pembeli
                     */}
                    <Row px={16} pt={16} pb={8}>
                        <Col>
                            <Text B14 color="black70" fontWeight="500">
                                Informasi Pembeli
                            </Text>
                        </Col>
                    </Row>
                    <Row bg="white" px={16} py={16} borderBottom="1px solid black30">
                        <Col>
                            <Text B10 color="black50" fontWeight="500">
                                NAMA
                            </Text>
                            <Text B14 color="black70">
                                {data.buyerName}
                            </Text>
                        </Col>
                    </Row>
                    <Row bg="white" px={16} py={16} borderBottom="1px solid black30">
                        <Col>
                            <Text B10 color="black50" fontWeight="500">
                                NOMOR PONSEL
                            </Text>
                            <Text B14 color="black70">
                                {data.buyerPhone}
                            </Text>
                        </Col>
                    </Row>
                    <Row bg="white" p={16}>
                        <Col>
                            <Text B10 color="black50" fontWeight="500">
                                ALAMAT
                            </Text>
                            <Text B14 color="black70">
                                {data.buyerAddress}
                            </Text>
                        </Col>
                    </Row>
                    {/*
                     * Label Pengiriman
                     */}
                    {data.orderStatus === 'ON_PROCESS' && (
                        <>
                            <Row px={16} pt={16} pb={8}>
                                <Col>
                                    <Text B14 color="black70" fontWeight="500">
                                        Label Pengiriman
                                    </Text>
                                </Col>
                            </Row>
                            <Row bg="white" px={16} py={16}>
                                <Col>
                                    <Text B14 color="black70">
                                        Unduh Label Pegiriman
                                    </Text>
                                </Col>
                                <Col className="u-tx-right">
                                    {order.downloadShippingLabel.isLoading ? (
                                        <Segment height={16}>
                                            <Spinner />
                                        </Segment>
                                    ) : (
                                        <ButtonLink onClick={() => downLoadData()}>
                                            <Icon
                                                fillColor="secondaryGreen"
                                                name="download-full"
                                                size={16}
                                            />
                                        </ButtonLink>
                                    )}
                                </Col>
                            </Row>
                        </>
                    )}

                    {/*
                     * Informasi Pesanan
                     */}
                    <Row px={16} pt={16} pb={8}>
                        <Col>
                            <Text B14 color="black70" fontWeight="500">
                                Informasi Pesanan
                            </Text>
                        </Col>
                    </Row>
                    <Row bg="white" px={16} py={8} borderBottom="1px solid black30">
                        <Col wide={4}>
                            <Text B10 color="black50" fontWeight="500">
                                Nama Produk
                            </Text>
                        </Col>
                        <Col wide={8}>
                            <Row>
                                <Col>
                                    <Text B10 color="black50" fontWeight="500">
                                        Opsi
                                    </Text>
                                </Col>
                                <Col>
                                    <Text B10 color="black50" fontWeight="500">
                                        Berat
                                    </Text>
                                </Col>
                                <Col>
                                    <Text B10 color="black50" fontWeight="500">
                                        Kuantitas
                                    </Text>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {data.orderProducts.map((list, index) => (
                        <Row bg="white" px={16} py={8} key={index}>
                            <Col wide={4}>
                                <Text B12 color="black50">
                                    {list.productName}
                                </Text>
                            </Col>
                            <Col wide={8}>
                                <Row>
                                    <Col>
                                        <Text B12 color="black50">
                                            {list.productOptionName}
                                        </Text>
                                    </Col>
                                    <Col>
                                        <Text B12 color="black50">
                                            {list.productWeight} {list.productWeightUnit}
                                        </Text>
                                    </Col>
                                    <Col>
                                        <Text B12 color="black50">
                                            {list.quantity}
                                        </Text>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    ))}
                    {/*
                     *Pendapatan
                     */}
                    <Row px={16} pt={16} pb={8}>
                        <Col>
                            <Text B14 color="black70" fontWeight="500">
                                Pendapatan
                            </Text>
                        </Col>
                    </Row>
                    <Row bg="white" px={16} py={16} borderBottom="1px solid black30">
                        <Col>
                            <Text B14 color="black50">
                                Total Harga Produk
                            </Text>
                        </Col>
                        <Col className="u-tx-right">
                            <Text B14 color="black70">
                                {formatRupiah(data.income.totalProductPrice, 'Rp')}
                            </Text>
                        </Col>
                    </Row>
                    <Row bg="white" px={16} py={16} borderBottom="1px solid black30">
                        <Col>
                            <Text B14 color="black50">
                                Biaya Pengiriman ({data.delivery.courierName})
                            </Text>
                        </Col>
                        <Col className="u-tx-right">
                            <Text B14 color="black70">
                                {formatRupiah(data.income.deliveryFee, 'Rp')}
                            </Text>
                        </Col>
                    </Row>
                    <Row bg="white" px={16} py={16} borderBottom="1px solid black30">
                        <Col>
                            <Text B14 color="black50">
                                Biaya Transaksi{' '}
                                {data.income.transactionFeeRate
                                    ? `(${data.income.transactionFeeRate})%`
                                    : ''}
                            </Text>
                        </Col>
                        <Col className="u-tx-right">
                            <Text B14 color="black70">
                                {formatRupiah(data.income.transactionFee, 'Rp')}
                            </Text>
                        </Col>
                    </Row>
                    <Row bg="white" px={16} py={16} borderBottom="1px solid black30">
                        <Col>
                            <Text B14 color="black50">
                                BIAYA PENJUAL
                            </Text>
                        </Col>
                        <Col className="u-tx-right">
                            <Text B14 color="black70">
                                {formatRupiah(data.income.paidBySeller, 'Rp')}
                            </Text>
                        </Col>
                    </Row>
                    <Row bg="white" px={16} py={16}>
                        <Col>
                            <Text B14 color="black50">
                                ESTIMASI PENDAPATAN
                            </Text>
                        </Col>
                        <Col className="u-tx-right">
                            <Text B14 color="black70" fontWeight="500">
                                {formatRupiah(data.income.estimatedIncome, 'Rp')}
                            </Text>
                        </Col>
                    </Row>
                    {/*
                     *Pengiriman
                     */}
                    <Row px={16} pt={16} pb={8}>
                        <Col>
                            <Text B14 color="black70" fontWeight="500">
                                Informasi Pengiriman
                            </Text>
                        </Col>
                    </Row>
                    <Row bg="white" px={16} py={16} borderBottom="1px solid black30">
                        <Col>
                            <Text B14 color="black50">
                                Metode Pengiriman
                            </Text>
                        </Col>
                        <Col className="u-tx-right">
                            <Text B14 color="black70">
                                {data.delivery.courierName ? data.delivery.courierName : '-'}
                            </Text>
                        </Col>
                    </Row>
                    <Row bg="white" px={16} py={16} borderBottom="1px solid black30">
                        <Col>
                            <Text B14 color="black50">
                                Nomor Pre AWB
                            </Text>
                        </Col>
                        <Col className="u-tx-right">
                            <Text B14 color="black70">
                                {data.delivery.preAwb ? data.delivery.preAwb : '-'}
                            </Text>
                        </Col>
                    </Row>
                    <Row bg="white" px={16} py={16} borderBottom="1px solid black30">
                        <Col>
                            <Text B14 color="black50">
                                Nomor Resi
                            </Text>
                        </Col>
                        <Col className="u-tx-right">
                            <Text B14 color="black70">
                                {data.delivery.awb ? data.delivery.awb : '-'}
                            </Text>
                        </Col>
                    </Row>
                    <Row bg="white" px={16} py={16} borderBottom="1px solid black30">
                        <Col>
                            <Text B14 color="black50">
                                Alasan Resi Invalid
                            </Text>
                        </Col>
                        <Col className="u-tx-right">
                            <Text B14 color="black70">
                                {data.delivery.awbInvalidReason
                                    ? data.delivery.awbInvalidReason
                                    : '-'}
                            </Text>
                        </Col>
                    </Row>
                    <Row bg="white" px={16} py={16} borderBottom="1px solid black30">
                        <Col>
                            <Text B14 color="black50">
                                Biaya Pengiriman
                            </Text>
                        </Col>
                        <Col className="u-tx-right">
                            <Text B14 color="black70">
                                {formatRupiah(data.delivery.deliveryFee, 'Rp')}
                            </Text>
                        </Col>
                    </Row>
                    <Row bg="white" px={16} py={16} borderBottom="1px solid black30">
                        <Col>
                            <Text B14 color="black50">
                                Asuransi Pengiriman
                            </Text>
                        </Col>
                        <Col className="u-tx-right">
                            <Text B14 color="black70">
                                {formatRupiah(data.delivery.insuranceFee, 'Rp')}
                            </Text>
                        </Col>
                    </Row>
                    <Row bg="white" px={16} py={16} borderBottom="1px solid black30">
                        <Col>
                            <Text B14 color="black50">
                                Diskon Pengiriman
                            </Text>
                        </Col>
                        <Col className="u-tx-right">
                            <Text B14 color="black70">
                                {formatRupiah(data.delivery.deliveryDiscount, 'Rp')}
                            </Text>
                        </Col>
                    </Row>
                    <Row bg="white" px={16} py={16}>
                        <Col>
                            <Text B10 color="black50" fontWeight="500">
                                CATATAN PEMBELIAN
                            </Text>
                            <Text B14 color="black70">
                                {data.note ? data.note : '-'}
                            </Text>
                        </Col>
                    </Row>
                    {/*
                     *Indopaket
                     */}
                    {data.delivery.indopaket !== null &&
                    (data.delivery.indopaket.pickupPoint ||
                        data.delivery.indopaket.dropoffPoint) ? (
                        <>
                            <Row px={16} pt={16} pb={8}>
                                <Col>
                                    <Text B14 color="black70" fontWeight="500">
                                        Lokasi Drop Off
                                    </Text>
                                </Col>
                            </Row>
                            <Row bg="white" px={16} py={16} borderBottom="1px solid black30">
                                <Col>
                                    <Text B10 color="black50" fontWeight="500">
                                        SELLER DROP OFF Point
                                    </Text>
                                    <Text B14 color="black70">
                                        {data.delivery.indopaket.pickupPoint
                                            ? data.delivery.indopaket.pickupPoint
                                            : '-'}
                                    </Text>
                                </Col>
                            </Row>
                            <Row bg="white" px={16} py={16}>
                                <Col>
                                    <Text B10 color="black50" fontWeight="500">
                                        BUYER DROP OFF Point
                                    </Text>
                                    <Text B14 color="black70">
                                        {data.delivery.indopaket.dropoffPoint
                                            ? data.delivery.indopaket.dropoffPoint
                                            : '-'}
                                    </Text>
                                </Col>
                            </Row>
                        </>
                    ) : null}
                </Container>
            ) : (
                <Container py={'40vh'} className="u-tx-center">
                    <Row>
                        <Col>Gagal Mengambil Data</Col>
                    </Row>
                </Container>
            )}
        </>
    )
}

const mapStateToProps = ({ order, setAlerts }) => ({
    order,
    setAlerts,
})
const mapDispatchToProps = {
    getOrderDetail,
    requestDownloadShippingLabel,
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
