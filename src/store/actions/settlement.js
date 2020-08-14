const DefaultSettlement = () => {
  return {
    type: "SETTLEMENT_VALUE"
  }
}

const SettlementHistory = (enums = "",StartDate = "",EndDate = "") => {
  return {
    type: "SETTLEMENT_VALUE_HISTORY",
    payload: {
      params: {
        period: enums.toUpperCase(),
        startDate: StartDate,
        endDate: EndDate
      }
    }
  }
}

const SettlementOrders = (SetDate = "") => {
  return {
    type: "SETTLEMENT_VALUE_ORDERS",
    payload: {
      params: {
        day: SetDate
      }
    }
  }
}

const DefaultSettlementSaldo = () => {
  return {
    type: "SETTLEMENT_SALDO"
  }
}

const SettlementSaldoHistory = (enumPeriod = "",enumFilter = "",startDate = '',endDate = '') => {
  return {
    type: "SETTLEMENT_SALDO_HISTORY",
    payload: {
      enumFilter,
      enumPeriod,
      startDate,
      endDate
    }
  }
}

const ActionCreators = {
  DefaultSettlement,
  SettlementHistory,
  SettlementOrders,
  DefaultSettlementSaldo,
  SettlementSaldoHistory
};
export default ActionCreators