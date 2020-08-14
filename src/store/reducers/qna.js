import { BubbleChat } from "helper";
const baseState = {
  page: 0,
  loading: false,
  isLoaded: false,
  data: [],
  params: {
    sort: "boardDate,desc",
    filter: null
  }
};
const initialState = {
  /*
      set initial state
  */
  counter: {
    data: { public: 0, private: 0 },
    loading: false
  },
  list: {
    search: null,
    activeTab: "public",
    public: baseState,
    private: baseState
  },
  detail: {
    data: [],
    loading: false,
    isLoaded: false
  }
};
export const qna = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ACTIVE_TAB_QNA":
      return {
        ...state,
        list: {
          ...state.list,
          activeTab: action.payload.params
        }
      };
    case "CLEAR_QNA_DATA":
      return {
        ...state,
        [action.payload.params]: {
          ...initialState[action.payload.params]
        }
      };
    /**
     * QNA LOADING
     */
    case "REQUEST_GET_QNA_COUNTER":
      return {
        ...state,
        counter: {
          ...state.counter,
          loading: true
        }
      };
    case "REQUEST_GET_QNA_LIST":
      return {
        ...state,
        list: {
          ...state.list,
          [action.qnaType]: {
            ...state.list[action.qnaType],
            page: state.list[action.qnaType].page,
            loading: true
          }
        }
      };
    case "REQUEST_GET_QNA_DETAIL":
      return {
        ...state,
        detail: {
          ...state.detail,
          loading: true
        }
      };
    /**
     * QNA SUCCESS
     */
    case "REQUEST_GET_QNA_COUNTER_SUCCESS":
      return {
        ...state,
        counter: {
          ...state.counter,
          data: action.payload.payload,
          loading: false,
          isLoaded: true
        }
      };
    case "REQUEST_GET_QNA_LIST_SUCCESS":
      return {
        ...state,
        list: {
          ...state.list,
          [action.qnaType]: {
            ...state.list[action.qnaType],
            data: action.payload,
            page: state.list[action.qnaType].page,
            loading: false,
            isLoaded: true
          }
        }
      };
    case "REQUEST_GET_QNA_DETAIL_SUCCESS":
      const getdata = BubbleChat(action.payload.content);
      return {
        ...state,
        detail: {
          ...state.detail,
          data: getdata,
          loading: false,
          isLoaded: true
        }
      };
    /**
     * QNA FAILED
     */
    case "REQUEST_GET_QNA_COUNTER_FAILED":
      return {
        ...state,
        counter: {
          ...state.counter,
          loading: false
        }
      };
    case "REQUEST_GET_QNA_LIST_FAILED":
      return {
        ...state,
        list: {
          ...state.list,
          [action.qnaType]: {
            ...state.list[action.qnaType],
            loading: false,
            isLoaded: true
          }
        }
      };
    case "REQUEST_GET_QNA_DETAIL_FAILED":
      return {
        ...state,
        detail: {
          ...state.detail,
          loading: false,
          isLoaded: true
        }
      };
    default:
      return state;
  }
};
