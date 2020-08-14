import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'
import { logout } from 'helper'

export const RequestAuthentication = action$ =>
    action$.pipe(
        ofType('REQUEST_AUTH', 'REQUEST_LOGOUT'),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_AUTH':
                        try {
                            const rawResponseToken = await Services().post(
                                '/api/authenticate',
                                action.payload,
                            )
                            return dispatch => {
                                dispatch({
                                    type: 'AUTH_SUCCESS',
                                    payload: {
                                        token: rawResponseToken.data.id_token,
                                    },
                                })
                            }
                        } catch (error) {
                            const newError = {
                                type: 'AUTH_FAILED',
                                payload: {
                                    error,
                                },
                            }
                            throw newError
                        }

                    case 'REQUEST_LOGOUT':
                        try {
                            await Services().post('/api/logout')
                            logout()
                            return {
                                type: 'LOGOUT_SUCCESS',
                            }
                        } catch (error) {
                            const newError = {
                                type: 'LOGOUT_FAILED',
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
