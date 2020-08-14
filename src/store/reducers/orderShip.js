const initialState = {
    jnePickupDate: {
        data: [],
        params: null,
    },
    eleveniaPickupDate: {
        data: [],
        params: null,
    },
    eleveniaDropOff: {
        data: null,
        params: null,
        isLoading: false,
        isError: false,
    },
    gojekPickup: {
        data: null,
        params: null,
        isLoading: false,
        isError: false,
    },
    submitResiGojek: {
        content: [],
        data: null,
        isRetry: false,
    },
    submitResi: {
        isLoading: false,
    },
}
export const orderShip = (state = initialState, action) => {
    switch (action.type) {
        /**
         * Submit Resi General
         */
        case 'REQUEST_SUBMIT_RESI':
            return {
                ...state,
                submitResi: {
                    isLoading: true,
                },
            }
        case 'SUBMIT_RESI_SUCCESS':
            return {
                ...state,
                submitResi: {
                    isLoading: false,
                },
            }
        case 'SUBMIT_RESI_FAILED':
            return {
                ...state,
                submitResi: {
                    isLoading: false,
                },
            }
        /**
         * Get Pickup Date JNE
         */
        case 'GET_JNE_PICKUP_DATE_SUCCESS':
            return {
                ...state,
                jnePickupDate: {
                    data: action.payload.data,
                    params: action.payload.params,
                },
            }
        case 'GET_JNE_PICKUP_DATE_FAILED':
            return {
                ...state,
                jnePickupDate: {
                    data: [],
                    params: null,
                },
            }
        /**
         * Get Pickup Date Elevenia
         */
        case 'GET_ELEVENIA_PICKUP_DATE_SUCCESS':
            return {
                ...state,
                eleveniaPickupDate: {
                    data: action.payload.data,
                    params: action.payload.params,
                },
            }
        case 'GET_ELEVENIA_PICKUP_DATE_FAILED':
            return {
                ...state,
                eleveniaPickupDate: {
                    data: [],
                    params: null,
                },
            }
        /**
         *  Get Elevenia drop off address
         */
        case 'REQUEST_GET_ELEVENIA_DROP_OFF_ADDRESS':
            return {
                ...state,
                eleveniaDropOff: {
                    data: null,
                    params: null,
                    isLoading: true,
                    isError: false,
                },
            }
        case 'GET_ELEVENIA_DROP_OFF_ADDRESS_SUCCESS':
            return {
                ...state,
                eleveniaDropOff: {
                    data: action.payload.data,
                    params: action.payload.params,
                    isLoading: false,
                    isError: false,
                },
            }
        case 'GET_ELEVENIA_DROP_OFF_ADDRESS_FAILED':
            return {
                ...state,
                eleveniaDropOff: {
                    data: null,
                    params: null,
                    isLoading: false,
                    isError: true,
                },
            }
        /**
         * Get Gojek pickup address
         */
        case 'REQUEST_GET_GOJEK_PICKUP_ADDRESS':
            return {
                ...state,
                gojekPickup: {
                    isLoading: true,
                    data: null,
                    params: null,
                    isError: false,
                },
            }
        case 'GET_GOJEK_PICKUP_ADDRESS_SUCCESS':
            return {
                ...state,
                gojekPickup: {
                    isLoading: false,
                    data: action.payload.data,
                    params: action.payload.params,
                    isError: false,
                },
            }
        case 'GET_GOJEK_PICKUP_ADDRESS_FAILED':
            return {
                ...state,
                gojekPickup: {
                    isLoading: false,
                    data: null,
                    params: null,
                    isError: true,
                },
            }
        case 'CLEAR_GOJEK_PICKUP_ADDRESS':
            return {
                ...state,
                gojekPickup: {
                    data: null,
                    params: null,
                    isLoading: false,
                    isError: false,
                },
            }

        /**
         * Additional Gojek Pickup submit resi
         */
        case 'REQUEST_SUBMIT_RESI_GOJEK':
            return {
                ...state,
                submitResiGojek: {
                    content: [],
                    data: null,
                    isRetry: false,
                },
            }
        case 'SUBMIT_RESI_GOJEK_FAILED':
            return {
                ...state,
                submitResiGojek: {
                    content: action.payload.content,
                    data: action.payload.data,
                    isRetry: true,
                },
            }
        case 'CLEAR_SUBMIT_RESI_GOJEK':
            return {
                ...state,
                submitResiGojek: {
                    content: [],
                    data: null,
                    isRetry: false,
                },
            }
        default:
            return state
    }
}
