import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Segment, Container, Row, Col, Text } from '@elevenia/master-ui/components/Atom'
import { formatRupiah } from 'helper'
const BalanceRevenue = ({ settlement }) => {
    const [toggle, setToggle] = useState('revenue')
    // console.log(toggle)
    const handleToggle = e => {
        const { value } = e.target
        if (value === 'revenue') {
            setToggle('balance')
        } else {
            setToggle('revenue')
        }
    }
    return (
        <>
            <Segment position="fixed" bg="white" width="100%" height={92} zIndex={1030}>
                <Container p={16}>
                    <Row mb={12}>
                        <Col wide={8}>
                            <div className="can-toggle switching">
                                <input
                                    id="d"
                                    type="checkbox"
                                    onClick={e => handleToggle(e)}
                                    value={toggle}
                                />
                                <label htmlFor="d">
                                    <div
                                        className="can-toggle__switch"
                                        data-checked="Saldo"
                                        data-unchecked="Penghasilan"
                                    ></div>
                                </label>
                            </div>
                        </Col>
                    </Row>
                    {toggle === 'revenue' ? (
                        <Row>
                            <Text
                                fontWeight="500"
                                color="black70"
                                style={{ fontSize: '24px', lineHeight: '26px' }}
                            >
                                {formatRupiah(settlement.totalAkanDitransfer, 'Rp')}
                            </Text>
                        </Row>
                    ) : (
                        <Row>
                            <Text
                                fontWeight="500"
                                color="black70"
                                style={{ fontSize: '24px', lineHeight: '26px' }}
                            >
                                {formatRupiah(settlement.dataSaldo.accumulativeCyberMoney, "Rp")}
                            </Text>
                        </Row>
                    )}
                </Container>
            </Segment>
            <Segment height={100} />
        </>
    )
}
const mapStateToProps = ({ settlement }) => ({
    settlement,
})

export default connect(mapStateToProps)(BalanceRevenue)
