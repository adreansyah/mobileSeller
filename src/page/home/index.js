import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { trackScreenView } from 'helper/Tracker'
import HeaderBlock from './_component/Header'
import BalanceRevenue from './_component/BalanceRevenue'
import { getOrderCount } from 'store/actions/order'
import { getQnaCounter } from 'store/actions/qna'
import ActionCreators from 'store/actions/settlement'
import {
    getHomeQNAList,
    getHomeProductList,
    getHomeOrderList,
    hideHomeNote,
} from 'store/actions/home'
import { Segment, Spinner } from '@elevenia/master-ui/components/Atom'
import moment from 'moment'
import MenuList from './_component/MenuList'
import NewOrderBlock from './_component/NewOrderBlock'
import NewQNABlock from './_component/NewQNABlock'
import ProductLimitBlock from './_component/ProductLimitBlock'
import InformationDetailModal from './_component/InformationDetailModal'
import AttentionNoteBlock from './_component/AttentionNoteBlock'
import ButtonAddProduct from './_component/ButtonAddProduct';

const Home = ({
    getOrderCount,
    getQnaCounter,
    DefaultSettlement,
    DefaultSettlementSaldo,
    getHomeQNAList,
    getHomeProductList,
    getHomeOrderList,
    hideHomeNote,
    home,
    order,
    qna,
    settlement,
    setAlerts,
    ...props
}) => {
    const [initial, setInitial] = useState(false)
    useEffect(() => {
        trackScreenView('Home', 'home-id')
    }, [])

    useEffect(() => {
        const fetchData = () => {
            const startDate = moment()
                .subtract(1, 'months')
                .format('YYYY-MM-DD')
            const endDate = moment().format('YYYY-MM-DD')
            const counterParams = {
                searchKeyword: '',
                startDate: startDate ? startDate : '',
                endDate: endDate ? endDate : '',
                courier: [],
                isPickup: false,
            }
            !home.order.data.length &&
                getHomeOrderList({
                    page: 0,
                    size: 5,
                    orderStatus: 'DEFAULT_NEW_ORDER',
                    sort: 'orderDate,desc',
                    isPickup: false,
                })
            !home.qna.data.length &&
                getHomeQNAList({
                    page: 0,
                    size: 5,
                    filter: true,
                    sort: 'boardDate,desc',
                })
            !home.product.data.length &&
                getHomeProductList({
                    page: 0,
                    size: 5,
                    selStatCode: 103,
                    stock: 3,
                })
            !order.counter.length && getOrderCount(counterParams)
            !qna.counter.data.public && !qna.counter.data.private && getQnaCounter()
            !settlement.totalAkanDitransfer && DefaultSettlement()
            !settlement.dataSaldo.accumulativeCyberMoney && DefaultSettlementSaldo()
        }
        if (!initial) {
            setInitial(true)
            fetchData()
        }
    }, [
        initial,
        home,
        order,
        qna,
        settlement,
        getOrderCount,
        getQnaCounter,
        DefaultSettlement,
        DefaultSettlementSaldo,
        getHomeQNAList,
        getHomeProductList,
        getHomeOrderList,
    ])
    const [isInfoDetailOpen, setIsInfoDetailOpen] = useState(false)
    return (
        <>
            {setAlerts.alert.componentMessage}
            <HeaderBlock />
            <BalanceRevenue />
            <Segment pb={120}>
                {home.homeNoteShow && (
                    <AttentionNoteBlock
                        onOpenModal={() => setIsInfoDetailOpen(true)}
                        onHideNote={() => hideHomeNote()}
                    />
                )}
                <MenuList {...props} />
                {home.order.isLoaded ? (
                    home.order.data.length > 0 && <NewOrderBlock data={home.order.data} {...props} />
                ) : (
                    <Segment width="100%" height={20} my={16} className="u-tx-center">
                        <Spinner />
                    </Segment>
                )}
                {home.qna.isLoaded ? (
                    home.qna.data.length > 0 && <NewQNABlock data={home.qna.data} {...props} />
                ) : (
                    <Segment width="100%" height={20} my={16} className="u-tx-center">
                        <Spinner />
                    </Segment>
                )}
                {home.product.isLoaded ? (
                    home.product.data.length > 0 && (
                        <ProductLimitBlock data={home.product.data} {...props} />
                    )
                ) : (
                    <Segment width="100%" height={20} my={16} className="u-tx-center">
                        <Spinner />
                    </Segment>
                )}
            </Segment>
            <ButtonAddProduct />
            <InformationDetailModal
                isOpen={isInfoDetailOpen}
                onClose={() => setIsInfoDetailOpen(false)}
            />
        </>
    )
}

const mapStateToProps = ({ home, order, qna, settlement, setAlerts }) => ({
    home,
    order,
    qna,
    settlement,
    setAlerts
})
const mapDispatchToProps = {
    getOrderCount,
    getQnaCounter,
    DefaultSettlement: ActionCreators.DefaultSettlement,
    DefaultSettlementSaldo: ActionCreators.DefaultSettlementSaldo,
    getHomeQNAList,
    getHomeProductList,
    getHomeOrderList,
    hideHomeNote,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
