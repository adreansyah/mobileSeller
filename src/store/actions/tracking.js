/**
 * Get Tracking
 * @param {*} params
 */
export const getTracking = (courier, params) => dispatch => {
    dispatch({
        type: 'REQUEST_GET_TRACKING',
        payload: { courier, params },
    })
}
export const clearTracking = () => dispatch => {
    dispatch({
        type: 'REQUEST_CLEAR_TRACKING',
    })
}
