export const setActiveTab = params => dispatch => {
  dispatch({
    type: "SET_ACTIVE_TAB_QNA",
    payload: { params },
  })
}
export const clearQnaData = params => dispatch => {
  dispatch({
    type: "CLEAR_QNA_DATA",
    payload: { params },
  })
}
export const getQnaCounter = () => dispatch => {
  dispatch({
    type: "REQUEST_GET_QNA_COUNTER",
  })
}
export const getQnaList = (qnaType, params) => dispatch => {
  dispatch({
    type: "REQUEST_GET_QNA_LIST",
    payload: { params },
    qnaType
  })
}
export const getQnaDetail = params => dispatch => {
  dispatch({
    type: "REQUEST_GET_QNA_DETAIL",
    payload: { params },
  })
}