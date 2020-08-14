/**
 * resi update / submit
 * @param {*} data
 */
export const submitResiJNERegular = (data, orderStatus) => dispatch => {
    dispatch({ type: 'REQUEST_SUBMIT_RESI' })
    dispatch({
        type: 'REQUEST_SUBMIT_RESI_JNE_REGULAR',
        payload: { data, orderStatus },
    })
}
export const submitResiJNEPickup = data => dispatch => {
    dispatch({ type: 'REQUEST_SUBMIT_RESI' })
    dispatch({
        type: 'REQUEST_SUBMIT_RESI_JNE_PICKUP',
        payload: { data },
    })
}
export const submitResiJOB = data => dispatch => {
    dispatch({ type: 'REQUEST_SUBMIT_RESI' })
    dispatch({
        type: 'REQUEST_SUBMIT_RESI_JOB',
        payload: { data },
    })
}
export const submitResiGojek = data => dispatch => {
    dispatch({ type: 'REQUEST_SUBMIT_RESI' })
    dispatch({
        type: 'REQUEST_SUBMIT_RESI_GOJEK',
        payload: { data },
    })
}
export const submitResiEleveniaExpress = data => dispatch => {
    dispatch({ type: 'REQUEST_SUBMIT_RESI' })
    dispatch({
        type: 'REQUEST_SUBMIT_RESI_ELEVENIA_EXPRESS',
        payload: { data },
    })
}
/**
 * Get Pickup Date JNE & Elevenia
 * @param {*} params 
 */
export const getJNEPickupDate = params => dispatch => {
    dispatch({
        type: 'REQUEST_GET_JNE_PICKUP_DATE',
        payload: { params },
    })
}
export const getEleveniaPickupDate = params => dispatch => {
    dispatch({
        type: 'REQUEST_GET_ELEVENIA_PICKUP_DATE',
        payload: { params },
    })
}
/**
 * Get Address Elevenia & Gojek
 * @param {*} params 
 */
export const getEleveniaDropOffAddress = params => dispatch => {
    dispatch({
        type: 'REQUEST_GET_ELEVENIA_DROP_OFF_ADDRESS',
        payload: { params },
    })
}
export const getGojekPickupAddress = params => dispatch => {
    dispatch({
        type: 'REQUEST_GET_GOJEK_PICKUP_ADDRESS',
        payload: { params },
    })
}
/**
 * Additioanl actions for Gojek pickup
 */
export const clearGojekPickupAddress = () => dispatch => {
    dispatch({
        type: 'CLEAR_GOJEK_PICKUP_ADDRESS',
    })
}
export const clearSubmitResiGojek = () => dispatch => {
    dispatch({
        type: 'CLEAR_SUBMIT_RESI_GOJEK',
    })
}
