const initialState = {
    data: null,
    isLoaded: false,
    params: null,
}
export const tracking = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_TRACKING_SUCCESS':
            return {
                ...state,
                data: action.payload.data,
                params: action.payload.params,
                isLoaded: true,
            }
        case 'GET_TRACKING_FAILED':
            return {
                ...state,
                params: action.payload.params,
                isLoaded: true,
            }
        case 'REQUEST_CLEAR_TRACKING':
            return {
                ...state,
                isLoaded: false,
                data: null,
                params: null,
            }
        default:
            return state
    }
}
