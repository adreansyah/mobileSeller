const RequestProductDisplay = (statCode,page,size,query,flex = null) => {
  return (dispatch,getState) => {
    const {product} = getState();
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
      selStatCode: statCode,
      page: page,
      size: size,
      sort: product.displayed.sort,
      query: product.displayed.query,
      ...ObjectsFilter
    }
    product.displayed.isLoading &&
      dispatch({
        type: "REQUEST_PRODUCT_DISPLAY",
        payload: dataPayload
      });

    flex === "isloadmore" &&
      dispatch({
        type: "REQUEST_PRODUCT_DISPLAY",
        payload: dataPayload
      });
  };
};

const RequestProductSoldOut = (statCode,page,size,query,flex = null) => {
  return (dispatch,getState) => {
    const {product} = getState();
    const ObjectsFilter = product.soldout.filter.salesMethodCode === ""
      ?
      {
        categoryId: product.soldout.filter.categoryId,
        stock: product.soldout.filter.stock,
        premiumAds: product.soldout.filter.premiumAds
      }
      :
      {
        ...product.soldout.filter
      }
    const dataPayload = {
      selStatCode: statCode,
      page: page,
      size: size,
      sort: product.soldout.sort,
      query: product.soldout.query,
      ...ObjectsFilter
    }

    product.soldout.isLoading &&
      dispatch({
        type: "REQUEST_PRODUCT_SOLDOUT",
        payload: dataPayload
      });

    flex === "isloadmore" &&
      dispatch({
        type: "REQUEST_PRODUCT_SOLDOUT",
        payload: dataPayload
      });

  };
};

const RequestProductHidden = (statCode,page,size,query,flex = null) => {
  return (dispatch,getState) => {
    const {product} = getState();
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
      selStatCode: statCode,
      page: page,
      size: size,
      sort: product.hidden.sort,
      query: product.hidden.query,
      ...ObjectsFilter
    }

    product.hidden.isLoading &&
      dispatch({
        type: "REQUEST_PRODUCT_HIDDEN",
        payload: dataPayload
      });

    flex === "isloadmore" &&
      dispatch({
        type: "REQUEST_PRODUCT_HIDDEN",
        payload: dataPayload
      });
  };
};

const RequestProductPeriodOver = (statCode,page,size,query,flex = null) => {
  return (dispatch,getState) => {
    const {product} = getState();
    const ObjectsFilter = product.periodover.filter.salesMethodCode === ""
      ?
      {
        categoryId: product.periodover.filter.categoryId,
        stock: product.periodover.filter.stock,
        premiumAds: product.periodover.filter.premiumAds
      }
      :
      {
        ...product.periodover.filter
      }
    const dataPayload = {
      selStatCode: statCode,
      page: page,
      size: size,
      sort: product.periodover.sort,
      query: product.periodover.query,
      ...ObjectsFilter
    }
    product.periodover.isLoading &&
      dispatch({
        type: "REQUEST_PRODUCT_PERIOD_OVER",
        payload: dataPayload
      });

    flex === "isloadmore" &&
      dispatch({
        type: "REQUEST_PRODUCT_PERIOD_OVER",
        payload: dataPayload
      });
  };
};

const RequestProductEvaluated = (statCode,page,size,query,flex = null) => {
  return (dispatch,getState) => {
    const {product} = getState();
    const ObjectsFilter = product.evaluated.filter.salesMethodCode === ""
      ?
      {
        categoryId: product.evaluated.filter.categoryId,
        stock: product.evaluated.filter.stock,
        premiumAds: product.evaluated.filter.premiumAds
      }
      :
      {
        ...product.evaluated.filter
      }
    const dataPayload = {
      selStatCode: statCode,
      page: page,
      size: size,
      sort: product.evaluated.sort,
      query: product.evaluated.query,
      ...ObjectsFilter
    }
    product.evaluated.isLoading &&
      dispatch({
        type: "REQUEST_PRODUCT_EVALUATED",
        payload: dataPayload
      });

    flex === "isloadmore" &&
      dispatch({
        type: "REQUEST_PRODUCT_EVALUATED",
        payload: dataPayload
      });
  };
};

const ActionCreatorsonLoad = {
  RequestProductDisplay,
  RequestProductSoldOut,
  RequestProductHidden,
  RequestProductPeriodOver,
  RequestProductEvaluated
};
export default ActionCreatorsonLoad;
