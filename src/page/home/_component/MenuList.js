import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Text, Badge, Icon } from '@elevenia/master-ui/components/Atom'
const MenuList = ({ order, qna, ...props }) => {
    const orderNewCount = order.counter.find(key => key.orderStatus === 'DEFAULT_NEW_ORDER')
    const orderProcessCount = order.counter.find(key => key.orderStatus === 'ON_PROCESS')
    const qnaCount = qna.counter.data.private + qna.counter.data.private

    return (
        <Container bg="white">
            <Row pl={16} onClick={() => props.history.push('/order/new')}>
                <Icon name="order" size={24} variant="multicolor" />
                <Col py={16} ml={8} borderBottom="1px solid black30" height={48}>
                    <Text B14 color="black70">
                        Pesanan Baru
                    </Text>
                </Col>
                <Col
                    p={16}
                    wide={3}
                    borderBottom="1px solid black30"
                    className="u-tx-right"
                    height={48}
                >
                    {order.counter.length && orderNewCount && (
                        <Badge
                            bg="secondaryRed"
                            round={50}
                            fontSize="8px"
                            style={{
                                minWidth: 20,
                                height: '16px',
                                lineHeight: '12px',
                                verticalAlign: 'top',
                            }}
                        >
                            {orderNewCount.count}
                        </Badge>
                    )}
                    <Icon name="chevron-right" size={16} fillColor="black50" className="u-ml-4" />
                </Col>
            </Row>
            <Row pl={16} onClick={() => props.history.push('/order/onprocess')}>
                <Icon name="send-item" size={24} variant="multicolor" />
                <Col py={16} ml={8} borderBottom="1px solid black30" height={48}>
                    <Text B14 color="black70">
                        Perlu Dikirim
                    </Text>
                </Col>
                <Col
                    p={16}
                    wide={3}
                    borderBottom="1px solid black30"
                    className="u-tx-right"
                    height={48}
                >
                    {order.counter.length && orderProcessCount && (
                        <Badge
                            bg="secondaryRed"
                            round={50}
                            fontSize="8px"
                            style={{
                                minWidth: 20,
                                height: '16px',
                                lineHeight: '12px',
                                verticalAlign: 'top',
                            }}
                        >
                            {orderProcessCount.count}
                        </Badge>
                    )}
                    <Icon name="chevron-right" size={16} fillColor="black50" className="u-ml-4" />
                </Col>
            </Row>
            <Row pl={16} onClick={() => props.history.push('/qna')}>
                <Icon name="qna" size={24} variant="multicolor" />
                <Col py={16} ml={8} height={48}>
                    <Text B14 color="black70">
                        Q & A
                    </Text>
                </Col>
                <Col p={16} wide={3} className="u-tx-right" height={48}>
                    {qnaCount && (
                        <Badge
                            bg="secondaryRed"
                            round={50}
                            fontSize="8px"
                            style={{
                                minWidth: 20,
                                height: '16px',
                                lineHeight: '12px',
                                verticalAlign: 'top',
                            }}
                        >
                            {qnaCount}
                        </Badge>
                    )}
                    <Icon name="chevron-right" size={16} fillColor="black50" className="u-ml-4" />
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = ({ order, qna }) => ({
    order,
    qna,
})
export default connect(mapStateToProps)(MenuList)
