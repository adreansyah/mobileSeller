const initialState = {
    /*
        set initial state
    */
    sellerRevenue: {
        last_update: '',
        data: [],
        isLoaded: false,
        period: '',
    },
    orderStatus: {
        last_update: '',
        data: [],
        isLoaded: false,
        period: '',
    },
    generalPerformance: {
        last_update: '',
        data: [],
        isLoaded: false,
        period: '',
    },
    productPerformance: {
        last_update: '',
        data: [],
        isLoaded: false,
    },
    productSoldView: {
        product_id: null,
        total_view: 0,
        total_sold: 0,
        isLoaded: false,
    },
}
export const statistic = (state = initialState, action) => {
    switch (action.type) {
        /**
         * GET STATICTIC SUCCESS
         */
        case 'GET_STATISTIC_SELLER_REVENUE_SUCCESS':
            return {
                ...state,
                sellerRevenue: {
                    ...state.sellerRevenue,
                    ...action.payload,
                    data:
                        action.payload.data && action.payload.data.length
                            ? action.payload.data
                            : [],
                    last_update: action.payload.last_update ? action.payload.last_update : '',
                    isLoaded: true,
                },
            }
        case 'GET_STATISTIC_ORDER_STATUS_SUCCESS':
            return {
                ...state,
                orderStatus: {
                    ...state.orderStatus,
                    ...action.payload,
                    data:
                        action.payload.data && action.payload.data.length
                            ? action.payload.data
                            : [],
                    last_update: action.payload.last_update ? action.payload.last_update : '',
                    isLoaded: true,
                },
            }
        case 'GET_STATISTIC_GENERAL_PERFORMANCE_SUCCESS':
            return {
                ...state,
                generalPerformance: {
                    ...state.generalPerformance,
                    ...action.payload,
                    data:
                        action.payload.data && action.payload.data.length
                            ? action.payload.data
                            : [],
                    last_update: action.payload.last_update ? action.payload.last_update : '',
                    isLoaded: true,
                },
            }
        case 'GET_STATISTIC_PRODUCT_PERFORMANCE_SUCCESS':
            return {
                ...state,
                productPerformance: {
                    ...state.productPerformance,
                    ...action.payload,
                    data:
                        action.payload.data && action.payload.data.length
                            ? action.payload.data
                            : [],
                    last_update: action.payload.last_update ? action.payload.last_update : '',
                    isLoaded: true,
                },
            }
        case 'GET_STATISTIC_PRODUCT_SOLD_VIEW_SUCCESS':
            return {
                ...state,
                productSoldView: {
                    ...state.productSoldView,
                    ...action.payload,
                    isLoaded: true,
                },
            }
        /**
         * GET STATISCTIC FAILED
         */
        case 'GET_STATISTIC_SELLER_REVENUE_FAILED':
            return {
                ...state,
                sellerRevenue: {
                    ...state.sellerRevenue,
                    isLoaded: true,
                    period: action.period,
                },
            }
        case 'GET_STATISTIC_ORDER_STATUS_FAILED':
            return {
                ...state,
                orderStatus: {
                    ...state.orderStatus,
                    isLoaded: true,
                    period: action.period,
                },
            }
        case 'GET_STATISTIC_GENERAL_PERFORMANCE_FAILED':
            return {
                ...state,
                generalPerformance: {
                    ...state.generalPerformance,
                    isLoaded: true,
                    period: action.period,
                },
            }
        case 'GET_STATISTIC_PRODUCT_PERFORMANCE_FAILED':
            return {
                ...state,
                productPerformance: {
                    ...state.productPerformance,
                    isLoaded: true,
                },
            }
        case 'GET_STATISTIC_PRODUCT_SOLD_VIEW_FAILED':
            return {
                ...state,
                productSoldView: {
                    ...state.productSoldView,
                    isLoaded: true,
                },
            }
        default:
            return state
    }
}
