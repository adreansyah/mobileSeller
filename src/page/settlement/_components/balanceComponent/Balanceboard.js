import React from "react";
import {useSelector} from "react-redux";
import {Icon,Col,Row,ButtonLink} from '@elevenia/master-ui/components/Atom';
import {formatRupiah} from 'helper';
import {Segment,Container,Text} from '@elevenia/master-ui/components/Atom';
const BalanceBoard = props => {
    const {handleOpeninfomasi} = props;
    const settlement = useSelector(state => state.settlement);
    return (
        <Segment bg="white" mb={8}>
            <Container px={16} py={8}>
                <Text
                    ontWeight="500"
                    color="gray"
                    style={{fontSize: '10px',lineHeight: '26px'}}
                >TOTAL SALDO</Text>
                <Row mb={8}>
                    <Col wide={9}>
                        <Text
                            color="black70"
                            style={{fontSize: 24,lineHeight: '26px',fontWeight: 500}}
                        >Rp {formatRupiah(settlement.dataSaldo.accumulativeCyberMoney)}</Text>
                    </Col>
                    <Col wide={3} className="u-tx-right">
                        <ButtonLink onClick={handleOpeninfomasi}>
                            <Icon
                                fillColor="gray"
                                name="information"
                                size="large"
                            />
                        </ButtonLink>
                    </Col>
                </Row>
            </Container>
        </Segment>
    )
}

export default BalanceBoard