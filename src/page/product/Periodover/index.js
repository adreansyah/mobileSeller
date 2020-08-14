import React,{useState} from "react";
import InfiniteScroll from "component/InfiniteScroll";
import {
  ButtonLink,
  Col,
  Container,
  Icon,
  Text,
  Row,
  Segment,
  Spinner
} from "@elevenia/master-ui/components/Atom";
import FilterModal from "../_component/FilterModal";
import SortModal from "../_component/SortModal";
import ContextMenu from "../_component/ContextMenu";
import StockTray from "../_component/StockTray";
import HideTray from "../_component/HideTray";
import FilterSortBlock from "../_component/Filters";
import {formatRupiah} from "helper";
import ErrorBlock from "page/product/_component/ErrorBlock";
import BtnAddProduct from "../btnAddProduct";

const Periodover = props => {
  const [isFilterOpen,setIsFilterOpen] = useState(false);
  const [isSortOpen,setIsSortOpen] = useState(false);

  return (
    <>
      <FilterSortBlock
        {...props}
        active="periodover"
        onOpenFilter={() => setIsFilterOpen(true)}
        onOpenSort={() => setIsSortOpen(true)}
      />
      <Segment pt={144} pb={60}>
        <ProductBlock  {...props} />
      </Segment>
      <FilterModal
        {...props}
        active="periodover"
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
      <SortModal
        {...props}
        active="periodover"
        isOpen={isSortOpen}
        onClose={() => setIsSortOpen(false)}
      />
    </>
  );
};

const ProductBlock = props => {
  const {product,RequestProductPeriodOver} = props;
  const [isContextOpen,setIsContextOpen] = useState(false);
  const [isIndexContext,setIsContextIndex] = useState(false);
  const [isStockOpen,setIsStockOpen] = useState(false);
  const [isHideOpen,setIsHideOpen] = useState(false);

  const fetchPerPage = () => {
    const statCode = 103,
      page = props.product.periodover.page + 1,
      size = 5,
      loadmore = "isloadmore"
    RequestProductPeriodOver(statCode,page,size,null,loadmore);
  };

  const loadCallback = function(e) {
    e.target.src = process.env.REACT_APP_CDN_URL + "/ex_t/R/408x408/0/0/0/src/uiImg/noimg.png";
  };

  const handleStockOpen = () => {
    setIsStockOpen(true);
    setIsContextOpen(false);
  };

  const handleHideOpen = () => {
    setIsHideOpen(true);
    setIsContextOpen(false);
  };

  const handleOpenContext = index => {
    setIsContextIndex(index);
    setIsContextOpen(true);
  };

  return (
    <Container>
      <InfiniteScroll
        refs={"display-product"}
        loadMore={fetchPerPage}
        hasMore={product.periodover.loadMore}
        isLoading={product.periodover.isLoading}
        loader={
          <Segment
            key={0}
            width="100%"
            height={30}
            py={5}
            className="u-tx-center">
            <Spinner />
          </Segment>
        }
        error={
          product.periodover.data.length === 0 &&
          !product.periodover.loadMore && (
            <ErrorBlock
              key={1}
              errOnSearch={product.periodover.query ? true : false}
            />
          )
        }
      >
        {product.periodover.data.map((item,index) => {
          return (
            <Row key={index} p={16} mb={8} bg="white">
              <Col wide={3}>
                <img
                  onError={e => loadCallback(e)}
                  src={`https://stage-cdn.elevenia.co.id` + item.image}
                  alt="product"
                  style={{height: "60px",width: "60px",borderRadius: "4px"}}
                />
              </Col>
              <Col wide={7}>
                <Row mb={8}>
                  <Col>
                    <Text
                      B16
                      color="black70"
                      style={{wordBreak: "break-all"}}
                    >
                      {item.productName}
                    </Text>
                  </Col>
                </Row>
                <Row mb={8}>
                  <Col>
                    <Text B14 color="black40">
                      {formatRupiah(item.finalPrice,"Rp ")}
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col style={{display: "inline-flex"}}>
                    <Text B10 fontWeight={500} color="black30" mr={4}>
                      STOK:
                    </Text>
                    <Text B14 color="light">
                      {item.stockQuantity}
                    </Text>
                  </Col>
                </Row>
              </Col>
              <Col wide={2}>
                <Row mb={8}>
                  <Col className="u-tx-right">
                    <ButtonLink
                      style={{height: "100%"}}
                      onClick={() => handleOpenContext(index)}
                    >
                    </ButtonLink>
                    <ContextMenu
                      isOpen={isIndexContext === index && isContextOpen}
                      onClose={() => setIsContextOpen(false)}
                    >
                      <ButtonLink
                        className="u-mb-16"
                        onClick={() => handleStockOpen()}
                      >
                        <Icon fillColor="black50" name="edit" size={16} />
                        <Text B14 color="black70">
                          Ubah
                        </Text>
                      </ButtonLink>
                      <ButtonLink
                        onClick={() => handleHideOpen()}
                      >
                        <Icon fillColor="black50" name="invisible" size={16} />
                        <Text B14 color="black70">
                          Sembunyikan
                        </Text>
                      </ButtonLink>
                    </ContextMenu>
                  </Col>
                </Row>
                <Row mb={8}>
                  <Col pr={4}>
                    <ButtonLink
                      style={{width: "100%"}}
                      className="u-ds-flex u-js-between"
                    >
                      <Icon fillColor="black40" name="visible" size={14} />
                      <Text B12 color="black40">
                        {item.totalView >= 999 ? "999+" : item.totalView}
                      </Text>
                    </ButtonLink>
                  </Col>
                </Row>
                <Row mb={8}>
                  <Col pr={4}>
                    <ButtonLink
                      style={{width: "100%"}}
                      className="u-ds-flex u-js-between"
                    >
                      <Icon fillColor="black40" name="cash" size={14} />
                      <Text B12 color="black40">
                        {item.salesQuantity}
                      </Text>
                    </ButtonLink>
                  </Col>
                </Row>
              </Col>
            </Row>
          );
        })}
      </InfiniteScroll>
      <BtnAddProduct {...props} />
      <StockTray isOpen={isStockOpen} onClose={() => setIsStockOpen(false)} />
      <HideTray isOpen={isHideOpen} onClose={() => setIsHideOpen(false)} />
    </Container>
  );
};

export default Periodover;
