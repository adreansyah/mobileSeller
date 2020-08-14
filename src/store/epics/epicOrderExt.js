import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'
import { getOrderNew, setOrderNew, getOrderCount } from 'store/actions/order'

const arrayToQueryParams = (array, key) => {
    let query = ''
    for (let i = 0; i < array.length; i++) {
        query += key + '=' + array[i] + '&'
    }
    return query
}

export const RequestOrderExt = (action$, store) =>
    action$.pipe(
        ofType(
            'REQUEST_GET_ORDER_DETAIL',
            'REQUEST_GET_ORDER_COUNT',
            'REQUEST_GET_COURIER',
            'REQUEST_ACCEPT_ORDER',
            'REQUEST_DOWNLOAD_SHIPPING_LABEL',
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_GET_ORDER_DETAIL':
                        try {
                            const orderDetail = await Services().get(
                                '/api/order/delivery/' + action.payload.id,
                            )
                            return {
                                type: 'GET_ORDER_DETAIL_SUCCESS',
                                payload: {
                                    data: orderDetail.data,
                                },
                            }
                        } catch (error) {
                            const newError = {
                                type: 'GET_ORDER_DETAIL_FAILED',
                                payload: {
                                    error,
                                },
                            }
                            throw newError
                        }
                    case 'REQUEST_GET_ORDER_COUNT':
                        try {
                            const countParams = { ...action.payload.params }
                            const courierParams =
                                countParams.courier && countParams.courier.length
                                    ? arrayToQueryParams(countParams.courier, 'courier')
                                    : ''
                            delete countParams['courier']
                            const orderCount = await Services().get(
                                `/api/orderCount?${courierParams}`,
                                countParams,
                            )
                            return {
                                type: 'GET_ORDER_COUNT_SUCCESS',
                                payload: {
                                    data: orderCount.data,
                                },
                            }
                        } catch (error) {
                            const newError = {
                                type: 'GET_ORDER_COUNT_FAILED',
                                payload: {
                                    error,
                                },
                            }
                            throw newError
                        }
                    case 'REQUEST_GET_COURIER':
                        try {
                            const courier = await Services().get('/api/orders/getCourier')
                            return {
                                type: 'GET_COURIER_SUCCESS',
                                payload: {
                                    data: courier.data,
                                },
                            }
                        } catch (error) {
                            const newError = {
                                type: 'GET_COURIER_FAILED',
                                payload: {
                                    error,
                                },
                            }
                            throw newError
                        }
                    case 'REQUEST_ACCEPT_ORDER':
                        try {
                            const accept = await Services().put(
                                '/api/orders/acceptAll',
                                action.payload.data,
                            )
                            const message =
                                accept.data && accept.data.message
                                    ? accept.data.message
                                    : `${action.payload.data.length} pesanan berhasil diterima`
                            return async dispatch => {
                                await dispatch({ type: 'ACCEPT_ORDER_SUCCESS' })
                                await dispatch({ type: 'ALERT_SUCCESS', payload: { message } })
                                await dispatch(setOrderNew({ data: [] }))
                                await dispatch(
                                    getOrderNew({ ...store.value.order.new.params, page: 0 }),
                                )
                                await dispatch(getOrderCount(store.value.order.new.params))
                                setTimeout(() => dispatch({ type: 'ALERT_CLEARS' }), 3000)
                            }
                        } catch (error) {
                            const newError = {
                                type: 'ACCEPT_ORDER_FAILED',
                                payload: {
                                    error,
                                },
                            }
                            throw newError
                        }
                    case 'REQUEST_DOWNLOAD_SHIPPING_LABEL':
                        try {
                            let download = null
                            const dataShipping = store.value.order.downloadShippingLabel
                            const params = action.payload.params
                            if (
                                dataShipping.params &&
                                dataShipping.params.orderId === params.orderId &&
                                dataShipping.params.deliveryId === params.deliveryId
                            ) {
                                download = dataShipping.data
                            } else {
                                const resDownload = await Services().get(
                                    '/api/orders/generate-pdf',
                                    params,
                                )
                                download = resDownload.data
                            }
                            return async dispatch => {
                                await dispatch({
                                    type: 'DOWNLOAD_SHIPPING_LABEL_SUCCESS',
                                    payload: { data: download, params: params },
                                })
                                window.open(download, `${params.orderId}_${params.deliveryId}`)
                            }
                        } catch (error) {
                            const newError = {
                                type: 'DOWNLOAD_SHIPPING_LABEL_SUCCESS',
                                payload: {
                                    error,
                                },
                            }
                            throw newError
                        }
                    default:
                        break
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
