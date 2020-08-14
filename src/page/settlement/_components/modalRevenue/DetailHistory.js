import React,{useEffect} from "react";
import {Icon,ButtonLink,Text,Row,Col,Segment} from '@elevenia/master-ui/components/Atom';
import {TrayFull} from '@elevenia/master-ui/components/Molecules';
import {Header,HeaderLeft} from "@elevenia/master-ui/components/Organisms/Mobile";
import {formatRupiah} from "helper";
import moment from "moment";

const DetailHistory = props => {
    const {setDetailHistory,isOpen,SettlementOrders,isTransactionDate,settlement} = props;
    useEffect(() => {
        isOpen && SettlementOrders(isTransactionDate);
    },[isOpen,isTransactionDate,SettlementOrders]);

    return (
        <TrayFull isOpen={isOpen} overlayClick={setDetailHistory}>
            <Header fixed>
                <HeaderLeft>
                    <ButtonLink onClick={setDetailHistory}>
                        <Icon name="arrow-left" size="24" fillColor="black50" />
                    </ButtonLink>
                </HeaderLeft>
                <Text H16>Periode {moment(isTransactionDate).format('DD MMMM YYYY')}</Text>
            </Header>
            <Segment p={16}>
                <Text H14>Ringkasan Transaksi</Text>
            </Segment>
            <Segment bg="white" p={16}>
                {
                    settlement.dataHistoryDetail.orders.map((item,index) => {
                        return (
                            <Row p={4} key={index}>
                                <Col wide={7}>
                                    <Text color="black50">{item.orderId}</Text>
                                </Col>
                                <Col wide={5}>
                                    <Text H14 color="black70" className="u-tx-right">{formatRupiah(item.saleAmount)}</Text>
                                </Col>
                            </Row>
                        )
                    })
                }
                <Segment py={4} borderBottom="1px dashed #4e4e4e"></Segment>
                <Row pt={12}>
                    <Col wide={7}>
                        <Text color="black50">Total Uang Diterima</Text>
                    </Col>
                    <Col wide={5}>
                        <Text H14 color="green50" className="u-tx-right">Rp {formatRupiah(settlement.dataHistoryDetail.totalIncomeAmount)}</Text>
                    </Col>
                </Row>
            </Segment>
            {
                settlement.dataHistoryDetail.orderDetails.map((item,index) => {
                    return (
                        <Segment p={16} key={index}>
                            <Text H14 pb={12}>No. Pemesanan: {item.orderId}</Text>
                            <Segment p={12} bg="white" borderRadius={10}>
                                <Text H14 pb={4} color="black70">Detail Penjualan</Text>
                                <Row pt={6}>
                                    <Col wide={6}>
                                        <Text color="gray">Urutan Pemesanan</Text>
                                    </Col>
                                    <Col wide={6}>
                                        <Text H14 color="black70" className="u-tx-right">{item.orderProductList[0].sequence}</Text>
                                    </Col>
                                </Row>
                                <Row pt={6}>
                                    <Col wide={6}>
                                        <Text color="gray">Nama Produk</Text>
                                    </Col>
                                    <Col wide={6}>
                                        <Text H14 color="black70" className="u-tx-right">{truncate(item.orderProductList[0].productName)}</Text>
                                    </Col>
                                </Row>
                                <Row pt={6}>
                                    <Col wide={6}>
                                        <Text color="gray">Opsi Produk</Text>
                                    </Col>
                                    <Col wide={6}>
                                        <Text H14 color="black70" className="u-tx-right">{item.orderProductList[0].productOptionName === "" ? "-" : item.orderProductList[0].productOptionName}</Text>
                                    </Col>
                                </Row>
                                <Row pt={6}>
                                    <Col wide={6}>
                                        <Text color="gray">Jumlah Produk</Text>
                                    </Col>
                                    <Col wide={6}>
                                        <Text H14 color="black70" className="u-tx-right">{item.orderProductList[0].quantity}pcs</Text>
                                    </Col>
                                </Row>
                                <Row pt={6}>
                                    <Col wide={6}>
                                        <Text color="gray">Harga Satuan</Text>
                                    </Col>
                                    <Col wide={6}>
                                        <Text H14 color="black70" className="u-tx-right">Rp {formatRupiah(item.orderProductList[0].price)}</Text>
                                    </Col>
                                </Row>
                                {
                                    item.orderProductList[0].orderSettlement.transactionFee !== 0 &&
                                    <Row pt={6}>
                                        <Col wide={6}>
                                            <Text color="gray">Biaya Transaksi</Text>
                                        </Col>
                                        <Col wide={6}>
                                            <Text H14 color="black70" className="u-tx-right">Rp {formatRupiah(item.orderProductList[0].orderSettlement.transactionFee)}</Text>
                                        </Col>
                                    </Row>
                                }

                                {
                                    item.orderProductList[0].orderSettlement.sellerDiscount !== 0 &&
                                    <Row pt={6}>
                                        <Col wide={6}>
                                            <Text color="gray">Diskon Seller</Text>
                                        </Col>
                                        <Col wide={6}>
                                            <Text H14 color="black70" className="u-tx-right">Rp {formatRupiah(item.orderProductList[0].orderSettlement.sellerDiscount)}</Text>
                                        </Col>
                                    </Row>
                                }

                                {
                                    item.orderProductList[0].orderSettlement.wholeSaleDiscount !== 0 &&
                                    <Row pt={6}>
                                        <Col wide={6}>
                                            <Text color="gray">Diskon Pembelian Terbanyak</Text>
                                        </Col>
                                        <Col wide={6}>
                                            <Text H14 color="black70" className="u-tx-right">Rp {formatRupiah(item.orderProductList[0].orderSettlement.wholeSaleDiscount)}</Text>
                                        </Col>
                                    </Row>
                                }

                                {
                                    item.orderProductList[0].orderSettlement.pointUsed !== 0 &&
                                    <Row pt={6}>
                                        <Col wide={6}>
                                            <Text color="gray">Poin</Text>
                                        </Col>
                                        <Col wide={6}>
                                            <Text H14 color="black70" className="u-tx-right">{item.orderProductList[0].orderSettlement.pointUsed}</Text>
                                        </Col>
                                    </Row>
                                }

                                {
                                    item.orderProductList[0].orderSettlement.tokenUsed !== 0 &&
                                    <Row pt={6}>
                                        <Col wide={6}>
                                            <Text color="gray">Token</Text>
                                        </Col>
                                        <Col wide={6}>
                                            <Text H14 color="black70" className="u-tx-right">{item.orderProductList[0].orderSettlement.tokenUsed}</Text>
                                        </Col>
                                    </Row>
                                }

                                {
                                    item.orderProductList[0].orderSettlement.deliveryFee !== 0 &&
                                    <Row pt={6}>
                                        <Col wide={6}>
                                            <Text color="gray">Diskon Pembelian Terbanyak</Text>
                                        </Col>
                                        <Col wide={6}>
                                            <Text H14 color="black70" className="u-tx-right">Rp {formatRupiah(item.orderProductList[0].orderSettlement.deliveryFee)}</Text>
                                        </Col>
                                    </Row>
                                }

                                <Segment py={8} borderBottom="1px dashed #4e4e4e"></Segment>
                                <Row pt={10}>
                                    <Col wide={6}>
                                        <Text color="gray">Dana Diterima</Text>
                                    </Col>
                                    <Col wide={6}>
                                        <Text H14 color="black70" className="u-tx-right">Rp {formatRupiah(item.orderProductList[0].orderSettlement.estimatedIncome)}</Text>
                                    </Col>
                                </Row>
                            </Segment>
                        </Segment>
                    )
                })
            }
        </TrayFull>
    )
}
function truncate(input) {
    if(input.length > 5)
        return input.substring(0,10) + '...';
    else
        return input;
};
export default DetailHistory;