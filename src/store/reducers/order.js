import { unique } from 'helper'

const initialState = {
    unpaid: {
        params: null,
        data: [],
        isLoaded: false,
        loadMore: true,
    },
    new: {
        params: null,
        data: [],
        isLoaded: false,
        loadMore: true,
    },
    process: {
        params: null,
        data: [],
        isLoaded: false,
        loadMore: true,
    },
    sent: {
        params: null,
        data: [],
        isLoaded: false,
        loadMore: true,
    },
    delivered: {
        params: null,
        data: [],
        isLoaded: false,
        loadMore: true,
    },
    purchased: {
        params: null,
        data: [],
        isLoaded: false,
        loadMore: true,
    },
    counter: [],
    detail: {
        data: null,
        isLoaded: false,
    },
    courier: {
        data: [],
        isLoaded: false,
    },
    searchKeyword: '',
    acceptOrder: {
        isSuccess: null,
        isLoading: false,
    },
    downloadShippingLabel: {
        data: null,
        params: null,
        isLoading: false,
    },
}
export const order = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_GET_ORDER_UNPAID':
            return {
                ...state,
                unpaid: {
                    ...state.unpaid,
                    isLoaded: false,
                    loadMore: true,
                },
            }
        case 'REQUEST_GET_ORDER_NEW':
            return {
                ...state,
                new: {
                    ...state.new,
                    isLoaded: false,
                    loadMore: true,
                },
            }
        case 'REQUEST_GET_ORDER_ON_PROCESS':
            return {
                ...state,
                process: {
                    ...state.process,
                    isLoaded: false,
                    loadMore: true,
                },
            }
        case 'REQUEST_GET_ORDER_SENT':
            return {
                ...state,
                sent: {
                    ...state.sent,
                    isLoaded: false,
                    loadMore: true,
                },
            }
        case 'REQUEST_GET_ORDER_DELIVERED':
            return {
                ...state,
                delivered: {
                    ...state.delivered,
                    isLoaded: false,
                    loadMore: true,
                },
            }
        case 'REQUEST_GET_ORDER_PURCHASED':
            return {
                ...state,
                purchased: {
                    ...state.purchased,
                    isLoaded: false,
                    loadMore: true,
                },
            }
        // Success
        case 'GET_ORDER_UNPAID_SUCCESS':
            return {
                ...state,
                unpaid: {
                    ...state.unpaid,
                    params: action.payload.params,
                    data: unique([...state.unpaid.data, ...action.payload.data], 'orderId', {
                        checkLast: 15,
                    }),
                    isLoaded: true,
                    loadMore:
                        action.payload.data.length < action.payload.params.size ? false : true,
                },
            }
        case 'GET_ORDER_NEW_SUCCESS':
            return {
                ...state,
                new: {
                    ...state.new,
                    params: action.payload.params,
                    data: unique([...state.new.data, ...action.payload.data], 'orderId', {
                        checkLast: 15,
                    }),
                    isLoaded: true,
                    loadMore:
                        action.payload.data.length < action.payload.params.size ? false : true,
                },
            }
        case 'GET_ORDER_ON_PROCESS_SUCCESS':
            return {
                ...state,
                process: {
                    ...state.process,
                    params: action.payload.params,
                    data: unique([...state.process.data, ...action.payload.data], 'orderId', {
                        checkLast: 15,
                    }),
                    isLoaded: true,
                    loadMore:
                        action.payload.data.length < action.payload.params.size ? false : true,
                },
            }
        case 'GET_ORDER_SENT_SUCCESS':
            return {
                ...state,
                sent: {
                    ...state.sent,
                    params: action.payload.params,
                    data: unique([...state.sent.data, ...action.payload.data], 'orderId', {
                        checkLast: 15,
                    }),
                    isLoaded: true,
                    loadMore:
                        action.payload.data.length < action.payload.params.size ? false : true,
                },
            }
        case 'GET_ORDER_DELIVERED_SUCCESS':
            return {
                ...state,
                delivered: {
                    ...state.delivered,
                    params: action.payload.params,
                    data: unique([...state.delivered.data, ...action.payload.data], 'orderId', {
                        checkLast: 15,
                    }),
                    isLoaded: true,
                    loadMore:
                        action.payload.data.length < action.payload.params.size ? false : true,
                },
            }
        case 'GET_ORDER_PURCHASED_SUCCESS':
            return {
                ...state,
                purchased: {
                    ...state.purchased,
                    params: action.payload.params,
                    data: unique([...state.purchased.data, ...action.payload.data], 'orderId', {
                        checkLast: 15,
                    }),
                    isLoaded: true,
                    loadMore:
                        action.payload.data.length < action.payload.params.size ? false : true,
                },
            }
        // failed
        case 'GET_ORDER_UNPAID_FAILED':
            return {
                ...state,
                unpaid: {
                    ...state.unpaid,
                    params: action.payload.params,
                    isLoaded: true,
                    loadMore: false,
                },
            }
        case 'GET_ORDER_NEW_FAILED':
            return {
                ...state,
                new: {
                    ...state.new,
                    params: action.payload.params,
                    isLoaded: true,
                    loadMore: false,
                },
            }
        case 'GET_ORDER_ON_PROCESS_FAILED':
            return {
                ...state,
                process: {
                    ...state.process,
                    params: action.payload.params,
                    isLoaded: true,
                    loadMore: false,
                },
            }
        case 'GET_ORDER_SENT_FAILED':
            return {
                ...state,
                sent: {
                    ...state.sent,
                    params: action.payload.params,
                    isLoaded: true,
                    loadMore: false,
                },
            }
        case 'GET_ORDER_DELIVERED_FAILED':
            return {
                ...state,
                delivered: {
                    ...state.delivered,
                    params: action.payload.params,
                    isLoaded: true,
                    loadMore: false,
                },
            }
        case 'GET_ORDER_PURCHASED_FAILED':
            return {
                ...state,
                purchased: {
                    ...state.purchased,
                    params: action.payload.params,
                    isLoaded: true,
                    loadMore: false,
                },
            }
        //request order detail
        case 'REQUEST_GET_ORDER_DETAIL':
            return {
                ...state,
                detail: {
                    data: null,
                    isLoaded: false,
                },
            }
        case 'GET_ORDER_DETAIL_SUCCESS':
            return {
                ...state,
                detail: {
                    data: action.payload.data,
                    isLoaded: true,
                },
            }
        case 'GET_ORDER_DETAIL_FAILED':
            return {
                ...state,
                detail: {
                    data: null,
                    isLoaded: true,
                },
            }
        //request count order
        case 'GET_ORDER_COUNT_SUCCESS':
            return {
                ...state,
                counter: unique([...state.counter, ...action.payload.data], 'orderStatus', {
                    takeLast: true,
                }),
            }
        case 'GET_ORDER_COUNT_FAILED':
            return {
                ...state,
                counter: state.counter,
            }
        case 'GET_COURIER_SUCCESS':
            return {
                ...state,
                courier: {
                    data: action.payload.data,
                    isLoaded: true,
                },
            }
        case 'GET_COURIER_FAILED':
            return {
                ...state,
                courier: {
                    ...state.courier,
                    isLoaded: true,
                },
            }
        // REQUEST SET / OVERRIDE ORDER
        case 'REQUEST_SET_ORDER_UNPAID':
            return {
                ...state,
                unpaid: {
                    ...state.unpaid,
                    ...action.payload,
                },
            }
        case 'REQUEST_SET_ORDER_NEW':
            return {
                ...state,
                new: {
                    ...state.new,
                    ...action.payload,
                },
            }
        case 'REQUEST_SET_ORDER_ON_PROCESS':
            return {
                ...state,
                process: {
                    ...state.process,
                    ...action.payload,
                },
            }
        case 'REQUEST_SET_ORDER_SENT':
            return {
                ...state,
                sent: {
                    ...state.sent,
                    ...action.payload,
                },
            }
        case 'REQUEST_SET_ORDER_DELIVERED':
            return {
                ...state,
                delivered: {
                    ...state.delivered,
                    ...action.payload,
                },
            }
        case 'REQUEST_SET_ORDER_PURCHASED':
            return {
                ...state,
                purchased: {
                    ...state.purchased,
                    ...action.payload,
                },
            }
        case 'REQUEST_SET_ORDER_SEARCH':
            return {
                ...state,
                searchKeyword: action.payload.data,
            }
        // Request Accept Order
        case 'REQUEST_ACCEPT_ORDER':
            return {
                ...state,
                acceptOrder: {
                    isLoading: true,
                    isSuccess: null,
                },
            }
        case 'ACCEPT_ORDER_SUCCESS':
            return {
                ...state,
                acceptOrder: {
                    isLoading: false,
                    isSuccess: true,
                },
            }
        case 'ACCEPT_ORDER_FAILED':
            return {
                ...state,
                acceptOrder: {
                    isLoading: false,
                    isSuccess: false,
                },
            }
        /**
         * Download Shipping Label in Detail
         */
        case 'REQUEST_DOWNLOAD_SHIPPING_LABEL':
            return {
                ...state,
                downloadShippingLabel: {
                    ...state.downloadShippingLabel,
                    isLoading: true,
                },
            }

        case 'DOWNLOAD_SHIPPING_LABEL_SUCCESS':
            return {
                ...state,
                downloadShippingLabel: {
                    data: action.payload.data,
                    params: action.payload.params,
                    isLoading: false,
                },
            }
        case 'DOWNLOAD_SHIPPING_LABEL_FAILED':
            return {
                ...state,
                downloadShippingLabel: {
                    data: null,
                    params: null,
                    isLoading: false,
                },
            }
        default:
            return state
    }
}
