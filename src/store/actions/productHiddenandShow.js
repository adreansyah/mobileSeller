const RequestHiddenProduct = (arr = [],description) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_HIDDEN_PRODUCT",
            payload: {
                "productIds": arr,
                "show": false,
                "reason": description
            }
        })
    }
}

const RequestShowProduct = (arr = [],description) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_SHOWED_PRODUCT",
            payload: {
                "productIds": arr,
                "show": true,
                "reason": description
            }
        })
    }
}

const ActionCreatorShowandHide = {
    RequestHiddenProduct,
    RequestShowProduct
}

export default ActionCreatorShowandHide