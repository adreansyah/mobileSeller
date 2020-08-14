import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { ButtonLink, Icon, Row, Col, Text, Segment } from '@elevenia/master-ui/components/Atom'
import IconFlag from '../IconFlag'
import moment from 'moment'
import { formatRupiah } from 'helper'

const ProductPerformance = props => {
    const { statistic } = props
    const { productPerformance } = statistic
    /**
     *  Mapping Data Section
     */

    const getIndexMetric = metric => {
        switch (metric.toLowerCase()) {
            case 'paling banyak terjual':
                return 0
            case 'paling banyak dilihat':
                return 1
            case 'Paling banyak masuk wishlist':
                return 2
            default:
                return 3
        }
    }

    const [dataList, setDataList] = useState(productPerformance.data)
    useEffect(() => {
        const mappingData = () => {
            const { data } = productPerformance
            if (data && data.length) {
                const newData = data.map(list => {
                    const reindex = getIndexMetric(list.metric)
                    return { ...list, index: reindex, isShowAll: false }
                })
                const sortedData = newData.sort((a, b) =>
                    a.index > b.index ? 1 : b.index > a.index ? -1 : 0,
                )
                return sortedData
            }
            return []
        }
        const data = mappingData()
        setDataList([...data])
    }, [productPerformance])
    const openMetric = index => {
        const data = dataList.map(list => {
            return { ...list, isShowAll: list.index === index ? !list.isShowAll : list.isShowAll }
        })
        setDataList([...data])
    }
    return (
        <>
            {productPerformance.isLoaded ? (
                <>
                    {productPerformance.data && productPerformance.data.length ? (
                        <>
                            {dataList.map(list => {
                                return (
                                    <React.Fragment key={list.metric}>
                                        <Row
                                            className="u-bg-black20 sec-update u-tx-black40"
                                            style={{ alignItems: 'flex-end' }}
                                        >
                                            <Col flex="1.5">
                                                <Text H14 color="black70">
                                                    {list.metric}
                                                </Text>
                                            </Col>

                                            {list.index === 0 && (
                                                <Col className="u-tx-right">
                                                    <p className="u-mb-4">Terakhir diperbarui:</p>{' '}
                                                    <span className="u-tx-black50">
                                                        {productPerformance.last_update
                                                            ? moment(
                                                                  productPerformance.last_update,
                                                                  'DD-MM-YYYY HH:mm:ss',
                                                              ).format('DD MMM YYYY, HH:mm')
                                                            : '-'}
                                                    </span>
                                                </Col>
                                            )}
                                        </Row>
                                        <Segment className="wrap-productlist">
                                            {list.product
                                                .filter(key =>
                                                    !list.isShowAll ? key.seq <= 3 : key,
                                                )
                                                .map(item => (
                                                    <React.Fragment key={item.seq}>
                                                        <Row
                                                            py="16px"
                                                            pr="16px"
                                                            ml="16px"
                                                            className="bd-bottom-dashed u-ps-relative"
                                                        >
                                                            <Col flex="0" mr="16px">
                                                                <figure className="product-img">
                                                                    <img
                                                                        src={item.product_image}
                                                                        alt={item.product_name}
                                                                    />
                                                                </figure>
                                                            </Col>
                                                            <Col
                                                                flex="3"
                                                                className="content-between"
                                                            >
                                                                <h3>{item.product_name}</h3>
                                                                <div className="txt-terjual">
                                                                    TERJUAL:{' '}
                                                                    <span>
                                                                        {formatRupiah(item.value)}{' '}
                                                                        unit
                                                                    </span>
                                                                </div>
                                                            </Col>
                                                            <Col>
                                                                <IconFlag
                                                                    className="flag"
                                                                    trend={
                                                                        item.seq < 4 ? true : false
                                                                    }
                                                                    size={24}
                                                                    value={item.seq}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </React.Fragment>
                                                ))}
                                        </Segment>
                                        <Segment className="btn-show-more">
                                            <ButtonLink onClick={() => openMetric(list.index)}>
                                                {list.isShowAll ? 'Tutup' : 'Lihat Semua'}
                                                <Icon
                                                    ml="4px"
                                                    fillColor={'orange30'}
                                                    name={`${
                                                        list.isShowAll
                                                            ? 'chevron-up'
                                                            : 'chevron-down'
                                                    }`}
                                                    size={'small'}
                                                />
                                            </ButtonLink>
                                        </Segment>
                                    </React.Fragment>
                                )
                            })}
                        </>
                    ) : (
                        'No Data Found'
                    )}
                </>
            ) : (
                'Loading ... '
            )}
        </>
    )
}

const mapStateToProps = ({ statistic }) => ({
    statistic,
})
export default connect(mapStateToProps)(ProductPerformance)
