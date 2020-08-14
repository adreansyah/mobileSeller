export const getHomeOrderList = params => dispatch => {
  dispatch({
      type: 'REQUEST_GET_HOME_ORDER_LIST',
      payload: { params },
  })
}
export const getHomeQNAList = params => dispatch => {
    dispatch({
        type: 'REQUEST_GET_HOME_QNA_LIST',
        payload: { params },
    })
}
export const getHomeProductList = params => dispatch => {
  dispatch({
      type: 'REQUEST_GET_HOME_PRODUCT_LIST',
      payload: { params },
  })
}
export const hideHomeNote = () => dispatch => {
  dispatch({
      type: 'REQUEST_HIDE_HOME_NOTE',
  })
}
