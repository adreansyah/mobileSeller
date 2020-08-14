import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'
import {
    getOrderOnProcess,
    setOrderOnProcess,
    getOrderCount,
    setOrderSent,
    getOrderSent,
} from 'store/actions/order'

export const RequestOrderShip = (action$, store) =>
    action$.pipe(
        ofType(
            'REQUEST_SUBMIT_RESI_JNE_REGULAR',
            'REQUEST_SUBMIT_RESI_JNE_PICKUP',
            'REQUEST_SUBMIT_RESI_JOB',
            'REQUEST_SUBMIT_RESI_GOJEK',
            'REQUEST_SUBMIT_RESI_ELEVENIA_EXPRESS',
            'REQUEST_GET_JNE_PICKUP_DATE',
            'REQUEST_GET_ELEVENIA_PICKUP_DATE',
            'REQUEST_GET_ELEVENIA_DROP_OFF_ADDRESS',
            'REQUEST_GET_GOJEK_PICKUP_ADDRESS',
        ),
        mergeMap(async action => {
            try {
                if (action.type === 'REQUEST_GET_JNE_PICKUP_DATE') {
                    try {
                        const resJNEPickup = await Services().get(
                            '/api/orders/getJNEPickupDate',
                            action.payload.params,
                        )
                        return {
                            type: 'GET_JNE_PICKUP_DATE_SUCCESS',
                            payload: {
                                data: resJNEPickup.data,
                                params: action.payload.params,
                            },
                        }
                    } catch (error) {
                        const newError = {
                            type: 'GET_JNE_PICKUP_DATE_FAILED',
                            payload: {
                                error,
                            },
                        }
                        throw newError
                    }
                } else if (action.type === 'REQUEST_GET_ELEVENIA_PICKUP_DATE') {
                    try {
                        const resEleveniaPickup = await Services().get(
                            '/api/orders/getEleveniaExpressDate',
                            action.payload.params,
                        )
                        return {
                            type: 'GET_ELEVENIA_PICKUP_DATE_SUCCESS',
                            payload: {
                                data: resEleveniaPickup.data,
                                params: action.payload.params,
                            },
                        }
                    } catch (error) {
                        const newError = {
                            type: 'GET_ELEVENIA_PICKUP_DATE_FAILED',
                            payload: {
                                error,
                            },
                        }
                        throw newError
                    }
                } else if (action.type === 'REQUEST_GET_ELEVENIA_DROP_OFF_ADDRESS') {
                    try {
                        const eleveniaAddress = await Services().get(
                            '/api/orders/popbox',
                            action.payload.params,
                        )
                        return {
                            type: 'GET_ELEVENIA_DROP_OFF_ADDRESS_SUCCESS',
                            payload: {
                                data: eleveniaAddress.data,
                                params: action.payload.params,
                            },
                        }
                    } catch (error) {
                        const newError = {
                            type: 'GET_ELEVENIA_DROP_OFF_ADDRESS_FAILED',
                            payload: {
                                error,
                            },
                        }
                        throw newError
                    }
                } else if (action.type === 'REQUEST_GET_GOJEK_PICKUP_ADDRESS') {
                    try {
                        const gojekAddress = await Services().get(
                            '/api/geocode/gojek',
                            action.payload.params,
                        )
                        return {
                            type: 'GET_GOJEK_PICKUP_ADDRESS_SUCCESS',
                            payload: {
                                data: gojekAddress.data,
                                params: action.payload.params,
                            },
                        }
                    } catch (error) {
                        const newError = {
                            type: 'GET_GOJEK_PICKUP_ADDRESS_FAILED',
                            payload: {
                                error: {
                                    ...error,
                                    message: 'Maaf permintaan Anda gagal dilakukan',
                                },
                            },
                        }
                        throw newError
                    }
                } else {
                    const prefixUrl = '/api/orders/'
                    let url = ''
                    const body = action.payload.data
                    switch (action.type) {
                        case 'REQUEST_SUBMIT_RESI_JNE_REGULAR':
                            url = prefixUrl + 'send/jne'
                            break
                        case 'REQUEST_SUBMIT_RESI_JNE_PICKUP':
                            url = prefixUrl + 'send/jnePickup'
                            break
                        case 'REQUEST_SUBMIT_RESI_JOB':
                            url = prefixUrl + 'send/job'
                            break
                        case 'REQUEST_SUBMIT_RESI_GOJEK':
                            url = prefixUrl + 'send/gojek'
                            break
                        case 'REQUEST_SUBMIT_RESI_ELEVENIA_EXPRESS':
                            url = prefixUrl + 'send/eleveniaExpress'
                            break
                        default:
                            break
                    }
                    try {
                        const submit = await Services().put(url, body)
                        const message =
                            submit.data && submit.data.message
                                ? submit.data.message
                                : 'Nomor resi berhasil dimasukan'
                        return async dispatch => {
                            if (submit.data.status === 'BAD_REQUEST') {
                                await dispatch({ type: 'SUBMIT_RESI_FAILED' })
                                await dispatch({
                                    type: 'ALERT_ERROR',
                                    payload: { message: 'Maaf permintaan Anda gagal dilakukan' },
                                })
                                if (action.type === 'REQUEST_SUBMIT_RESI_GOJEK') {
                                    await dispatch({
                                        type: 'SUBMIT_RESI_GOJEK_FAILED',
                                        payload: {
                                            content: submit.data.payload
                                                ? submit.data.payload.content
                                                : [],
                                            data: body,
                                        },
                                    })
                                }
                            } else {
                                await dispatch({ type: 'SUBMIT_RESI_SUCCESS' })
                                await dispatch({ type: 'ALERT_SUCCESS', payload: { message } })

                                if (
                                    action.payload.orderStatus &&
                                    action.payload.orderStatus === 'SENT'
                                ) {
                                    /**
                                     * Update Resi tabs sent / dalam pengiriman
                                     */
                                    const paramsSent = { ...store.value.order.sent.params, page: 0 }
                                    await dispatch(setOrderSent({ data: [] }))
                                    await dispatch(getOrderSent(paramsSent))
                                    await dispatch(getOrderCount(paramsSent))
                                } else {
                                    /**
                                     * Update Resi tabs on process / perlu dikirim
                                     */
                                    const paramsProcess = {
                                        ...store.value.order.process.params,
                                        page: 0,
                                    }
                                    await dispatch(setOrderOnProcess({ data: [] }))
                                    await dispatch(getOrderOnProcess(paramsProcess))
                                    await dispatch(getOrderCount(paramsProcess))
                                }
                            }
                            setTimeout(() => dispatch({ type: 'ALERT_CLEARS' }), 3000)
                        }
                    } catch (error) {
                        const newError = {
                            type: 'SUBMIT_RESI_FAILED',
                            payload: {
                                error,
                            },
                        }
                        throw newError
                    }
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
