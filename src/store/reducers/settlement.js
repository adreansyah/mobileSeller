const initialState = {
  totalAkanDitransfer: 0,
  dataHistoryDetail: {
    totalIncomeAmount: 0,
    transactionFee: 0,
    orders: [],
    orderDetails: [],
  },
  dataHistory: {
    deliveryFee: 0,
    history: [],
    netIncome: 0,
    point: 0,
    productPrice: 0,
    sellerDiscount: 0,
    token: 0,
    totalDeductAmount: 0,
    totalSalePrice: 0,
    transactionFee: 0,
    wholeSaleDiscount: 0
  },
  dataSaldo: {
    accumulativeCyberMoney: 0,
    cyberMoneyLimitAmount: 0,
    cyberMoneyLimit0mount: 0,
    cyberMoneyUseAmount: 0,
    depositCyberMoney: 0,
    memId: 0,
    userCode: "00",
  },
  saldoHistory: [],
  isFilterByRevenue: "",
  Paramfilter: {
    period: "",
    filter: ""
  }
}

export const settlement = (state = initialState,action) => {
  switch(action.type) {
    case 'GET_SETTLEMENT_VALUE':
      return {
        ...state,
        totalAkanDitransfer: action.payload.totalAkanDitransfer
      }
    case 'GET_SETTLEMENT_VALUE_HISTORY':
      return {
        ...state,
        isFilterByRevenue: action.payload.period === "" ? "CUSTOM" : action.payload.period,
        dataHistory: action.payload.data
      }
    case "GET_SETTLEMENT_VALUE_ORDERS":
      return {
        ...state,
        dataHistoryDetail: action.payload
      }
    case 'GET_SETTLEMENT_SALDO':
      return {
        ...state,
        dataSaldo: action.payload
      }
    case "GET_SETTLEMENT_SALDO_HISTORY":
      return {
        ...state,
        saldoHistory: action.payload.data,
        Paramfilter: {
          period: action.payload.period,
          filter: action.payload.filter
        }
      }
    default:
      return state;
  }
};