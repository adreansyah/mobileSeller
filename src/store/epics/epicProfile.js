import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestProfile = action$ =>
    action$.pipe(
        ofType('REQUEST_GET_PROFILE'),
        // delay(3000),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_GET_PROFILE':
                        try {
                            const response = await Services().get('/api/profile')
                            return {
                                type: 'GET_PROFILE_SUCCESS',
                                payload: response.data,
                            }
                        } catch (error) {
                            const newError = { type: 'GET_PROFILE_FAILED', error }
                            throw newError
                        }
                    default:
                        return
                }
            } catch ({ type, error}) {
                const { message } = error
                return dispatch => {
                    dispatch({ type })
                    dispatch({ type: 'ALERT_ERROR', payload: { message: message } })
                    setTimeout(() => dispatch({ type: 'ALERT_CLEARS' }), 3000)
                }
            }
        }),
    )
