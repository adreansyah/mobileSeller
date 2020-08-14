const RequestUpdateStockProduct = (stockQuantity,productId,activePage) => {
    console.log(activePage);
    return dispatch => {
        dispatch({
            type: "REQUEST_STOCK_PRODUCT_UPDATE",
            payload: {
                activePage,
                data: {
                    productId,
                    stockQuantity
                }
            }
        })
    }
}
const ActionCreatorUpdateProduct = {
    RequestUpdateStockProduct
}

export default ActionCreatorUpdateProduct;