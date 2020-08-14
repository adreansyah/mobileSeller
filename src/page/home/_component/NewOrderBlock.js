import React from 'react'
import { Segment, Row, Col, Text } from '@elevenia/master-ui/components/Atom'
import { HorizontalScroller } from './HomeStyled'

const NewOrderBlock = ({ data, ...props }) => {
    return (
        <Segment>
            <Row px={16} pt={16} mb={8}>
                <Text B14 color="black70" fontWeight="bold">
                    Pesanan Baru
                </Text>
            </Row>
            <HorizontalScroller>
                <ul>
                    {data.map((list, index) => (
                        <React.Fragment key={index}>
                            <li onClick={() => props.history.push('/order/new')}>
                                <Segment bg="white" width="calc(2 / 3 * 100vw)" borderRadius={4}>
                                    <Row py={12} px={16} borderBottom="1px solid black30">
                                        <Text B12 color="black50">
                                            No. Pesanan: {list.orderId}
                                        </Text>
                                    </Row>
                                    <Row py={12} px={16}>
                                        <Col>
                                            <Text B10 fontWeight={500} color="black50">
                                                {list.orderList[0].orderStatus === 'PRE_ORDER'
                                                    ? 'ESTIMASI KIRIM'
                                                    : 'BATAS RESPON'}
                                            </Text>
                                            <Text B14 fontWeight={500} color="primary">
                                                {list.orderList[0].orderStatus === 'PRE_ORDER'
                                                    ? list.orderList[0].deliveryEstimationDate
                                                    : list.orderList[0].deadline}
                                            </Text>
                                        </Col>
                                        <Col>
                                            <Text B10 fontWeight={500} color="black50">
                                                JUMLAH PRODUK
                                            </Text>
                                            <Text B14 fontWeight={500} color="primary">
                                                {list.orderList[0].orderProductList.length}
                                            </Text>
                                        </Col>
                                    </Row>
                                </Segment>
                            </li>
                        </React.Fragment>
                    ))}
                </ul>
            </HorizontalScroller>
        </Segment>
    )
}

export default NewOrderBlock
