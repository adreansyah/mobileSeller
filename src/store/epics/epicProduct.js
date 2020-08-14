import {mergeMap} from "rxjs/operators";
import {ofType} from "redux-observable";
import {Services} from "service";

export const RequestProduct = (action$,store) =>
  action$.pipe(
    ofType(
      "REQUEST_PRODUCT_DISPLAY",
      "REQUEST_PRODUCT_SOLDOUT",
      "REQUEST_PRODUCT_HIDDEN",
      "REQUEST_PRODUCT_PERIOD_OVER",
      "REQUEST_PRODUCT_EVALUATED",
    ),
    mergeMap(async action => {
      try {
        switch(action.type) {
          case "REQUEST_PRODUCT_DISPLAY":
            const getValueDisplay = await Services().get("/api/products-list",action.payload);
            return dispatch => {
              dispatch({
                type: "GET_PRODUCT_DISPLAY",
                payload: {
                  page: action.payload.page,
                  data: getValueDisplay.data.content,
                  size: action.payload.size
                }
              });
            };
          case "REQUEST_PRODUCT_SOLDOUT":
            const getValueSoldout = await Services().get("/api/products-list",action.payload);
            return dispatch => {
              dispatch({
                type: "GET_PRODUCT_SOLDOUT",
                payload: {
                  page: action.payload.page,
                  data: getValueSoldout.data.content,
                  size: action.payload.size
                }
              });
            };
          case "REQUEST_PRODUCT_HIDDEN":
            const getValueHidden = await Services().get("/api/products-list",action.payload);
            return dispatch => {
              dispatch({
                type: "GET_PRODUCT_HIDDEN",
                payload: {
                  page: action.payload.page,
                  data: getValueHidden.data.content,
                  size: action.payload.size
                }
              });
            };
          case "REQUEST_PRODUCT_PERIOD_OVER":
            const getValuePeriodover = await Services().get("/api/products-list",action.payload);
            return dispatch => {
              dispatch({
                type: "GET_PRODUCT_PERIOD_OVER",
                payload: {
                  page: action.payload.page,
                  data: getValuePeriodover.data.content,
                  size: action.payload.size
                }
              });
            };
          case "REQUEST_PRODUCT_EVALUATED":
            const getValueEvaluated = await Services().get("/api/products-list",action.payload);
            return dispatch => {
              dispatch({
                type: "GET_PRODUCT_EVALUATED",
                payload: {
                  page: action.payload.page,
                  data: getValueEvaluated.data.content,
                  size: action.payload.size
                }
              });
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
