import {mergeMap} from "rxjs/operators";
import {ofType} from "redux-observable";
import {Services} from "service";

const UpdateBehaviorStock = ({store,activePage,istypes,selStatCode}) => {
    return dispatch => {
        const {product} = store.value;
        const ObjectsFilter = product[activePage].filter.salesMethodCode === ""
            ?
            {
                categoryId: product[activePage].filter.categoryId,
                stock: product[activePage].filter.stock,
                premiumAds: product[activePage].filter.premiumAds
            }
            :
            {
                ...product[activePage].filter
            }
        const dataPayload = {
            selStatCode: selStatCode,
            page: 0,
            size: 5,
            sort: product[activePage].sort,
            query: product[activePage].query,
            ...ObjectsFilter
        }
        dispatch({type: istypes,payload: dataPayload});
        dispatch({type: "RESET_SORTS_DATA",payload: {active: activePage}})
    }
}


export const RequestProductStockUpdate = (action$,store) =>
    action$.pipe(
        ofType("REQUEST_STOCK_PRODUCT_UPDATE"),
        mergeMap(async action => {
            try {
                switch(action.type) {
                    case "REQUEST_STOCK_PRODUCT_UPDATE":
                        await Services().put("/api/product-stocks",action.payload.data);
                        const homeProduct = store.value.home.product.data.map(list => {
                            if(list.productId === action.payload.data.productId) {
                                return {...list,stockQuantity: action.payload.data.stockQuantity}
                            } else {
                                return list;
                            }
                        })
                        return dispatch => {
                            const {activePage,data} = action.payload;
                            dispatch({type: "SUCCESS_UPDATE_STOCK"});
                            dispatch({
                                type: 'GET_HOME_PRODUCT_LIST_SUCCESS',
                                payload: {
                                    data: homeProduct,
                                },
                            })
                            activePage === "displayed" && dispatch(UpdateBehaviorStock({store,activePage,istypes: "REQUEST_PRODUCT_DISPLAY",selStatCode: 103}));
                            activePage === "soldout" && dispatch(UpdateBehaviorStock({store,activePage,istypes: "REQUEST_PRODUCT_SOLDOUT",selStatCode: 104}));
                            activePage === "hidden" && dispatch(UpdateBehaviorStock({store,activePage,istypes: "REQUEST_PRODUCT_HIDDEN",selStatCode: 105}));
                            data.stockQuantity === 0 && dispatch(UpdateBehaviorStock({store,activePage,istypes: "REQUEST_PRODUCT_SOLDOUT",selStatCode: 104}));
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
