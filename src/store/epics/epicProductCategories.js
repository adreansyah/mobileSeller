import {mergeMap} from "rxjs/operators";
import {ofType} from "redux-observable";
import {Services} from "service";

const UpdateDisplay = ({store}) => {
    return dispatch => {
        const {product} = store.value;
        const ObjectsFilter = product.displayed.filter.salesMethodCode === ""
            ?
            {
                categoryId: product.displayed.filter.categoryId,
                stock: product.displayed.filter.stock,
                premiumAds: product.displayed.filter.premiumAds
            }
            :
            {
                ...product.displayed.filter
            }
        const dataPayload = {
            selStatCode: 103,
            page: 0,
            size: 5,
            sort: product.displayed.sort,
            query: product.displayed.query,
            ...ObjectsFilter
        }
        dispatch({type: "REQUEST_PRODUCT_DISPLAY",payload: dataPayload});
        dispatch({type: "RESET_SORTS_DATA",payload: {active: "displayed"}})
    }
}

const UpdateHidden = ({store}) => {
    return dispatch => {
        const {product} = store.value;
        const ObjectsFilter = product.hidden.filter.salesMethodCode === ""
            ?
            {
                categoryId: product.hidden.filter.categoryId,
                stock: product.hidden.filter.stock,
                premiumAds: product.hidden.filter.premiumAds
            }
            :
            {
                ...product.hidden.filter
            }
        const dataPayload = {
            selStatCode: 105,
            page: 0,
            size: 5,
            sort: product.hidden.sort,
            query: product.hidden.query,
            ...ObjectsFilter
        }
        dispatch({type: "REQUEST_PRODUCT_HIDDEN",payload: dataPayload});
        dispatch({type: "RESET_SORTS_DATA",payload: {active: "hidden"}})
    }
}

export const RequestProductCategories = (action$,store) =>
    action$.pipe(
        ofType(
            "REQUEST_PRODUCT_FILTER",
            "REQUEST_HIDDEN_PRODUCT",
            "REQUEST_SHOWED_PRODUCT",
            "REQUEST_UPDATE_STOCK_PRODUCT"
        ),
        mergeMap(async action => {
            try {
                switch(action.type) {
                    case "REQUEST_PRODUCT_FILTER":
                        const getValue = await Services().get("/api/categories");
                        return dispatch => {
                            dispatch({
                                type: "GET_PRODUCT_FILTER",
                                payload: {
                                    data: getValue.data,
                                    active: action.payload
                                }
                            });
                        };
                    case "REQUEST_HIDDEN_PRODUCT":
                        await Services().put("/api/products/hide",action.payload);
                        return dispatch => {
                            dispatch({type: 'ALERT_SUCCESS',payload: {message: "Data has been hidden"}});
                            dispatch(UpdateDisplay({store}));
                            dispatch(UpdateHidden({store}));
                            setTimeout(() => dispatch({type: 'ALERT_CLEARS'}),3000)
                        };
                    case "REQUEST_SHOWED_PRODUCT":
                        await Services().put("/api/products/hide",action.payload);
                        return dispatch => {
                            dispatch({type: 'ALERT_SUCCESS',payload: {message: "Data has been showed"}});
                            dispatch(UpdateHidden({store}));
                            dispatch(UpdateDisplay({store}));
                            setTimeout(() => dispatch({type: 'ALERT_CLEARS'}),3000)
                        };
                    default:
                        return null
                }
            } catch(e) {
                return dispatch => {
                    dispatch({type: 'ALERT_ERROR',payload: {message: e.message}})
                    setTimeout(() => dispatch({type: 'ALERT_CLEARS'}),3000)
                }
            }
        })
    );
