import React from "react";
import {
    Icon,
    ButtonLink,
    Container,
    Row,
    Text,
    Col,
    Segment
} from "@elevenia/master-ui/components/Atom";
import {formatRupiah} from "helper";

const ReceivedValue = props => {
    const {netIncome,totalDeductAmount,totalSalePrice,onModalDetail} = props;
    return (
        <Segment mb={16}>
            <Text H14 p={16}>
                Daftar Penghasilan
            </Text>
            <Segment bg="white" width="100%" zIndex={1030}>
                <Container px={16} pt={16} >
                    <Row mb={4}>
                        <Text
                            color="gray"
                            style={{fontSize: '10px',fontWeight: 500}}>
                            TOTAL UANG DITERIMA
                        </Text>
                    </Row>
                    <Row className="line" pb={8}>
                        <Col wide={11}>
                            <Text
                                py={5}
                                color="black50"
                                style={{fontSize: '14px',fontWeight: 500}}
                            >
                                Rp {formatRupiah(netIncome)}
                            </Text>
                        </Col>
                        <Col wide={1} className="u-tx-right">
                            <ButtonLink onClick={onModalDetail} size="small" variant="secondary" className="small">
                                <Icon fillColor="black70" name="chevron-right" size={16} />
                            </ButtonLink>
                        </Col>
                    </Row>
                    <Segment py={4} borderBottom="1px dashed #4e4e4e"></Segment>
                    <Row py={12}>
                        <Col wide={6}>
                            <Text py={5} color="black50" style={{fontSize: '14px'}} >
                                Total Penjualan
                            </Text>
                        </Col>
                        <Col wide={6} className="u-tx-right">
                            <Text py={5} color="black70" style={{fontSize: '14px'}} >
                                Rp {formatRupiah(totalSalePrice)}
                            </Text>
                        </Col>
                        <Col wide={6}>
                            <Text py={5} color="black50" style={{fontSize: '14px'}} >
                                Total Pengurangan
                            </Text>
                        </Col>
                        <Col wide={6} className="u-tx-right">
                            <Text py={5} color="black70" style={{fontSize: '14px'}} >
                                Rp {formatRupiah(totalDeductAmount)}
                            </Text>
                        </Col>
                    </Row>
                </Container>
            </Segment>
        </Segment>
    )
}
export default ReceivedValue;