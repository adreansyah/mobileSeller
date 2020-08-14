import {unique} from "helper";

const initialState = {
  displayed: {
    querytmp: null,
    page: 0,
    data: [],
    query: null,
    isLoading: true,
    loadMore: true,
    dataFilter: [],
    filter: {
      salesMethodCode: "",
      categoryId: "",
      stock: "",
      premiumAds: ""
    },
    sort: "createdDate,desc"
  },
  soldout: {
    querytmp: null,
    page: 0,
    data: [],
    query: null,
    isLoading: true,
    loadMore: true,
    dataFilter: [],
    filter: {
      salesMethodCode: "",
      categoryId: "",
      stock: "",
      premiumAds: ""
    },
    sort: "createdDate,desc"
  },
  hidden: {
    querytmp: null,
    page: 0,
    data: [],
    query: null,
    isLoading: true,
    loadMore: true,
    dataFilter: [],
    filter: {
      salesMethodCode: "",
      categoryId: "",
      stock: "",
      premiumAds: ""
    },
    sort: "createdDate,desc"
  },
  periodover: {
    querytmp: null,
    page: 0,
    data: [],
    query: null,
    isLoading: true,
    loadMore: true,
    dataFilter: [],
    filter: {
      salesMethodCode: "",
      categoryId: "",
      stock: "",
      premiumAds: ""
    },
    sort: "createdDate,desc"
  },
  evaluated: {
    querytmp: null,
    page: 0,
    data: [],
    query: null,
    isLoading: true,
    loadMore: true,
    dataFilter: [],
    filter: {
      salesMethodCode: "",
      categoryId: "",
      stock: "",
      premiumAds: ""
    },
    sort: "createdDate,desc"
  }
};

