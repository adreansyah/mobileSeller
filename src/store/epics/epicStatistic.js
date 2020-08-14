import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestStatistic = (action$, store) =>
    action$.pipe(
        ofType(
            'REQUEST_STATISTIC_SELLER_REVENUE',
            'REQUEST_STATISTIC_ORDER_STATUS',
            'REQUEST_STATISTIC_GENERAL_PERFORMANCE',
            'REQUEST_STATISTIC_PRODUCT_PERFORMANCE',
            'REQUEST_STATISTIC_PRODUCT_SOLD_VIEW',
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_STATISTIC_SELLER_REVENUE':
                        try {
                            const sellerRevenue = await Services().get(
                                '/api/statistics/seller-revenue',
                                action.payload.params,
                            )
                            return {
                                type: 'GET_STATISTIC_SELLER_REVENUE_SUCCESS',
                                payload: { ...sellerRevenue.data, ...action.payload.params },
                            }
                        } catch (error) {
                            const newError = {
                                type: 'GET_STATISTIC_SELLER_REVENUE_FAILED',
                                error,
                                ...action.payload.params,
                            }
                            throw newError
                        }
                    case 'REQUEST_STATISTIC_ORDER_STATUS':
                        try {
                            const orderStatus = await Services().get(
                                '/api/statistics/order-status',
                                action.payload.params,
                            )
                            return {
                                type: 'GET_STATISTIC_ORDER_STATUS_SUCCESS',
                                payload: { ...orderStatus.data, ...action.payload.params },
                            }
                        } catch (error) {
                            const newError = {
                                type: 'GET_STATISTIC_ORDER_STATUS_FAILED',
                                error,
                                ...action.payload.params,
                            }
                            throw newError
                        }
                    case 'REQUEST_STATISTIC_GENERAL_PERFORMANCE':
                        try {
                            const generalPerformance = await Services().get(
                                '/api/statistics/general-performance',
                                action.payload.params,
                            )
                            return {
                                type: 'GET_STATISTIC_GENERAL_PERFORMANCE_SUCCESS',
                                payload: { ...generalPerformance.data, ...action.payload.params },
                            }
                        } catch (error) {
                            const newError = {
                                type: 'GET_STATISTIC_GENERAL_PERFORMANCE_FAILED',
                                error,
                                ...action.payload.params,
                            }
                            throw newError
                        }
                    case 'REQUEST_STATISTIC_PRODUCT_PERFORMANCE':
                        try {
                            const productPerformance = await Services().get(
                                '/api/statistics/product-performance',
                                action.payload.params,
                            )
                            return {
                                type: 'GET_STATISTIC_PRODUCT_PERFORMANCE_SUCCESS',
                                payload: productPerformance.data,
                            }
                        } catch (error) {
                            const newError = {
                                type: 'GET_STATISTIC_PRODUCT_PERFORMANCE_FAILED',
                                error,
                            }
                            throw newError
                        }
                    case 'REQUEST_STATISTIC_PRODUCT_SOLD_VIEW':
                        try {
                            const productSoldView = await Services().get(
                                '/api/statistics/product-sold-view',
                                action.payload.params,
                            )
                            return {
                                type: 'GET_STATISTIC_PRODUCT_SOLD_VIEW_SUCCESS',
                                payload: productSoldView.data,
                            }
                        } catch (error) {
                            const newError = {
                                type: 'GET_STATISTIC_PRODUCT_SOLD_VIEW_FAILED',
                                error,
                            }
                            throw newError
                        }
                    default:
                        break
                }
            } catch ({ type, error, period }) {
                const { message } = error
                return dispatch => {
                    dispatch({ type, period })
                    dispatch({ type: 'ALERT_ERROR', payload: { message: message } })
                    setTimeout(() => dispatch({ type: 'ALERT_CLEARS' }), 3000)
                }
            }
        }),
    )
