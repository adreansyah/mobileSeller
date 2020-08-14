import {mergeMap} from 'rxjs/operators';
import {ofType} from 'redux-observable';
import {Services} from 'service'

export const RequestSettlement = (action$,store) => action$.pipe(
    ofType(
        "SETTLEMENT_VALUE",
        "SETTLEMENT_VALUE_HISTORY",
        "SETTLEMENT_VALUE_ORDERS",
        "SETTLEMENT_SALDO",
        "SETTLEMENT_SALDO_HISTORY"
    ),
    mergeMap(async (action) => {
        try {
            switch(action.type) {
                case 'SETTLEMENT_VALUE':
                    const responseValue = await Services().get('/api/settlement/income');
                    return {
                        type: "GET_SETTLEMENT_VALUE",
                        payload: responseValue.data,
                    }
                case 'SETTLEMENT_VALUE_HISTORY':
                    const responseValueHistory = await Services().get('/api/settlement/history',{...action.payload.params});
                    // console.log("HISTORY",action.payload.params);
                    return {
                        type: "GET_SETTLEMENT_VALUE_HISTORY",
                        payload: {
                            period: action.payload.params.period,
                            data: responseValueHistory.data
                        },
                    }
                case 'SETTLEMENT_VALUE_ORDERS':
                    const responseValueOrders = await Services().get('/api/settlement/orders',{...action.payload.params});
                    // console.log("ORDERS",responseValueOrders);
                    return {
                        type: "GET_SETTLEMENT_VALUE_ORDERS",
                        payload: responseValueOrders.data,
                    }
                case "SETTLEMENT_SALDO":
                    const responseSaldoValue = await Services().get(`/api/saldo`);
                    // console.log("SALDO DEFAULT", responseSaldoValue);
                    return {
                        type: "GET_SETTLEMENT_SALDO",
                        payload: responseSaldoValue.data
                    }
                case "SETTLEMENT_SALDO_HISTORY":
                    const {enumFilter,enumPeriod,startDate,endDate} = action.payload;
                    // enumFilter !== "CUSTOM" &&{}
                    const responseSaldoHistory = await Services().get(`/api/saldo-history`,{
                        period: enumPeriod.toUpperCase(),
                        filter: enumFilter.toUpperCase(),
                        startDate: enumPeriod !== 'CUSTOM' ? "" : startDate,
                        endDate: enumPeriod !== 'CUSTOM' ? "" : endDate,
                        ver: "2"
                    });
                    // console.log("SALDO HISTORY",responseSaldoHistory)
                    return {
                        type: "GET_SETTLEMENT_SALDO_HISTORY",
                        payload: {
                            data: responseSaldoHistory.data,
                            period: enumPeriod.toUpperCase(),
                            filter: enumFilter.toUpperCase(),
                        }
                    }
                default:
                    break;
            }
        } catch(e) {
            const {message} = e
            return dispatch => {
                dispatch({type: 'ALERT_ERROR',payload: {message: message}})
                setTimeout(() => dispatch({type: 'ALERT_CLEARS'}),3000)
            }
        }
    })
)