export const product = (state = initialState,action) => {
  switch(action.type) {
    case "SEARCH_KEYWORD":
      return {
        ...state,
        [action.payload.active]: {
          ...state[action.payload.active],
          query: action.payload.query,
        }
      }
    case "RESET_SEARCH_DATA":
      return {
        ...state,
        [action.payload.types]: {
          ...state[action.payload.types],
          page: action.payload.page,
          isLoading: true,
          loadMore: true,
          data: []
        }
      }
    case "GET_PRODUCT_FILTER":
      return {
        ...state,
        [action.payload.active]: {
          ...state[action.payload.active],
          dataFilter: action.payload.data,
        }
      }
    case "REQUEST_CATEGORY_PRODUCT_FILTER":
      return {
        ...state,
        [action.payload.active]: {
          ...state[action.payload.active],
          loadMore: true,
          filter: {
            ...state[action.payload.active].filter,
            categoryId: action.payload.params
          }
        }
      }
    case "REQUEST_STOCK_PRODUCT_FILTER":
      return {
        ...state,
        [action.payload.active]: {
          ...state[action.payload.active],
          loadMore: true,
          filter: {
            ...state[action.payload.active].filter,
            stock: action.payload.params
          }
        }
      }
    case "REQUEST_ADS_PRODUCT_FILTER":
      return {
        ...state,
        [action.payload.active]: {
          ...state[action.payload.active],
          loadMore: true,
          filter: {
            ...state[action.payload.active].filter,
            premiumAds: action.payload.params
          }
        }
      }
    case "REQUEST_CONTENT_PRODUCT_FILTER":
      return {
        ...state,
        [action.payload.active]: {
          ...state[action.payload.active],
          isLoading: true,
          filter: {
            ...state[action.payload.active].filter
          }
        }
      }
    case "REQUEST_SET_PREODER_AND_READY_STOCK":
      return {
        ...state,
        [action.payload.active]: {
          ...state[action.payload.active],
          loadMore: true,
          filter: {
            ...state[action.payload.active].filter,
            salesMethodCode: action.payload.params
          }
        }
      }
    case "REQUEST_RESET_ALL_FILTER":
      return {
        ...state,
        [action.payload.active]: {
          ...state[action.payload.active],
          isLoading: false,
          // loadMore: true,
          filter: {
            salesMethodCode: "",
            categoryId: "",
            stock: "",
            premiumAds: ""
          }
        }
      }
    case "REQUEST_RESET_ON_CLOSE":
      return {
        ...state,
        [action.payload.active]: {
          ...state[action.payload.active],
          isLoading: false,
          // loadMore: false,
          filter: {
            salesMethodCode: "",
            categoryId: "",
            stock: "",
            premiumAds: ""
          }
        }
      }
    case "RESET_FILTER_DATA":
      return {
        ...state,
        [action.payload.types]: {
          ...state[action.payload.types],
          loadMore: true,
          data: []
        }
      }
    case "REQUEST_LOAD_CONTENT_IS_SORTS":
      return {
        ...state,
        [action.payload.active]: {
          ...state[action.payload.active],
          isLoading: true,
          sort: action.payload.value,
        }
      }
    case "RESET_SORTS_DATA":
      return {
        ...state,
        [action.payload.active]: {
          ...state[action.payload.active],
          loadMore: true,
          data: []
        }
      }
    case "REQUEST_PRODUCT_DISPLAY":
      return {
        ...state,
        displayed: {
          ...state.displayed,
          isLoading: true
        }
      };
    case "GET_PRODUCT_DISPLAY":
      return {
        ...state,
        displayed: {
          ...state.displayed,
          querytmp: state.displayed.query,
          isLoading: false,
          page: action.payload.page,
          data: unique(
            [...state.displayed.data,...action.payload.data],
            "productId"
          ),
          loadMore:
            action.payload.data.length < action.payload.size ? false : true,
        }
      };
    case "REQUEST_PRODUCT_SOLDOUT":
      return {
        ...state,
        soldout: {
          ...state.soldout,
          isLoading: true
        }
      };
    case "GET_PRODUCT_SOLDOUT":
      return {
        ...state,
        soldout: {
          ...state.soldout,
          querytmp: state.soldout.query,
          isLoading: false,
          page: action.payload.page,
          data: unique(
            [...state.soldout.data,...action.payload.data],
            "productId"
          ),
          loadMore:
            action.payload.data.length < action.payload.size ? false : true,
        }
      };
    case "REQUEST_PRODUCT_HIDDEN":
      return {
        ...state,
        hidden: {
          ...state.hidden,
          isLoading: true
        }
      };
    case "GET_PRODUCT_HIDDEN":
      return {
        ...state,
        hidden: {
          ...state.hidden,
          querytmp: state.hidden.query,
          isLoading: false,
          page: action.payload.page,
          data: unique(
            [...state.hidden.data,...action.payload.data],
            "productId"
          ),
          loadMore:
            action.payload.data.length < action.payload.size ? false : true,
        }
      };
    case "REQUEST_PRODUCT_PERIOD_OVER":
      return {
        ...state,
        periodover: {
          ...state.periodover,
          isLoading: true
        }
      };
    case "GET_PRODUCT_PERIOD_OVER":
      return {
        ...state,
        periodover: {
          ...state.periodover,
          querytmp: state.periodover.query,
          isLoading: false,
          page: action.payload.page,
          data: unique(
            [...state.periodover.data,...action.payload.data],
            "productId"
          ),
          loadMore:
            action.payload.data.length < action.payload.size ? false : true,
        }
      }
    case "REQUEST_PRODUCT_EVALUATED":
      return {
        ...state,
        evaluated: {
          ...state.evaluated,
          isLoading: true
        }
      };
    case "GET_PRODUCT_EVALUATED":
      return {
        ...state,
        evaluated: {
          ...state.evaluated,
          querytmp: state.evaluated.query,
          isLoading: false,
          page: action.payload.page,
          data: unique(
            [...state.evaluated.data,...action.payload.data],
            "productId"
          ),
          loadMore:
            action.payload.data.length < action.payload.size ? false : true,
        }
      }
    case "REQUEST_HIDDEN_PRODUCT":
      return {
        ...state,
        displayed: {
          ...state.displayed,
          isLoading: true,
          data: []
        }
      };
    case "REQUEST_SHOWED_PRODUCT":
      return {
        ...state,
        displayed: {
          ...state.displayed,
          isLoading: true,
          data: []
        }
      };
    case "SUCCESS_UPDATE_STOCK":
      return {
        ...state,
      }
    default:
      return state;
  }
};
