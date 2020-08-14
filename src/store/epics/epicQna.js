import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { Services } from 'service'

export const RequestQna = (action$, store) => action$.pipe(
    ofType(
        'REQUEST_GET_QNA_COUNTER',
        'REQUEST_GET_QNA_LIST',
        'REQUEST_GET_QNA_DETAIL',
    ),
    mergeMap(async (action) => {
        try {
            switch (action.type) {
                case 'REQUEST_GET_QNA_COUNTER':
                    try {
                        const qnaCounter = await Services().get('/api/qna/count')
                        return {
                            type: 'REQUEST_GET_QNA_COUNTER_SUCCESS',
                            payload: qnaCounter.data,
                        }
                    } catch (error) {
                        const newError = { type: 'REQUEST_GET_QNA_COUNTER_FAILED', error }
                        throw newError
                    }
                case 'REQUEST_GET_QNA_LIST':
                    try {
                        const qnaList = await Services().get(
                            '/api/qna-list',
                            action.payload.params,
                        )
                        return {
                            type: 'REQUEST_GET_QNA_LIST_SUCCESS',
                            payload: qnaList.data,
                            qnaType: action.qnaType
                        }
                    } catch (error) {
                        const newError = { type: 'REQUEST_GET_QNA_LIST_FAILED', error, qnaType: action.qnaType }
                        throw newError
                    }
                case 'REQUEST_GET_QNA_DETAIL':
                    try {
                        const qnaDetail = await Services().get(`/api/qna/${action.payload.params}`)
                        return {
                            type: 'REQUEST_GET_QNA_DETAIL_SUCCESS',
                            payload: qnaDetail.data,
                        }
                    } catch (error) {
                        const newError = { type: 'REQUEST_GET_QNA_DETAIL_FAILED', error }
                        throw newError
                    }
                default:
                    break
            }
        } catch ({ type, error, qnaType }) {
            const { message } = error
            return dispatch => {
                dispatch({ type, qnaType })
                dispatch({ type: 'ALERT_ERROR', payload: { message: message } })
                setTimeout(() => dispatch({ type: 'ALERT_CLEARS' }), 3000)
            }
        }
    })
)