import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Tabs } from '@elevenia/master-ui/components/Molecules'
import { Segment } from '@elevenia/master-ui/components/Atom'
import { getOrderCount } from 'store/actions/order'
import HeaderBlock from './_component/Header'
import { Route, Switch, Redirect } from 'react-router-dom'
import moment from 'moment'
import NewOrder from './NewOrder'
import OnProcess from './OnProcess'
import Sent from './Sent'
import Unpaid from './Unpaid'
import Purchased from './Purchased'
import Delivered from './Delivered'

const Order = props => {
    const { order, getOrderCount, setAlerts } = props
    const tabs = [
        {
            uri: 'unpaid',
            orderStatus: 'UNPAID',
            name: 'Belum Dibayar',
            component: Unpaid,
        },
        {
            uri: 'new',
            orderStatus: 'DEFAULT_NEW_ORDER',
            name: 'Pesanan Baru',
            component: NewOrder,
        },
        {
            uri: 'onprocess',
            orderStatus: 'ON_PROCESS',
            name: 'Perlu Dikirim',
            component: OnProcess,
        },
        {
            uri: 'sent',
            orderStatus: 'SENT',
            name: 'Dalam Pengiriman',
            component: Sent,
        },
        {
            uri: 'delivered',
            orderStatus: 'DELIVERED',
            name: 'Diterima',
            component: Delivered,
        },
        {
            uri: 'purchased',
            orderStatus: 'PURCHASED_CONFIRM',
            name: 'Terkonfirmasi',
            component: Purchased,
        },
    ]
    const [initial, setInitial] = useState(false)
    const [activeTab, setActiveTab] = useState(tabs[1].uri) // default
    const handleChangeTabs = uri => {
        props.history.push(`/order/${uri}`)
    }
    const fetchCounter = () => {
        const startDate = moment()
            .subtract(1, 'months')
            .format('YYYY-MM-DD')
        const endDate = moment().format('YYYY-MM-DD')
        const params = {
            searchKeyword: '',
            customSort: 'ORDER_DESC',
            startDate: startDate ? startDate : '',
            endDate: endDate ? endDate : '',
            courier: [],
            isPickup: false,
        }
        getOrderCount(params)
        setInitial(true)
    }
    useEffect(() => {
        if (!order.counter.length && !initial) {
            fetchCounter()
        }
    })
    useEffect(() => {
        const { params } = props.match
        if (params && params.slug) {
            const found = tabs.find(
                ({ uri }) => uri.toLowerCase() === props.match.params.slug.toLowerCase(),
            )
            setActiveTab(found ? found.uri : tabs[1].uri)
        }
    }, [tabs, props.match])
    return (
        <>
            {setAlerts.alert.status && setAlerts.alert.componentMessage}
            <Segment position="fixed" width="100%" zIndex={1020}>
                <HeaderBlock />
                <Segment bg="white" position="relative" zIndex={1020}>
                    <Tabs
                        active={activeTab}
                        onChange={uri => handleChangeTabs(uri)}
                        longTabs
                        underlineSize={2}
                    >
                        {tabs.map(list => {
                            const foundCounter = order.counter.find(
                                key => key.orderStatus === list.orderStatus,
                            )
                            const count = foundCounter
                                ? foundCounter.count < 100
                                    ? `(${foundCounter.count})`
                                    : `(99+)`
                                : `     `
                            return (
                                <div key={list.uri}>
                                    {list.name} {count}
                                </div>
                            )
                        })}
                    </Tabs>
                </Segment>
            </Segment>
            <Segment height={93} />
            <Switch>
                {tabs.map((route, index) => {
                    return route.component ? (
                        <Route
                            key={index}
                            path={`/order/${route.uri}`}
                            exact={true}
                            name={route.name}
                            render={props => {
                                return <route.component {...props} />
                            }}
                        />
                    ) : null
                })}
                <Redirect from="/order" to="/order/new" />
            </Switch>
        </>
    )
}

const mapStateToProps = ({ order, setAlerts }) => ({
    order,
    setAlerts,
})
const mapDispatchToProps = { getOrderCount }

export default connect(mapStateToProps, mapDispatchToProps)(Order)
