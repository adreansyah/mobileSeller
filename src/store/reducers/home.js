const initialState = {
    order: {
        data: [],
        isLoaded: false,
    },
    qna: {
        data: [],
        isLoaded: false,
    },
    product: {
        data: [],
        isLoaded: false,
    },
    homeNoteShow: true,
    /*
        set initial state
    */
}
export const home = (state = initialState, action) => {
    switch (action.type) {
        //request order
        case 'REQUEST_GET_HOME_ORDER_LIST':
            return {
                ...state,
                order: {
                    ...state.order,
                    isLoaded: false,
                },
            }
        case 'GET_HOME_ORDER_LIST_SUCCESS':
            return {
                ...state,
                order: {
                    data: action.payload.data,
                    isLoaded: true,
                },
            }
        case 'GET_HOME_ORDER_LIST_FAILED':
            return {
                ...state,
                order: {
                    ...state.order,
                    isLoaded: true,
                },
            }
        //request qna
        case 'REQUEST_GET_HOME_QNA_LIST':
            return {
                ...state,
                qna: {
                    ...state.qna,
                    isLoaded: false,
                },
            }
        case 'GET_HOME_QNA_LIST_SUCCESS':
            return {
                ...state,
                qna: {
                    data: action.payload.data,
                    isLoaded: true,
                },
            }
        case 'GET_HOME_QNA_LIST_FAILED':
            return {
                ...state,
                qna: {
                    ...state.qna,
                    isLoaded: true,
                },
            }
        // Request Product
        case 'REQUEST_GET_HOME_PRODUCT_LIST':
            return {
                ...state,
                product: {
                    ...state.product,
                    isLoaded: false,
                },
            }
        case 'GET_HOME_PRODUCT_LIST_SUCCESS':
            return {
                ...state,
                product: {
                    data: action.payload.data,
                    isLoaded: true,
                },
            }
        case 'GET_HOME_PRODUCT_LIST_FAILED':
            return {
                ...state,
                product: {
                    ...state.product,
                    isLoaded: true,
                },
            }
        case 'REQUEST_HIDE_HOME_NOTE':
            return {
                ...state,
                homeNoteShow: false,
            }
        default:
            return state
    }
}
