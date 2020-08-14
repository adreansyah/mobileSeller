/**
 * 
 * @param {*} Sorts; 
 
 */
const RequestContentProductAfterSort = (value,active) => {
    return (dispatch,getState) => {
        const {product} = getState();
        console.log(value,product[active].sort);
        if(value !== product[active].sort) {
            dispatch({
                type: "REQUEST_LOAD_CONTENT_IS_SORTS",
                payload: {active,value}
            })
            dispatch({
                type: "RESET_SORTS_DATA",
                payload: {active}
            })
        }
        else {
            dispatch({
                type: "REQUEST_LOAD_CONTENT_IS_SORTS",
                payload: {active,value}
            })
        }
    }
}
/**
* 
* @param {*} Sort; 
 
*/

/**
 * 
 * @param {*} Search; 
 
 */
const RequestProductFilter = (params) => {
    return dispatch => {
        dispatch({type: "REQUEST_PRODUCT_FILTER",payload: params})
    }
}

const RequestResetAllFilterTabs = (active) => {
    return dispatch => {
        dispatch({type: "REQUEST_RESET_ALL_FILTER",payload: {active}})
    }
}
const RequestOnClose = (active) => {
    return dispatch => {
        dispatch({type: "REQUEST_RESET_ON_CLOSE",payload: {active}})
    }
}
const RequestCategoryProductFilter = (params,active) => {
    return dispatch => {
        dispatch({type: "REQUEST_CATEGORY_PRODUCT_FILTER",payload: {params,active}})
    }
}

const RequestStockProductFilter = (params,active) => {
    return dispatch => {
        dispatch({type: "REQUEST_STOCK_PRODUCT_FILTER",payload: {params,active}})
    }
}

const RequestAdsProductFilter = (params,active) => {
    return dispatch => {
        dispatch({type: "REQUEST_ADS_PRODUCT_FILTER",payload: {params,active}})
    }
}

const RequestCategoryContentProductFilter = (active) => {
    return dispatch => {
        dispatch({type: "REQUEST_CONTENT_PRODUCT_FILTER",payload: {active}});
        dispatch({
            type: "RESET_FILTER_DATA",
            payload: {
                types: active,
                page: 0
            }
        });
    }
}

const RequestPreOrderAndReadyStockFilter = (params,active) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_SET_PREODER_AND_READY_STOCK",
            payload: {params,active}
        });
    }
}

/**
 * 
 * @param {*} Filter; 
 
 */



/**
 * 
 * @param {*} Search; 
 
 */
const RequestProductSearch = (query = "",active) => {
    return (dispatch,getState) => {
        const {product} = getState();
        product[active].querytmp !== query &&
            dispatch({
                type: "SEARCH_KEYWORD",
                payload: {
                    active,
                    query
                }
            });
        product[active].querytmp !== query &&
            dispatch({
                type: "RESET_SEARCH_DATA",
                payload: {
                    types: active,
                    page: 0
                }
            });
    }
}
/**
 * 
 * @param {*} Search; 
 
 */
const ActionCreatorsSearchFilterSort = {
    RequestProductFilter,
    RequestCategoryContentProductFilter,
    RequestPreOrderAndReadyStockFilter,
    RequestCategoryProductFilter,
    RequestStockProductFilter,
    RequestAdsProductFilter,
    RequestResetAllFilterTabs,
    RequestOnClose,
    RequestProductSearch,
    RequestContentProductAfterSort
};
export default ActionCreatorsSearchFilterSort;