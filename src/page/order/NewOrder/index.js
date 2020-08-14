import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getOrderNew, setOrderNew, getOrderCount, requestAcceptOrder } from 'store/actions/order'
import InfiniteScroll from 'component/InfiniteScroll'
import {
    CheckBox,
    Icon,
    Text,
    Row,
    Col,
    Container,
    Button,
    ButtonGroup,
    Segment,
    Spinner,
} from '@elevenia/master-ui/components/Atom'
import { Footer, FooterBody } from '@elevenia/master-ui/components/Organisms'
import { formatRupiah } from 'helper'
import FilterModal from '../_component/FilterModal'
import FilterSortBlock from '../_component/FilterSortBlock'
import ErrorBlock from '../_component/ErrorBlock'
import { Link } from 'react-router-dom'
import moment from 'moment'
import SortModal from '../_component/SortModal'
import AttentionModal from '../_component/AttentionModal'

class NewOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            params: this.params,
            selected: [],
            selectedAll: [],
            isFilterOpen: false,
            isFilterDiff: false,
            isSortOpen: false,
            isSortDiff: false,
            isAttentionOpen: false,
        }
    }
    get params() {
        const startDate = moment()
            .subtract(1, 'months')
            .format('YYYY-MM-DD')
        const endDate = moment().format('YYYY-MM-DD')
        return {
            orderStatus: 'DEFAULT_NEW_ORDER',
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
        const { params } = this.props.order.new
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
        if (order.new.data.length !== prevProps.order.new.data.length) {
            this.setState({ selectedAll: [] })
        }
        if (order.acceptOrder.isSuccess !== prevProps.order.acceptOrder.isSuccess) {
            order.acceptOrder.isSuccess && this.setState({ selected: [], selectedAll: [] })
        }
    }
    fetchPerPage = () => {
        const { getOrderNew, order } = this.props
        const { params } = this.state
        const page = order.new.params ? order.new.params.page + 1 : 0
        this.setState({ params: { ...params, page } }, () => getOrderNew(this.state.params))
    }
    handleFilter = async nextParams => {
        const { setOrderNew, getOrderNew, getOrderCount } = this.props
        const isFilterDiff = this.diffObject(this.params, nextParams)
        this.setState({ params: nextParams, isFilterDiff, selected: [], selectedAll: [] })
        await setOrderNew({ data: [] })
        await getOrderNew(nextParams)
        await getOrderCount(nextParams)
    }
    handleSort = async nextParams => {
        const { setOrderNew, getOrderNew } = this.props
        const isSortDiff = this.params.activeSort !== nextParams.activeSort
        this.setState({ params: nextParams, isSortDiff, selected: [], selectedAll: [] })
        await setOrderNew({ data: [] })
        await getOrderNew(nextParams)
    }
    diffObject(object1, object2) {
        const exception = ['page', 'searchKeyword', 'activeSort']
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
    handleSelectChange = event => {
        const { data } = this.props.order.new
        const value = parseInt(event.target.value)
        let arr = [...this.state.selected]
        const idx = arr.indexOf(value)
        if (idx >= 0) {
            arr.splice(idx, 1)
        } else if (idx === -1) {
            arr.splice(idx, 0, value)
        }
        this.setState({ selected: arr, selectedAll: data.length !== arr.length ? [] : ['all'] })
    }
    handleSelectAllChange = event => {
        const value = event.target.value
        let arr = this.state.selectedAll
        const idx = arr.indexOf(value)
        if (idx >= 0) {
            arr.splice(idx, 1)
        } else if (idx === -1) {
            arr.splice(idx, 0, value)
        }
        this.setState({ selectedAll: arr })
        if (arr.length) {
            const selectedOrder = this.props.order.new.data.map(list => list.orderId)
            this.setState({ selected: selectedOrder })
        } else {
            this.setState({ selected: [] })
        }
    }
    handleShowAll = (orderIdx, OrderListIdx) => {
        const { order, setOrderNew } = this.props
        const orderData = order.new.data
        orderData[orderIdx].orderList[OrderListIdx].show = !orderData[orderIdx].orderList[
            OrderListIdx
        ].show
        setOrderNew({ data: [...orderData] })
    }
    checkItems = orderId => {
        return [
            {
                label: (
                    <Text B14 color="black70">
                        {`No. Pesanan : ${orderId}`}
                    </Text>
                ),
                value: orderId,
                checked: false,
            },
        ]
    }
    render() {
        const {
            selected,
            selectedAll,
            isFilterOpen,
            params,
            isFilterDiff,
            isSortOpen,
            isSortDiff,
            isAttentionOpen
        } = this.state
        const { order, requestAcceptOrder } = this.props
        return (
            <>
                <FilterSortBlock
                    selected={selectedAll}
                    onSelectAllChange={e => this.handleSelectAllChange(e)}
                    onOpenFilter={() => this.setState({ isFilterOpen: true })}
                    isFilterDiff={isFilterDiff}
                    onOpenSort={() => this.setState({ isSortOpen: true })}
                    isSortDiff={isSortDiff}
                />
                <Container className="page-order" pt={12} pb={80}>
                    <InfiniteScroll
                        refs="new-order-scroll"
                        loadMore={() => this.fetchPerPage()}
                        hasMore={order.new.loadMore}
                        isLoading={!order.new.isLoaded}
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
                            order.new.data.length === 0 &&
                            order.new.isLoaded && (
                                <ErrorBlock
                                    key={1}
                                    errOnSearch={params.searchKeyword ? true : false}
                                />
                            )
                        }
                    >
                        {order.new.data.map((order, orderIndex) => (
                            <React.Fragment key={orderIndex}>
                                <Container>
                                    <Segment bg="black10" px={16} py={4}>
                                        <CheckBox
                                            checkProps={{
                                                onChange: e => this.handleSelectChange(e),
                                                name: 'item',
                                            }}
                                            checkItems={this.checkItems(order.orderId)}
                                            selected={selected}
                                        />
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
                <Footer mobile>
                    <FooterBody>
                        {selected.length ? (
                            <ButtonGroup responsive space={4}>
                                <Button
                                    size="medium"
                                    variant="secondary"
                                    onClick={() => this.setState({ isAttentionOpen: true })}
                                >
                                    Tolak
                                </Button>
                                {order.acceptOrder.isLoading ? (
                                    <Button size="medium" variant="primary-alt">
                                        Loading...
                                    </Button>
                                ) : (
                                    <Button
                                        size="medium"
                                        variant="primary-alt"
                                        onClick={() => requestAcceptOrder(selected)}
                                    >
                                        Terima
                                    </Button>
                                )}
                            </ButtonGroup>
                        ) : (
                            <ButtonGroup responsive space={4}>
                                <Button size="medium" variant="primary-alt" disabled>
                                    Tolak
                                </Button>
                                <Button size="medium" variant="primary-alt" disabled>
                                    Terima
                                </Button>
                            </ButtonGroup>
                        )}
                    </FooterBody>
                </Footer>
                <FilterModal
                    activeTabs={'new'}
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
                <AttentionModal
                    isOpen={isAttentionOpen}
                    onClose={() => this.setState({ isAttentionOpen: false })}
                />
            </>
        )
    }
}
const OrderDeliveryBlock = ({ orderList, orderIndex, orderListIndex, onShowAll }) => {
    return (
        <Segment>
            <Link to={`/order/detail/${orderList.deliveryId}`}>
                <Row py={8} px={16} bg="white">
                    <Col>
                        <Text B10 color="black40" fontWeight="500" className="u-py-8">
                            PENGIRIMAN
                        </Text>
                        <Text B14 color="primary">
                            <Icon
                                name="delivery"
                                size={16}
                                fillColor={'primary'}
                                className="u-mr-8"
                            />
                            {orderList.courierName}
                        </Text>
                    </Col>
                    <Col className="u-tx-right">
                        <Text B10 color="black40" fontWeight="500" className="u-py-8">
                            {orderList.orderStatus === 'PRE_ORDER'
                                ? 'TANGGAL ESTIMASI KIRIM'
                                : 'BATAS RESPON'}
                        </Text>
                        <Text B10 fontWeight="500">
                            {orderList.orderStatus === 'PRE_ORDER' && (
                                <span className="u-bg-secondary-green u-rnd u-tx-white u-p-4 u-mr-8">
                                    PO
                                </span>
                            )}
                            <span className="u-bg-white u-tx-black70 u-bd u-bd-black30 u-rnd u-p-4">
                                {orderList.orderStatus === 'PRE_ORDER'
                                    ? orderList.deliveryEstimationDate
                                    : orderList.deadline}
                            </span>
                        </Text>
                    </Col>
                </Row>
                <Row px={16} pt={8} pb={16} mb={12} bg="white">
                    <Col>
                        {orderList.orderProductList.map((orderProductList, index) => (
                            <React.Fragment key={index}>
                                <Row
                                    className={`collapse${
                                        !orderList.show && index > 1 ? ' hide' : ''
                                    }`}
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
            </Link>
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
    getOrderNew,
    setOrderNew,
    getOrderCount,
    requestAcceptOrder,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewOrder)
