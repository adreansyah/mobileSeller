import React from "react";
import {
    Container,
    Row,
    Text,
    Col,
    Segment
} from "@elevenia/master-ui/components/Atom";
import {formatRupiah} from "helper";

const HistoryValue = props => {
    const {netIncome,transactionDate,estimatedTransferDate,handleDetailHistory} = props;
    return (
        <Segment bg="white" py={12} px={16} mb={16} onClick={() => handleDetailHistory(transactionDate)}>
            <Container>
                <Row>
                    <Col wide={6}>
                        <Text py={5} color="black50" style={{fontSize: '14px'}} >
                            Tanggal Pembelian
                        </Text>
                    </Col>
                    <Col wide={6} className="u-tx-right">
                        <Text py={5} color="black70" style={{fontSize: '14px'}} >
                            {transactionDate}
                        </Text>
                    </Col>
                    <Col wide={6}>
                        <Text py={5} color="black50" style={{fontSize: '14px'}} >
                            Tanggal Transfer
                        </Text>
                    </Col>
                    <Col wide={6} className="u-tx-right">
                        <Text py={5} color="black70" style={{fontSize: '14px'}} >
                            {estimatedTransferDate}
                        </Text>
                    </Col>
                    <Col wide={6}>
                        <Text py={5} color="black50" style={{fontSize: '14px'}} >
                            Dana Diterima
                        </Text>
                    </Col>
                    <Col wide={6} className="u-tx-right">
                        <Text py={4} color="black70" style={{fontSize: '14px'}} >
                            Rp {formatRupiah(netIncome)}
                        </Text>
                    </Col>
                </Row>
            </Container>
        </Segment>
    )
}

export default HistoryValue