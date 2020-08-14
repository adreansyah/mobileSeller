import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { getOrderOnProcess, setOrderOnProcess, getOrderCount } from 'store/actions/order'
import InfiniteScroll from 'component/InfiniteScroll'
import {
    Icon,
    Text,
    Row,
    Col,
    Container,
    Segment,
    Button,
    ButtonGroup,
    Spinner,
} from '@elevenia/master-ui/components/Atom'
import { formatRupiah } from 'helper'
import FilterModal from '../_component/FilterModal'
import SortModal from '../_component/SortModal'
import AttentionModal from '../_component/AttentionModal'
import FilterSortBlock from '../_component/FilterSortBlock'
import ErrorBlock from '../_component/ErrorBlock'
import JneRegular from '../_component/Shipment/JneRegular'
import JnePickup from '../_component/Shipment/JnePickup'
import JneOnlineBooking from '../_component/Shipment/JneOnlineBooking'
import EleveniaDropOff from '../_component/Shipment/EleveniaDropOff'
import GojekPickup from '../_component/Shipment/GojekPickup'
import EleveniaPickup from '../_component/Shipment/EleveniaPickup'

const JNE_REGULAR_MODAL = 'JNE_REGULAR_MODAL'
const JNE_PICKUP_MODAL = 'JNE_PICKUP_MODAL'
const JOB_MODAL = 'JOB_MODAL'
const GOJEK_MODAL = 'GOJEK_MODAL'
const ELEVENIA_DROP_OFF_MODAL = 'ELEVENIA_DROP_OFF_MODAL'
const ELEVENIA_PICKUP_MODAL = 'ELEVENIA_PICKUP_MODAL'

class OnProcessOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            params: this.params,
            isFilterOpen: false,
            isFilterDiff: false,
            isSortOpen: false,
            isSortDiff: false,
            selectedOrder: null,
            modal: '',
            isAttentionOpen: false,
        }
    }
    get params() {
        const startDate = moment()
            .subtract(1, 'months')
            .format('YYYY-MM-DD')
        const endDate = moment().format('YYYY-MM-DD')
        return {
            orderStatus: 'ON_PROCESS',
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
        const { params } = this.props.order.process
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
        const { getOrderOnProcess, order } = this.props
        const { params } = this.state
        const page = order.process.params ? order.process.params.page + 1 : 0
        this.setState({ params: { ...params, page } }, () => getOrderOnProcess(this.state.params))
    }
    handleFilter = async nextParams => {
        const { setOrderOnProcess, getOrderOnProcess, getOrderCount } = this.props
        const isFilterDiff = this.diffObject(this.params, nextParams)
        this.setState({ params: nextParams, isFilterDiff })
        await setOrderOnProcess({ data: [] })
        await getOrderOnProcess(nextParams)
        await getOrderCount(nextParams)
    }
    handleSort = async nextParams => {
        const { setOrderOnProcess, getOrderOnProcess } = this.props
        const isSortDiff = this.params.activeSort !== nextParams.activeSort
        this.setState({ params: nextParams, isSortDiff })
        await setOrderOnProcess({ data: [] })
        await getOrderOnProcess(nextParams)
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
        const { order, setOrderOnProcess } = this.props
        const orderData = order.process.data
        orderData[orderIdx].orderList[OrderListIdx].show = !orderData[orderIdx].orderList[
            OrderListIdx
        ].show
        setOrderOnProcess({ data: [...orderData] })
    }
    toggleModal = selectedOrder => {
        if (!selectedOrder) {
            this.setState({ modal: null, selectedOrder: null })
            return
        }
        const courier = selectedOrder.courier ? selectedOrder.courier.toLowerCase() : ''
        switch (courier) {
            case 'jne_express':
            case 'jne_regular':
                this.setState({ modal: JNE_REGULAR_MODAL, selectedOrder })
                break
            case 'jne_regular_pickup':
                this.setState({ modal: JNE_PICKUP_MODAL, selectedOrder })
                break
            case 'jne_job_regular':
                this.setState({ modal: JOB_MODAL, selectedOrder })
                break
            case 'jne_job_express':
                this.setState({ modal: JOB_MODAL, selectedOrder })
                break
            case 'gojek':
                this.setState({ modal: GOJEK_MODAL, selectedOrder })
                break
            case 'elevenia_express':
                if (selectedOrder.sellerServiceType === '01') {
                    this.setState({ modal: ELEVENIA_PICKUP_MODAL, selectedOrder })
                } else {
                    this.setState({ modal: ELEVENIA_DROP_OFF_MODAL, selectedOrder })
                }
                break
            default:
                return false
        }
    }
    render() {
        const {
            isFilterOpen,
            params,
            isFilterDiff,
            isSortDiff,
            isSortOpen,
            modal,
            selectedOrder,
            isAttentionOpen,
        } = this.state
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
                        refs="onprocess-order-scroll"
                        loadMore={() => this.fetchPerPage()}
                        hasMore={order.process.loadMore}
                        isLoading={!order.process.isLoaded}
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
                            order.process.data.length === 0 &&
                            order.process.isLoaded && (
                                <ErrorBlock
                                    key={1}
                                    errOnSearch={params.searchKeyword ? true : false}
                                />
                            )
                        }
                    >
                        {order.process.data.map((order, orderIndex) => (
                            <React.Fragment key={orderIndex}>
                                <Container>
                                    <Segment bg="black10" px={16} py={8}>
                                        <Text B14 color="black70">
                                            {`No. Pesanan : ${order.orderId}`}
                                        </Text>
                                    </Segment>
                                    {order.orderList.map((orderList, orderListIndex) => (
                                        <React.Fragment key={orderListIndex}>
                                            <OrderDeliveryBlock
                                                orderIndex={orderIndex}
                                                orderList={orderList}
                                                orderListIndex={orderListIndex}
                                                toggleModal={() => this.toggleModal(orderList)}
                                                onShowAll={(resOrderIndex, resOrderListIndex) =>
                                                    this.handleShowAll(
                                                        resOrderIndex,
                                                        resOrderListIndex,
                                                    )
                                                }
                                                onOpenAttentionModal={() =>
                                                    this.setState({ isAttentionOpen: true })
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
                    activeTabs={'onprocess'}
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
                <JneRegular
                    isOpen={modal === JNE_REGULAR_MODAL}
                    onClose={() => this.toggleModal()}
                    selectedOrder={selectedOrder}
                    {...this.props}
                />
                <JnePickup
                    isOpen={modal === JNE_PICKUP_MODAL}
                    onClose={() => this.toggleModal()}
                    selectedOrder={selectedOrder}
                    {...this.props}
                />
                <JneOnlineBooking
                    isOpen={modal === JOB_MODAL}
                    onClose={() => this.toggleModal()}
                    selectedOrder={selectedOrder}
                    {...this.props}
                />
                <EleveniaDropOff
                    isOpen={modal === ELEVENIA_DROP_OFF_MODAL}
                    onClose={() => this.toggleModal()}
                    selectedOrder={selectedOrder}
                    {...this.props}
                />
                <EleveniaPickup
                    isOpen={modal === ELEVENIA_PICKUP_MODAL}
                    onClose={() => this.toggleModal()}
                    selectedOrder={selectedOrder}
                    {...this.props}
                />
                <GojekPickup
                    isOpen={modal === GOJEK_MODAL}
                    onClose={() => this.toggleModal()}
                    selectedOrder={selectedOrder}
                    {...this.props}
                />
            </>
        )
    }
}

const OrderDeliveryBlock = ({
    orderList,
    orderIndex,
    orderListIndex,
    onShowAll,
    toggleModal,
    onOpenAttentionModal,
}) => {
    const courierSelect = [
        'TIKI_Regular',
        'TIKI_Express',
        'INDOPAKET',
        'REGULAR_SELLER_CUSTOM',
        'DIRECT_SELLER_CUSTOM',
    ]
    return (
        <Segment>
            <Link to={`/order/detail/${orderList.deliveryId}`}>
                <Row py={8} px={16} bg="white">
                    <Col>
                        <Text B10 color="black40" fontWeight="500" className="u-py-8">
                            PENGIRIMAN
                        </Text>
                        <Text B14 color="primary">
                            <span style={{ verticalAlign: 'middle' }}>
                                <Icon
                                    name="delivery"
                                    size={16}
                                    fillColor={'primary'}
                                    className="u-mr-8"
                                />
                            </span>
                            {orderList.courierName}
                        </Text>
                    </Col>
                    <Col className="u-tx-right">
                        {orderList.status ? (
                            <>
                                <Text B10 color="black40" fontWeight="500" className="u-py-8">
                                    STATUS
                                </Text>
                                <Text B10 fontWeight="500">
                                    <span className="u-bg-white u-tx-black70 u-bd u-bd-black30 u-rnd u-p-4">
                                        {orderList.status}
                                    </span>
                                </Text>
                            </>
                        ) : (
                            <>
                                <Text B10 color="black40" fontWeight="500" className="u-py-8">
                                    BATAS RESPON
                                </Text>
                                <Text B10 fontWeight="500">
                                    <span className="u-bg-white u-tx-black70 u-bd u-bd-black30 u-rnd u-p-4">
                                        {orderList.deadline}
                                    </span>
                                    {orderList.nearDeadline && (
                                        <span
                                            className="u-ml-4"
                                            style={{ verticalAlign: 'middle' }}
                                        >
                                            <Icon name="attention" size={16} fillColor="primary" />
                                        </span>
                                    )}
                                </Text>
                            </>
                        )}
                    </Col>
                </Row>
                <Row px={16} py={8} bg="white">
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
            {courierSelect.indexOf(orderList.courier) > -1 ? (
                <Row px={16} pb={24} mb={12} bg="white">
                    <Col>
                        <Segment borderRadius={12} bg="black20" py={8} px={12}>
                            <Text B14 color="black40">
                                Pesanan ini tidak dapat diproses melalui Mobile Seller Office.
                                <span
                                    className="u-tx-primary u-ml-4"
                                    style={{ fontWeight: 500 }}
                                    onClick={() => onOpenAttentionModal()}
                                >
                                    Lihat Detail
                                </span>
                            </Text>
                        </Segment>
                    </Col>
                </Row>
            ) : (
                <Row
                    px={16}
                    pb={orderList.canProcessDelivery || orderList.canTrack ? 24 : 4}
                    mb={12}
                    bg="white"
                >
                    <Col>
                        <ButtonGroup responsive space={8}>
                            {orderList.canTrack ? (
                                <Button size="small" variant="secondary">
                                    LACAK
                                </Button>
                            ) : (
                                orderList.canCancelDelivery && (
                                    <Button
                                        size="small"
                                        variant="secondary"
                                        onClick={() => onOpenAttentionModal()}
                                    >
                                        BATALKAN PESANAN
                                    </Button>
                                )
                            )}
                            {orderList.canProcessDelivery && (
                                <Button
                                    size="small"
                                    variant="primary-alt"
                                    onClick={() => toggleModal()}
                                >
                                    {orderList.deliveryButtonLabel}
                                </Button>
                            )}
                        </ButtonGroup>
                    </Col>
                </Row>
            )}
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
    getOrderOnProcess,
    setOrderOnProcess,
    getOrderCount,
}

export default connect(mapStateToProps, mapDispatchToProps)(OnProcessOrder)
