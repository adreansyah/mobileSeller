import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

const ORDER_UNPAID_ENUM = 'UNPAID'
const ORDER_NEW_ENUM = 'DEFAULT_NEW_ORDER'
const ORDER_ON_PROCESS_ENUM = 'ON_PROCESS'
const ORDER_SENT_ENUM = 'SENT'
const ORDER_DELIVERED_ENUM = 'DELIVERED'
const ORDER_PURCHASED_ENUM = 'PURCHASED_CONFIRM'

const arrayToQueryParams = (array, key) => {
    let query = ''
    for (let i = 0; i < array.length; i++) {
        query += key + '=' + array[i] + '&'
    }
    return query
}

const getSortParam = enum_key => {
    switch (enum_key) {
        case 'ORDER_DATE_ASC':
            return {
                sort: 'orderDate,asc',
            }
        case 'ORDER_DATE_DESC':
            return {
                sort: 'orderDate,desc',
            }
        case 'ORDER_ASC':
            return {
                customSort: 'ORDER_ASC',
            }
        case 'ORDER_DESC':
            return {
                customSort: 'ORDER_DESC',
            }
        default:
            return {}
    }
}

export const RequestOrder = (action$, store) =>
    action$.pipe(
        ofType(
            'REQUEST_GET_ORDER_UNPAID',
            'REQUEST_GET_ORDER_NEW',
            'REQUEST_GET_ORDER_ON_PROCESS',
            'REQUEST_GET_ORDER_SENT',
            'REQUEST_GET_ORDER_DELIVERED',
            'REQUEST_GET_ORDER_PURCHASED',
        ),
        mergeMap(async action => {
            try {
                const { courier } = action.payload.params
                const courierParams =
                    courier && courier.length ? arrayToQueryParams(courier, 'courier') : ''
                let params = null
                let responseType = null
                switch (action.type) {
                    case 'REQUEST_GET_ORDER_UNPAID':
                        responseType = 'GET_ORDER_UNPAID'
                        params = {
                            ...action.payload.params,
                            orderStatus: ORDER_UNPAID_ENUM,
                        }
                        break
                    case 'REQUEST_GET_ORDER_NEW':
                        responseType = 'GET_ORDER_NEW'
                        const { orderStatus } = action.payload.params
                        params = {
                            ...action.payload.params,
                            orderStatus: orderStatus ? orderStatus : ORDER_NEW_ENUM,
                        }
                        break
                    case 'REQUEST_GET_ORDER_ON_PROCESS':
                        responseType = 'GET_ORDER_ON_PROCESS'
                        params = {
                            ...action.payload.params,
                            orderStatus: ORDER_ON_PROCESS_ENUM,
                        }
                        break
                    case 'REQUEST_GET_ORDER_SENT':
                        responseType = 'GET_ORDER_SENT'
                        params = {
                            ...action.payload.params,
                            orderStatus: ORDER_SENT_ENUM,
                        }
                        break
                    case 'REQUEST_GET_ORDER_DELIVERED':
                        responseType = 'GET_ORDER_DELIVERED'
                        params = {
                            ...action.payload.params,
                            orderStatus: ORDER_DELIVERED_ENUM,
                        }
                        break
                    case 'REQUEST_GET_ORDER_PURCHASED':
                        responseType = 'GET_ORDER_PURCHASED'
                        params = {
                            ...action.payload.params,
                            orderStatus: ORDER_PURCHASED_ENUM,
                        }
                        break
                    default:
                        break
                }
                try {
                    const sort = getSortParam(params.activeSort)
                    const newParams = { ...params, ...sort }
                    delete newParams['courier']
                    delete newParams['activeSort']
                    const response = await Services().get(`/api/orders?${courierParams}`, newParams)
                    const overrideOrder = response.data.map(order => {
                        const overrideOrderList = order.orderList.map(orderList => {
                            const overrideOrderProductList = orderList.orderProductList.map(
                                orderProductList => {
                                    return {
                                        ...orderProductList,
                                        checked: false,
                                        show: false,
                                    }
                                },
                            )
                            return {
                                ...orderList,
                                orderProductList: overrideOrderProductList,
                                checked: false,
                                show: false,
                            }
                        })
                        return {
                            ...order,
                            orderList: overrideOrderList,
                            checked: false,
                            show: false,
                        }
                    })
                    return {
                        type: `${responseType}_SUCCESS`,
                        payload: {
                            params,
                            data: overrideOrder,
                        },
                    }
                } catch (error) {
                    const newError = {
                        type: `${responseType}_FAILED`,
                        payload: {
                            params,
                            error,
                        },
                    }
                    throw newError
                }
            } catch ({ type, payload }) {
                const { message } = payload.error
                return dispatch => {
                    dispatch({ type, payload })
                    dispatch({ type: 'ALERT_ERROR', payload: { message: message } })
                    setTimeout(() => dispatch({ type: 'ALERT_CLEARS' }), 3000)
                }
            }
        }),
    )
