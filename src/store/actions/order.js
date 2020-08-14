/**
 * GET ORDER LISTS
 * @param {*} params
 */ export const getOrderUnpaid = params => dispatch => {
    dispatch({
        type: 'REQUEST_GET_ORDER_UNPAID',
        payload: { params },
    })
}
export const getOrderNew = params => dispatch => {
    dispatch({
        type: 'REQUEST_GET_ORDER_NEW',
        payload: { params },
    })
}
export const getOrderOnProcess = params => dispatch => {
    dispatch({
        type: 'REQUEST_GET_ORDER_ON_PROCESS',
        payload: { params },
    })
}
export const getOrderSent = params => dispatch => {
    dispatch({
        type: 'REQUEST_GET_ORDER_SENT',
        payload: { params },
    })
}
export const getOrderDelivered = params => dispatch => {
    dispatch({
        type: 'REQUEST_GET_ORDER_DELIVERED',
        payload: { params },
    })
}
export const getOrderPurchased = params => dispatch => {
    dispatch({
        type: 'REQUEST_GET_ORDER_PURCHASED',
        payload: { params },
    })
}

/**
 * GET ORDER DETAIL, COUNT, AND COURIER
 * @param {*} params
 */
export const getOrderDetail = id => dispatch => {
    dispatch({
        type: 'REQUEST_GET_ORDER_DETAIL',
        payload: { id },
    })
}
export const getOrderCount = params => dispatch => {
    dispatch({
        type: 'REQUEST_GET_ORDER_COUNT',
        payload: { params },
    })
}
export const getCourier = () => dispatch => {
    dispatch({
        type: 'REQUEST_GET_COURIER',
    })
}

/**
 * Set Order or Override Data
 * @param {*} data
 */
export const setOrderUnpaid = payload => dispatch => {
    dispatch({
        type: 'REQUEST_SET_ORDER_UNPAID',
        payload,
    })
}
export const setOrderNew = payload => dispatch => {
    dispatch({
        type: 'REQUEST_SET_ORDER_NEW',
        payload,
    })
}
export const setOrderOnProcess = payload => dispatch => {
    dispatch({
        type: 'REQUEST_SET_ORDER_ON_PROCESS',
        payload,
    })
}
export const setOrderSent = payload => dispatch => {
    dispatch({
        type: 'REQUEST_SET_ORDER_SENT',
        payload,
    })
}
export const setOrderDelivered = payload => dispatch => {
    dispatch({
        type: 'REQUEST_SET_ORDER_DELIVERED',
        payload,
    })
}
export const setOrderPurchased = payload => dispatch => {
    dispatch({
        type: 'REQUEST_SET_ORDER_PURCHASED',
        payload,
    })
}
/**
 *  Order Search action
 * @param {*} data 
 */
export const requestSearch = data => dispatch => {
    dispatch({
        type: 'REQUEST_SET_ORDER_SEARCH',
        payload: { data },
    })
}
/**
 * Accept Order action
 * @param {*} data 
 */
export const requestAcceptOrder = data => dispatch => {
    dispatch({
        type: 'REQUEST_ACCEPT_ORDER',
        payload: { data },
    })
}
/**
 * Download Shipping Label in Detail
 * @param {*} params 
 */
export const requestDownloadShippingLabel = params => dispatch => {
    dispatch({
        type: 'REQUEST_DOWNLOAD_SHIPPING_LABEL',
        payload: { params },
    })
}
