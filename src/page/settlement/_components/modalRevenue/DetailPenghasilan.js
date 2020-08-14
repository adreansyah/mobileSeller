import React from 'react';
import {Icon,ButtonLink,Text,Row,Col} from '@elevenia/master-ui/components/Atom';
import {Tray,TrayHeader,TrayTitle} from '@elevenia/master-ui/components/Molecules';
import Segment from '@elevenia/master-ui/components/Atom/Segment';
import {useSelector} from 'react-redux';
import {formatRupiah} from 'helper';


const DetailPenghasilan = props => {
    const {onModalDetail,isOpen} = props
    const settlement = useSelector(state => state.settlement);
    return (
        <Tray isOpen={isOpen} overlayClick={onModalDetail}>
            <TrayHeader>
                <TrayTitle>Detail Penghasilan</TrayTitle>
                <ButtonLink onClick={onModalDetail}>
                    <Icon name="cancel" size="24" fillColor="black50" />
                </ButtonLink>
            </TrayHeader>
            <Segment bg="white" className="line" pb={16}>
                <Text H14 color="black70" px={16} pt={16}>
                    Total Penjualan
                </Text>
                <Row px={16} pt={12}>
                    <Col wide={4}>
                        <Text H14 color="black50">Harga Produk</Text>
                    </Col>
                    <Col wide={8} className="u-tx-right">
                        <Text H14 color="black70">Rp {formatRupiah(settlement.dataHistory.productPrice)}</Text>
                    </Col>
                </Row>
                <Row px={16} pt={6}>
                    <Col wide={4}>
                        <Text H14 color="black50">Ongkos Kirim</Text>
                    </Col>
                    <Col wide={8} className="u-tx-right">
                        <Text H14 color="black70">Rp {formatRupiah(settlement.dataHistory.deliveryFee)}</Text>
                    </Col>
                </Row>
            </Segment>
            <Segment bg="white" className="line" pb={12}>
                <Text H14 color="black70" px={16} pt={16}>
                    Total Penghasilan
                </Text>
                <Row px={16} pt={12}>
                    <Col wide={4}>
                        <Text H14 color="black50">Biaya Transaksi</Text>
                    </Col>
                    <Col wide={8} className="u-tx-right">
                        <Text H14 color="black70">Rp {formatRupiah(settlement.dataHistory.transactionFee)}</Text>
                    </Col>
                </Row>
                <Row px={16} pt={6}>
                    <Col wide={4}>
                        <Text H14 color="black50">Diskon Seller</Text>
                    </Col>
                    <Col wide={8} className="u-tx-right">
                        <Text H14 color="black70">Rp {formatRupiah(settlement.dataHistory.sellerDiscount)}</Text>
                    </Col>
                </Row>
                <Row px={16} pt={6}>
                    <Col wide={4}>
                        <Text H14 color="black50">Diskon Grosir</Text>
                    </Col>
                    <Col wide={8} className="u-tx-right">
                        <Text H14 color="black70">Rp {formatRupiah(settlement.dataHistory.wholeSaleDiscount)}</Text>
                    </Col>
                </Row>
                <Row px={16} pt={6}>
                    <Col wide={4}>
                        <Text H14 color="black50">Poin & Token</Text>
                    </Col>
                    <Col wide={8} className="u-tx-right">
                        <Text H14 color="black70">Rp {formatRupiah(settlement.dataHistory.point + settlement.dataHistory.token)}</Text>
                    </Col>
                </Row>
            </Segment>
            <Segment bg="white" className="line" pb={12}>
                <Row px={16} pt={12}>
                    <Col wide={6}>
                        <Text H14 color="black70">Total Uang Diterima</Text>
                    </Col>
                    <Col wide={6} className="u-tx-right">
                        <Text H14 color="black70">Rp {formatRupiah(settlement.dataHistory.netIncome)}</Text>
                    </Col>
                </Row>
            </Segment>
        </Tray >
    )
}

export default DetailPenghasilan;