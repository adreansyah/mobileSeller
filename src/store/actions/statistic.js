export const getStatisticSellerRevenue = params => dispatch => {
    dispatch({
        type: 'REQUEST_STATISTIC_SELLER_REVENUE',
        payload: { params },
    })
}
export const getStatisticOrderStatus = params => dispatch => {
    dispatch({
        type: 'REQUEST_STATISTIC_ORDER_STATUS',
        payload: { params },
    })
}
export const getStatisticGeneralPerformance = params => dispatch => {
    dispatch({
        type: 'REQUEST_STATISTIC_GENERAL_PERFORMANCE',
        payload: { params },
    })
}
export const getStatisticProductPerformance = params => dispatch => {
    dispatch({
        type: 'REQUEST_STATISTIC_PRODUCT_PERFORMANCE',
        payload: { params },
    })
}
export const getStatisticProductSoldView = params => dispatch => {
    dispatch({
        type: 'REQUEST_STATISTIC_PRODUCT_SOLD_VIEW',
        payload: { params },
    })
}
