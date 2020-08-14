import React from "react";
import {
    // Icon,
    // Button,
    Container,
    Row,
    Text,
    Col,
    Segment
} from "@elevenia/master-ui/components/Atom";
import {formatRupiah} from "helper";

const RevenueBoard = props => {
    const {settlement} = props;
    return (
        <Segment bg="white" width="100%" height={92} zIndex={1030}>
            <Container p={16} pt={8}>
                <Row>
                    <Text
                        ontWeight="500"
                        color="gray"
                        style={{fontSize: '10px',lineHeight: '26px'}}
                    >HASIL PENJUALAN</Text>
                </Row>
                <Row mb={4}>
                    <Col wide={8}>
                        <Text
                            ontWeight="500"
                            color="black70"
                            style={{fontSize: '24px',fontWeight: 500}}
                        >Rp {formatRupiah(settlement.totalAkanDitransfer)}</Text>
                    </Col>
                    {/* <Col wide={4}
                        className="u-tx-right"
                    >
                        <Button
                            size="small"
                            variant="secondary"
                            className="small"
                        >
                            REKENING
                            <Icon fillColor="black50" name="chevron-right" size="small" />
                        </Button>
                    </Col> */}
                </Row>
                <Row>
                    <Text
                        ontWeight="500"
                        color="gray"
                        style={{fontSize: '10px',lineHeight: '26px'}}
                    >Uang hasil transaksi akan langsung dicairkan ke Rekening Penjual.</Text>
                </Row>
            </Container>
        </Segment>
    )
}

export default RevenueBoard;