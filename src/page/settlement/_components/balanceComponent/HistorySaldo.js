import React from "react";
import {useSelector} from "react-redux";
import {Col,Row} from '@elevenia/master-ui/components/Atom';
import {formatRupiah} from 'helper';
import {Segment,Container,Text} from '@elevenia/master-ui/components/Atom';
import moment from "moment";
const HistorySaldo = () => {
    const settlement = useSelector(state => state.settlement);
    return (
        <>
            {
                settlement.saldoHistory.length === 0
                    ?
                    <Segment my={70}>
                        <Text H14 className="u-tx-center" color="black50">Tidak Ada Saldo History</Text>
                    </Segment>
                    :
                    settlement.saldoHistory.map((item,index) => {
                        const isDate = moment.utc(item.transactionDate);
                        const date = isDate.format("DD MMMM YYYY"),time = isDate.format("HH.mm");
                        const before = settlement.saldoHistory[index - 1] ? moment.utc(settlement.saldoHistory[index - 1].transactionDate).format("DD MMMM YYYY") : null;
                        return (
                            <>
                                {
                                    before !== date && (
                                        <Segment px={16} p={8}>
                                            <Text H14>{date}</Text>
                                        </Segment>
                                    )
                                }
                                {
                                    item.label !== "DEBIT"
                                        ?
                                        <Segment mb={8} bg="white">
                                            <Container px={16} py={8}>
                                                <Row pt={4}>
                                                    <Col>
                                                        <Text
                                                            color="black70"
                                                            style={{fontSize: 14}}
                                                        >Uang Masuk</Text>
                                                    </Col>
                                                    <Col className="u-tx-right">
                                                        <Text
                                                            color="green50"
                                                            style={{fontSize: 14}}
                                                        >+{formatRupiah(item.amount,"Rp ")}</Text>
                                                    </Col>
                                                </Row>
                                                <Row pt={4}>
                                                    <Col>
                                                        <Text
                                                            color="black50"
                                                            style={{fontSize: 10}}
                                                        >{time}</Text>
                                                    </Col>
                                                    <Col className="u-tx-right">
                                                        <Text
                                                            color="black50"
                                                            style={{fontSize: 10}}
                                                        >Saldo: {formatRupiah(item.balance,"Rp ")}</Text>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Segment>
                                        :
                                        <Segment mb={8} bg="white">
                                            <Container px={16} py={8}>
                                                <Row pt={4}>
                                                    <Col>
                                                        <Text
                                                            color="black70"
                                                            style={{fontSize: 14}}
                                                        >Uang Keluar</Text>
                                                    </Col>
                                                    <Col className="u-tx-right">
                                                        <Text
                                                            color="red50"
                                                            style={{fontSize: 14}}
                                                        >-{formatRupiah(item.amount,"Rp ")}</Text>
                                                    </Col>
                                                </Row>
                                                <Row pt={4}>
                                                    <Col>
                                                        <Text
                                                            color="black50"
                                                            style={{fontSize: 10}}
                                                        >{time}</Text>
                                                    </Col>
                                                    <Col className="u-tx-right">
                                                        <Text
                                                            color="black50"
                                                            style={{fontSize: 10}}
                                                        >Saldo: {formatRupiah(item.balance,"Rp ")}</Text>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Segment>
                                }
                            </>
                        )
                    })
            }
        </>
    )
}

export default HistorySaldo;