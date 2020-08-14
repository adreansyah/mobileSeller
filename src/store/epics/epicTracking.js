import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestTracking = (action$, store) =>
    action$.pipe(
        ofType('REQUEST_GET_TRACKING'),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_GET_TRACKING':
                        try {
                            const responseJNE = await Services().get(
                                '/api/tracking/' + action.payload.courier,
                                action.payload.params,
                            )
                            return {
                                type: 'GET_TRACKING_SUCCESS',
                                payload: {
                                    data: responseJNE.data,
                                    params: action.payload.params,
                                },
                            }
                        } catch (error) {
                            const newError = {
                                type: 'GET_TRACKING_FAILED',
                                payload: {
                                    params: action.payload.params,
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
