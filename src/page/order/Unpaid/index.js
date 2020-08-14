import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getOrderUnpaid, setOrderUnpaid, getOrderCount } from 'store/actions/order'
import InfiniteScroll from 'component/InfiniteScroll'
import {
    Icon,
    Text,
    Row,
    Col,
    Container,
    Segment,
    Spinner,
} from '@elevenia/master-ui/components/Atom'
import { formatRupiah } from 'helper'
import FilterModal from '../_component/FilterModal'
import FilterSortBlock from '../_component/FilterSortBlock'
import ErrorBlock from '../_component/ErrorBlock'
import moment from 'moment'
import SortModal from '../_component/SortModal'

class UnpaidOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            params: this.params,
            isFilterOpen: false,
            isFilterDiff: false,
            isSortOpen: false,
            isSortDiff: false,
        }
    }
    get params() {
        const startDate = moment()
            .subtract(1, 'months')
            .format('YYYY-MM-DD')
        const endDate = moment().format('YYYY-MM-DD')
        return {
            orderStatus: 'UNPAID',
            page: 0,
            size: 5,
            searchKeyword: '',
            activeSort: 'ORDER_DATE_DESC',
            startDate: startDate ? startDate : '',
            endDate: endDate ? endDate : '',
            courier: [],
            isPickup: false,
        }
    }
    componentDidMount() {
        const { params } = this.props.order.unpaid
        const { searchKeyword } = this.props.order
        if (params) {
            const isSortDiff = this.params.activeSort !== params.activeSort
            const isFilterDiff = this.diffObject(this.params, params)
            this.setState({ params, isFilterDiff, isSortDiff })
            if (searchKeyword !== params.searchKeyword) {
                this.handleFilter({ ...params, searchKeyword, page: 0 })
            }
        } else {
            if (searchKeyword !== '') {
                this.handleFilter({ ...this.state.params, searchKeyword, page: 0 })
            } else {
                this.fetchPerPage()
            }
        }
    }
    componentDidUpdate(prevProps) {
        const { order } = this.props
        const { params } = this.state
        if (order.searchKeyword !== prevProps.order.searchKeyword) {
            this.handleFilter({ ...params, searchKeyword: order.searchKeyword, page: 0 })
        }
    }
    fetchPerPage = () => {
        const { getOrderUnpaid, order } = this.props
        const { params } = this.state
        const page = order.unpaid.params ? order.unpaid.params.page + 1 : 0
        this.setState({ params: { ...params, page } }, () => getOrderUnpaid(this.state.params))
    }
    handleFilter = async nextParams => {
        const { setOrderUnpaid, getOrderUnpaid, getOrderCount } = this.props
        const isFilterDiff = this.diffObject(this.params, nextParams)
        this.setState({ params: nextParams, isFilterDiff })
        await setOrderUnpaid({ data: [] })
        await getOrderUnpaid(nextParams)
        await getOrderCount(nextParams)
    }
    handleSort = async nextParams => {
        const { setOrderUnpaid, getOrderUnpaid } = this.props
        const isSortDiff = this.params.activeSort !== nextParams.activeSort
        this.setState({ params: nextParams, isSortDiff })
        await setOrderUnpaid({ data: [] })
        await getOrderUnpaid(nextParams)
    }
    diffObject(object1, object2) {
        const exception = ['page', 'searchKeyword', 'activeSort', 'orderStatus']
        for (const key in object1) {
            if (object1.hasOwnProperty(key)) {
                if (exception.indexOf(key) < 0 && object1[key] !== object2[key]) {
                    if (Array.isArray(object1[key])) {
                        if (object1[key].length !== object2[key].length) {
                            return true
                        }
                    } else {
                        return true
                    }
                }
            }
        }
        return false
    }
    handleShowAll = (orderIdx, OrderListIdx) => {
        const { order, setOrderUnpaid } = this.props
        const orderData = order.unpaid.data
        orderData[orderIdx].orderList[OrderListIdx].show = !orderData[orderIdx].orderList[
            OrderListIdx
        ].show
        setOrderUnpaid({ data: [...orderData] })
    }
    render() {
        const { isFilterOpen, params, isFilterDiff, isSortDiff, isSortOpen } = this.state
        const { order } = this.props
        return (
            <>
                <FilterSortBlock
                    onOpenFilter={() => this.setState({ isFilterOpen: true })}
                    isFilterDiff={isFilterDiff}
                    onOpenSort={() => this.setState({ isSortOpen: true })}
                    isSortDiff={isSortDiff}
                />
                <Container className="page-order" pt={12}>
                    <InfiniteScroll
                        refs="unpaid-order-scroll"
                        loadMore={() => this.fetchPerPage()}
                        hasMore={order.unpaid.loadMore}
                        isLoading={!order.unpaid.isLoaded}
                        loader={
                            <Segment
                                key={0}
                                width="100%"
                                height={30}
                                py={5}
                                className="u-tx-center"
                            >
                                <Spinner />
                            </Segment>
                        }
                        error={
                            order.unpaid.data.length === 0 &&
                            order.unpaid.isLoaded && (
                                <ErrorBlock
                                    key={1}
                                    errOnSearch={params.searchKeyword ? true : false}
                                />
                            )
                        }
                    >
                        {order.unpaid.data.map((order, orderIndex) => (
                            <React.Fragment key={orderIndex}>
                                <Container>
                                    <Segment bg="black10" px={16} py={8}>
                                        <Row>
                                            <Col wide={8}>
                                                <Text B14 color="black70">
                                                    {`No. Pesanan : ${order.orderId}`}
                                                </Text>
                                            </Col>
                                            <Col wide={4} className="u-tx-right">
                                                <Text B14 color="black40">
                                                    {order.orderDate}
                                                </Text>
                                            </Col>
                                        </Row>
                                    </Segment>
                                    {order.orderList.map((orderList, orderListIndex) => (
                                        <React.Fragment key={orderListIndex}>
                                            <OrderDeliveryBlock
                                                orderIndex={orderIndex}
                                                orderList={orderList}
                                                orderListIndex={orderListIndex}
                                                onShowAll={(resOrderIndex, resOrderListIndex) =>
                                                    this.handleShowAll(
                                                        resOrderIndex,
                                                        resOrderListIndex,
                                                    )
                                                }
                                            />
                                        </React.Fragment>
                                    ))}
                                </Container>
                            </React.Fragment>
                        ))}
                    </InfiniteScroll>
                </Container>
                <FilterModal
                    activeTabs={'unpaid'}
                    isOpen={isFilterOpen}
                    onClose={() => this.setState({ isFilterOpen: false })}
                    params={params}
                    onFilter={nextParams => this.handleFilter(nextParams)}
                />
                <SortModal
                    isOpen={isSortOpen}
                    onClose={() => this.setState({ isSortOpen: false })}
                    params={params}
                    onSort={nextParams => this.handleSort(nextParams)}
                />
            </>
        )
    }
}
const OrderDeliveryBlock = ({ orderList, orderIndex, orderListIndex, onShowAll }) => {
    return (
        <Segment>
            <Row py={8} px={16} bg="white">
                <Col>
                    <Text B14 color="primary">
                        <Icon name="delivery" size={16} fillColor={'primary'} className="u-mr-8" />
                        {orderList.courierName}
                    </Text>
                </Col>
            </Row>
            <Row px={16} pt={8} pb={16} mb={12} bg="white">
                <Col>
                    {orderList.orderProductList.map((orderProductList, index) => (
                        <React.Fragment key={index}>
                            <Row
                                className={`collapse${!orderList.show && index > 1 ? ' hide' : ''}`}
                            >
                                <Col wide={9} py={4}>
                                    <Text B14 color="black70">
                                        {orderProductList.productName}
                                    </Text>
                                    <Text B10 color="black40" py={8}>
                                        x{orderProductList.quantity}
                                        <span className="u-mx-16">|</span>
                                        {orderProductList.productOptionName
                                            ? orderProductList.productOptionName
                                            : ' - '}
                                    </Text>
                                </Col>
                                <Col wide={3} className="u-tx-right" py={4}>
                                    <Text b14 color="black70">
                                        {formatRupiah(orderProductList.price, 'Rp ')}
                                    </Text>
                                </Col>
                            </Row>
                        </React.Fragment>
                    ))}
                </Col>
            </Row>
            {orderList.orderProductList.length > 2 && (
                <Row className="show-more__row" mb={12}>
                    <Col className="show-more__column">
                        <button
                            className={'u-bg-white'}
                            onClick={() => onShowAll(orderIndex, orderListIndex)}
                        >
                            <Icon
                                name={orderList.show ? 'chevron-up' : 'chevron-down'}
                                size={16}
                                fillColor={'black50'}
                            />
                        </button>
                    </Col>
                </Row>
            )}
        </Segment>
    )
}
const mapStateToProps = ({ order }) => ({
    order,
})
const mapDispatchToProps = {
    getOrderUnpaid,
    setOrderUnpaid,
    getOrderCount,
}

export default connect(mapStateToProps, mapDispatchToProps)(UnpaidOrder)
