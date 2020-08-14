import { setToken, getToken, isLoggedIn } from 'helper'

const initialState = {
    token: isLoggedIn() ? getToken() : '',
    loading: false,
}

export const authentication = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_AUTH':
            return {
                ...state,
                loading: true,
            }
        case 'AUTH_SUCCESS':
            setToken(action.payload.token)
            return {
                ...state,
                token: action.payload.token,
                loading: false,
            }
        case 'AUTH_FAILED':
            setToken(action.payload.token)
            return {
                ...state,
                loading: false,
            }
        case 'REQUEST_LOGOUT':
            return {
                ...state,
                loading: true,
            }
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                loading: false,
            }
        case 'LOGOUT_FAILED':
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}
