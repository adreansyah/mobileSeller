import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestHome = (action$, store) =>
    action$.pipe(
        ofType(
            'REQUEST_GET_HOME_ORDER_LIST',
            'REQUEST_GET_HOME_QNA_LIST',
            'REQUEST_GET_HOME_PRODUCT_LIST',
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_GET_HOME_ORDER_LIST':
                        try {
                            const order = await Services().get(
                                '/api/orders',
                                action.payload.params,
                            )
                            return {
                                type: 'GET_HOME_ORDER_LIST_SUCCESS',
                                payload: {
                                    data: order.data,
                                },
                            }
                        } catch (error) {
                            const newError = {
                                type: 'GET_HOME_ORDER_LIST_FAILED',
                                payload: {
                                    error,
                                },
                            }
                            throw newError
                        }
                    case 'REQUEST_GET_HOME_QNA_LIST':
                        try {
                            const qna = await Services().get(
                                '/api/qna-list/',
                                action.payload.params,
                            )
                            return {
                                type: 'GET_HOME_QNA_LIST_SUCCESS',
                                payload: {
                                    data: qna.data.content,
                                },
                            }
                        } catch (error) {
                            const newError = {
                                type: 'GET_HOME_QNA_LIST_FAILED',
                                payload: {
                                    error,
                                },
                            }
                            throw newError
                        }
                    case 'REQUEST_GET_HOME_PRODUCT_LIST':
                        try {
                            const product = await Services().get(
                                '/api/products-list/',
                                action.payload.params,
                            )
                            return {
                                type: 'GET_HOME_PRODUCT_LIST_SUCCESS',
                                payload: {
                                    data: product.data.content,
                                },
                            }
                        } catch (error) {
                            const newError = {
                                type: 'GET_HOME_PRODUCT_LIST_FAILED',
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
