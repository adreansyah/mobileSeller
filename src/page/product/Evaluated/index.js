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
import FilterSortBlock from "../_component/Filters";
import {formatRupiah} from "helper";
import ErrorBlock from "page/product/_component/ErrorBlock";

const Evaluated = props => {
  const [isFilterOpen,setIsFilterOpen] = useState(false);
  const [isSortOpen,setIsSortOpen] = useState(false);
  return (
    <>
      <FilterSortBlock
        {...props}
        active="evaluated"
        onOpenFilter={() => setIsFilterOpen(true)}
        onOpenSort={() => setIsSortOpen(true)}
      />
      <Segment pt={144} pb={60}>
        <ProductBlock  {...props} />
      </Segment>
      <FilterModal
        {...props}
        active="evaluated"
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
      <SortModal
        {...props}
        active="evaluated"
        isOpen={isSortOpen}
        onClose={() => setIsSortOpen(false)}
      />
    </>
  );
};

const ProductBlock = props => {
  const {product,RequestProductEvaluated} = props;

  const fetchPerPage = () => {
    const statCode = 103,
      page = props.product.evaluated.page + 1,
      size = 5,
      loadmore = "isloadmore"
    RequestProductEvaluated(statCode,page,size,null,loadmore);
  };

  const loadCallback = function(e) {
    e.target.src = process.env.REACT_APP_CDN_URL + "/ex_t/R/408x408/0/0/0/src/uiImg/noimg.png";
  };

  return (
    <Container>
      <InfiniteScroll
        refs={"display-product"}
        loadMore={fetchPerPage}
        hasMore={product.evaluated.loadMore}
        isLoading={product.evaluated.isLoading}
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
          product.evaluated.data.length === 0 &&
          !product.evaluated.loadMore && (
            <ErrorBlock
              key={1}
              errOnSearch={product.evaluated.query ? true : false}
            />
          )
        }
      >
        {product.evaluated.data.map((item,index) => {
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
    </Container>
  );
};

export default Evaluated;
