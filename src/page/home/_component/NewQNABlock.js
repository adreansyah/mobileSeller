import React from 'react'
import { Segment, Row, Col, Text } from '@elevenia/master-ui/components/Atom'
import moment from 'moment'
import { HorizontalScroller, Image, ImageWrapper } from './HomeStyled'

const limitText = (text, length) => {
    return text && text.length > length ? text.substring(0, length) + '...' : text
}

const NewQNABlock = ({ data, ...props }) => {
    return (
        <Segment>
            <Row px={16} pt={16} mb={8}>
                <Text B14 color="black70" fontWeight="bold">
                    Q & A Terbaru
                </Text>
            </Row>
            <HorizontalScroller>
                <ul>
                    {data.map((list, index) => (
                        <React.Fragment key={index}>
                            <li onClick={() => props.history.push('/qna/detail/' + list.boardId)}>
                                <Segment
                                    bg="white"
                                    width="calc(2 / 3 * 100vw)"
                                    borderRadius={4}
                                    p={12}
                                    height="100%"
                                >
                                    <Row alignItems="center">
                                        <ImageWrapper
                                            width={32}
                                            height={32}
                                            borderRadius={4}
                                            mr={12}
                                        >
                                            <Image
                                                width={32}
                                                alt={list.productName}
                                                src={process.env.REACT_APP_CDN_URL + list.urlPath}
                                            />
                                        </ImageWrapper>
                                        <Col>
                                            <Text B14 color="black70" mb={4}>
                                                {limitText(list.productName, 25)}
                                            </Text>
                                            <Text B10 color="black50">
                                                No Produk: {list.productId}
                                            </Text>
                                        </Col>
                                    </Row>
                                    <Row mt={8}>
                                        <Col>
                                            <Text B10 color="black70" fontWeight="500">
                                                {limitText(list.senderName, 25)}
                                            </Text>
                                        </Col>
                                        <Col className="u-tx-right">
                                            <Text B10 color="black50">
                                                {moment
                                                    .utc(
                                                        list.lastMessage
                                                            ? list.lastMessage.lastMessageDate
                                                            : list.lastMessageDate,
                                                    )
                                                    .format('DD MMMM YYYY')}
                                            </Text>
                                        </Col>
                                    </Row>
                                    <Row mt={4}>
                                        <Col>
                                            <Text P14 color="black70">
                                                {limitText(
                                                    list.lastMessage
                                                        ? list.lastMessage.message
                                                        : list.message,
                                                    35,
                                                )}
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

export default NewQNABlock
