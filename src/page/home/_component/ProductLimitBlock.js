import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Segment, Row, Text, Col } from '@elevenia/master-ui/components/Atom'
import { HorizontalScroller, ImageWrapper, Image } from './HomeStyled'
import ActionCreatorsSearchFilterSort from 'store/actions/productFilterSearchSort'
import noImage from 'assets/images/noimg.png'

const limitText = (text, length) => {
    return text && text.length > length ? text.substring(0, length) + '...' : text
}

const ProductLimitBlock = ({
    data,
    RequestStockProductFilter,
    RequestCategoryContentProductFilter,
    ...props
}) => {
    const handlePush = async () => {
        await RequestStockProductFilter('3', 'displayed')
        await RequestCategoryContentProductFilter('displayed')
        props.history.push('/product/displayed')
    }
    return (
        <Segment>
            <Row px={16} pt={16} mb={8}>
                <Text B14 color="black70" fontWeight="bold">
                    Produk Kurang dari 3
                </Text>
            </Row>
            <HorizontalScroller>
                <ul>
                    {data.map((list, index) => (
                        <Item list={list} key={index} onClick={() => handlePush()} />
                    ))}
                </ul>
            </HorizontalScroller>
        </Segment>
    )
}

const Item = ({ list, ...props }) => {
    const [prodImage, setProdImage] = useState(null)
    const loadCallback = e => {
        setProdImage(noImage)
    }
    return (
        <React.Fragment>
            <li {...props}>
                <Segment
                    bg="white"
                    width="calc(2 / 3 * 100vw)"
                    borderRadius={4}
                    p={12}
                    height="100%"
                >
                    <Row alignItems="center">
                        <ImageWrapper width={44} height={44} borderRadius={4} mr={12}>
                            <Image
                                onError={e => loadCallback(e)}
                                width={44}
                                alt={list.productName}
                                src={
                                    prodImage === null
                                        ? process.env.REACT_APP_CDN_URL + list.image
                                        : prodImage
                                }
                            />
                        </ImageWrapper>
                        <Col>
                            <Text B14 color="black70" mb={4}>
                                {limitText(list.productName, 25)}
                            </Text>
                            <Segment display="flex" alignItems="center">
                                <Text B10 color="black30">
                                    STOK:
                                </Text>
                                <Text B14 color="black50" ml={4}>
                                    {list.stockQuantity}
                                </Text>
                            </Segment>
                        </Col>
                    </Row>
                </Segment>
            </li>
        </React.Fragment>
    )
}

const mapDispatchToProps = {
    ...ActionCreatorsSearchFilterSort,
}

export default connect(null, mapDispatchToProps)(ProductLimitBlock)
