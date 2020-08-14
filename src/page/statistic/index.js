import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Icon, ButtonLink, Segment } from '@elevenia/master-ui/components/Atom'
import { Tabs } from '@elevenia/master-ui/components/Molecules'
import { Header, HeaderLeft, HeaderBody } from '@elevenia/master-ui/components/Organisms/Mobile'
import {
    getStatisticSellerRevenue,
    getStatisticOrderStatus,
    getStatisticGeneralPerformance,
    getStatisticProductPerformance,
} from 'store/actions/statistic'
import SellerRevenue from './_component/SellerRevenue'
import OrderStatus from './_component/OrderStatus'
import GeneralPerformance from './_component/GeneralPerformance'
import ProductPerformance from './_component/ProductPerformance'
import { trackScreenView } from 'helper/Tracker'

const Statistic = props => {
    useEffect(() => {
        trackScreenView('Statistic', 'statistic-id')
    }, [])

    useEffect(() => {
        const {
            getStatisticSellerRevenue,
            getStatisticOrderStatus,
            getStatisticGeneralPerformance,
            getStatisticProductPerformance,
            statistic,
        } = props
        const { sellerRevenue, orderStatus, generalPerformance, productPerformance } = statistic
        const defaultParams = { period: 'last_7' }
        if (
            !sellerRevenue.isLoaded &&
            !orderStatus.isLoaded &&
            !generalPerformance.isLoaded &&
            !productPerformance.isLoaded
        ) {
            getStatisticSellerRevenue(defaultParams)
            getStatisticOrderStatus(defaultParams)
            getStatisticGeneralPerformance({ period: 'last_30' })
            getStatisticProductPerformance()
        }
    }, [props])

    const tabs = [
        {
            key: 'sellerRevenue',
            name: 'Pendapatan',
            icon: 'cash',
        },
        {
            key: 'orderStatus',
            name: 'Penjualan',
            icon: 'tag',
        },
        {
            key: 'generalPerformance',
            name: 'Performa Toko',
            icon: 'store',
        },
        {
            key: 'productPerformance',
            name: 'Status Produk',
            icon: 'document',
        },
    ]
    const [activeTab, setActiveTab] = useState(tabs[0].key)

    const period = [
        {
            checked: true,
            value: 'last_7',
            label: '7 Hari Terakhir',
        },
        {
            checked: false,
            value: 'last_30',
            label: '1 Bulan Terakhir',
        },
        {
            checked: false,
            value: 'last_90',
            label: '3 Bulan Terakhir',
        },
        {
            checked: false,
            value: 'last_180',
            label: '6 Bulan Terakhir',
        },
        {
            checked: false,
            value: 'last_360',
            label: '1 Tahun Terakhir',
        },
    ]
    const getContent = activeTab => {
        switch (activeTab) {
            case 'sellerRevenue':
                return <SellerRevenue period={period} />
            case 'orderStatus':
                return <OrderStatus period={period} />
            case 'generalPerformance':
                return <GeneralPerformance period={period} />
            case 'productPerformance':
                return <ProductPerformance />
            default:
                return
        }
    }

    return (
        <div className="u-ps-relative height--100 u-bg-white">
            {props.setAlerts.alert.componentMessage}
            <Segment position="fixed" width="100%" zIndex={1020} className="u-bg-white">
                <Header border>
                    <HeaderLeft>
                        <ButtonLink onClick={() => props.history.goBack()}>
                            <Icon name={'arrow-left'} size={24} fillColor="black50" />
                        </ButtonLink>
                    </HeaderLeft>
                    <HeaderBody>Statistik</HeaderBody>
                </Header>
                <Segment className="u-pt-16 custom-tabs">
                    <Tabs
                        active={activeTab}
                        onChange={activeTab => setActiveTab(activeTab)}
                        longTabs
                        tabsMargin="10"
                        underlineSize={2}
                    >
                        {tabs.map(list => (
                            <React.Fragment key={list.key}>
                                <div className="tab-list">
                                    <Icon
                                        name={list.icon}
                                        size={24}
                                        fillColor={list.key === activeTab ? 'primary' : 'info'}
                                    />
                                    {list.name}
                                </div>
                            </React.Fragment>
                        ))}
                    </Tabs>
                </Segment>
            </Segment>
            <Segment height={135} />
            {getContent(activeTab)}
        </div>
    )
}

const mapStateToProps = ({ statistic, setAlerts }) => ({
    statistic,
    setAlerts
})
const mapDispatchToProps = {
    getStatisticSellerRevenue,
    getStatisticOrderStatus,
    getStatisticGeneralPerformance,
    getStatisticProductPerformance,
}
export default connect(mapStateToProps, mapDispatchToProps)(Statistic)
