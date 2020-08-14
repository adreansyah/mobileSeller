import React,{useState,useEffect} from "react";
import {Tabs} from "@elevenia/master-ui/components/Molecules";
import {tabSlides} from "./tabSlides";
import Header from "./_component/Header";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {MenuBar} from "component";
import {Route,Switch} from 'react-router-dom';
import ActionCreatorsonLoad from "store/actions/product";
import ActionCreatorsSearchFilterSort from 'store/actions/productFilterSearchSort';
import ActionCreatorShowandHide from 'store/actions/productHiddenandShow';
import ActionCreatorUpdateProduct from 'store/actions/productUpdateStock';

const Product = props => {
  const [active,setActive] = useState(tabSlides[0].uri);
  const {
    product,
    history,
    match,
    RequestProductDisplay,
    RequestProductSoldOut,
    RequestProductHidden,
    RequestProductPeriodOver,
    RequestProductEvaluated
  } = props;
  const queryDisplayed = product["displayed"].query;
  const querySoldout = product["soldout"].query;
  const queryhidden = product["hidden"].query;
  const queryperiodover = product["periodover"].query;
  const queryevaluated = product["evaluated"].query;
  const filterDisplayed = product["displayed"].filter;
  const filterSoldout = product["soldout"].filter;
  const filterhidden = product["hidden"].filter;
  const filterperiodover = product["periodover"].filter;
  const filterevaluated = product["evaluated"].filter;
  const sortDisplayed = product["displayed"].sort;
  const sortSoldout = product["soldout"].sort;
  const sorthidden = product["hidden"].sort;
  const sortperiodover = product["periodover"].sort;
  const sortevaluated = product["evaluated"].sort;

  const handleChangeTabs = displayTabs => {
    setActive(displayTabs);
    history.push('/product/' + active)
  };

  useEffect(() => {
    history.push('/product/' + active);
    if(match.params.slug === "displayed") {
      active === "displayed" && RequestProductDisplay(103,0,5,null);
    }
    if(match.params.slug === "soldout") {
      active === "soldout" && RequestProductSoldOut(104,0,5,null);
    }
    if(match.params.slug === "hidden") {
      active === "hidden" && RequestProductHidden(105,0,5,null);
    }
    if(match.params.slug === "periodover") {
      active === "periodover" && RequestProductPeriodOver(106,0,5,null);
    }
    if(match.params.slug === "evaluated") {
      active === "evaluated" && RequestProductEvaluated(108,0,5,null);
    }
  },[
    history,
    match.params.slug,
    active,
    queryDisplayed,
    querySoldout,
    queryhidden,
    queryperiodover,
    queryevaluated,
    filterDisplayed,
    filterSoldout,
    filterhidden,
    filterperiodover,
    filterevaluated,
    sortDisplayed,
    sortSoldout,
    sorthidden,
    sortperiodover,
    sortevaluated,
    RequestProductDisplay,
    RequestProductSoldOut,
    RequestProductHidden,
    RequestProductPeriodOver,
    RequestProductEvaluated
  ]);

  return (
    <>
      {props.setAlerts.alert.componentMessage}
      <div className="u-bg-white u-ps-fixed u-mt-0" style={{zIndex: 10}}>
        <Header {...props} active={active} />
        <div style={{position: "relative",width: "100vw"}}>
          <Tabs
            active={active}
            onChange={active => handleChangeTabs(active)}
            longTabs
            tabsPadding="8"
            underlineSize={2}
          >
            {tabSlides.map(item => {
              return <div key={item.uri}>{item.name}</div>;
            })}
          </Tabs>
        </div>
      </div>
      <Switch>
        {
          tabSlides.map((item,index) => {
            return (
              <Route
                key={index}
                path={`/product/${item.uri}`}
                exact={true}
                name={item.name}
                render={router => {
                  return <item.component {...router} {...props} />
                }} />
            )
          })
        }
      </Switch>
      <MenuBar />
    </>
  );
};

const mapStateToProps = state => {
  const {product,setAlerts} = state
  return {product,setAlerts};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    ...ActionCreatorsonLoad,
    ...ActionCreatorsSearchFilterSort,
    ...ActionCreatorShowandHide,
    ...ActionCreatorUpdateProduct
  },dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(Product);
