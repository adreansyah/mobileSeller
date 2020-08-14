import React,{useState,useEffect} from "react";
import InfiniteScroll from "component/InfiniteScroll";
import {
    ButtonLink,
    CheckBox,
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
import BtnAddDisplay from "../btnAddDisplay";

const Hidden = props => {
    const {product} = props;
    const [selected,setSelected] = useState([]);
    const [datatemp,setDataTemp] = useState([]);
    const [isFilterOpen,setIsFilterOpen] = useState(false);
    const [isSortOpen,setIsSortOpen] = useState(false);
    const handleSelectChange = event => {
        const value = event.target.value;
        let arr = selected,
            idx = arr.indexOf(value);
        if(idx >= 0) {
            arr.splice(idx,1);
        } else if(idx === -1) {
            arr.splice(idx,0,value);
        }
        setSelected([...arr]);
        const data = product.hidden.data.map(list => list.productId.toString());;
        if(selected.length === 1) {
            setDataTemp(data);
        }
        else {
            setDataTemp([]);
        }
    };
    return (
        <>
            <FilterSortBlock
                {...props}
                active="hidden"
                onSelectAllChange={e => handleSelectChange(e)}
                selected={selected}
                onOpenFilter={() => setIsFilterOpen(true)}
                onOpenSort={() => setIsSortOpen(true)}
            />
            <Segment pt={144} pb={60}>
                <ProductBlock  {...props} datatemp={datatemp} selectedProps={selected} setSelectedAll={(arr) => setSelected(arr)} />
            </Segment>
            <FilterModal
                {...props}
                active="hidden"
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                setSelectedAll={(arr) => setSelected(arr)}
                setDataTemp={() => setDataTemp([])}
            />
            <SortModal
                {...props}
                active="hidden"
                isOpen={isSortOpen}
                onClose={() => setIsSortOpen(false)}
                setSelectedAll={(arr) => setSelected(arr)}
                setDataTemp={() => setDataTemp([])} />
        </>
    );
};

const ProductBlock = props => {
    const {product,RequestProductHidden,setSelectedAll,datatemp,selectedProps} = props;
    const [isContextOpen,setIsContextOpen] = useState(false);
    const [isIndexContext,setIsContextIndex] = useState(false);
    const [isStockOpen,setIsStockOpen] = useState(false);
    const [stockItem,setStockItem] = useState(0);
    const [isProductId,setProductId] = useState(0);
    const [isHideOpen,setIsHideOpen] = useState(false);
    const [isShowedData,setIsShowedData] = useState([]);
    const [selected,setSelected] = useState([]);
    const handleSelectChange = event => {
        const value = event.target.value;
        let arr = selected;
        const idx = arr.indexOf(value);
        if(idx >= 0) {
            arr.splice(idx,1);
        } else if(idx === -1) {
            arr.splice(idx,0,value);
        }
        setSelected([...arr]);
        if(product.hidden.data.length === arr.length) {
            const arrAll = ["checkAll"]
            setSelectedAll([...arrAll])
        } else {
            setSelectedAll([])
        }
    };

    const fetchPerPage = () => {
        const statCode = 103,
            page = props.product.hidden.page + 1,
            size = 5,
            loadmore = "isloadmore"
        RequestProductHidden(statCode,page,size,null,loadmore);
        setSelectedAll([]);
    };

    const loadCallback = function(e) {
        e.target.src = process.env.REACT_APP_CDN_URL + "/ex_t/R/408x408/0/0/0/src/uiImg/noimg.png";
    };

    const handleStockOpen = (stock,productId) => {
        setIsStockOpen(true);
        setIsContextOpen(false);
        setStockItem(stock);
        setProductId(productId);
    };

    const handleHideOpen = (data) => {
        setIsHideOpen(true);
        setIsContextOpen(false);
        setIsShowedData([data !== undefined ? data.toString() : []])
    };

    const handleOpenContext = index => {
        setIsContextIndex(index);
        setIsContextOpen(true);
    };

    useEffect(() => {
        if(datatemp) {
            setSelected(datatemp);
        }
        else {
            setSelected(datatemp)
        }
    },[datatemp]);

    const buttonsMore = (index) => (
        <ButtonLink
            style={{height: "100%"}}
            onClick={() => handleOpenContext(index)}
        >
            <Icon
                fillColor="black50"
                name="more"
                size={14}
                style={{marginRight: "0px"}}
            />
        </ButtonLink>
    )

    return (
        <Container>
            <InfiniteScroll
                refs={"display-product"}
                loadMore={fetchPerPage}
                hasMore={product.hidden.loadMore}
                isLoading={product.hidden.isLoading}
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
                    product.hidden.data.length === 0 &&
                    !product.hidden.loadMore && (
                        <ErrorBlock
                            key={1}
                            errOnSearch={product.hidden.query ? true : false}
                        />
                    )
                }
            >
                {product.hidden.data.map((item,index) => {
                    return (
                        <Row key={index} p={16} mb={8} bg="white">
                            <Col wide={1}>
                                <CheckBox
                                    checkProps={{
                                        onChange: e => handleSelectChange(e),
                                        name: "product",
                                        id: item.productId,
                                    }}
                                    checkItems={[
                                        {
                                            value: item.productId.toString(),
                                            checked: false
                                        }
                                    ]}
                                    selected={selected}
                                />
                            </Col>
                            <Col wide={3}>
                                <img
                                    onError={e => loadCallback(e)}
                                    src={`https://stage-cdn.elevenia.co.id` + item.image}
                                    alt="product"
                                    style={{height: "60px",width: "60px",borderRadius: "4px"}}
                                />
                            </Col>
                            <Col wide={6}>
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
                                    <Col style={{display: "inline-flex"}} onClick={() => handleStockOpen(item.stockQuantity,item.productId)}>
                                        <Text B10 fontWeight={500} color="black30" mr={4}>
                                            STOK:
                                        </Text>
                                        <Text B14 color="primary">
                                            {item.stockQuantity}
                                        </Text>
                                    </Col>
                                </Row>
                            </Col>
                            <Col wide={2}>
                                <Row mb={8}>
                                    <Col className="u-tx-right">
                                        {
                                            !selected.includes(item.productId.toString()) ? buttonsMore(index) : <Segment height={18} />
                                        }
                                        <ContextMenu
                                            isOpen={isIndexContext === index && isContextOpen}
                                            onClose={() => setIsContextOpen(false)}
                                        >
                                            <ButtonLink
                                                onClick={() => handleHideOpen(item.productId)}
                                            >
                                                <Icon fillColor="black50" name="visible" size={16} />
                                                <Text B14 color="black70">
                                                    Tampilkan
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
            {
                selectedProps.length === 0 && selected.length < 1 ? <BtnAddProduct {...props} /> : <BtnAddDisplay handleHideOpen={() => handleHideOpen()} />
            }
            <StockTray {...props} stockItem={stockItem} isUpdate="hidden" productId={isProductId} isOpen={isStockOpen} onClose={() => setIsStockOpen(false)} />
            <HideTray {...props} isShould="showed" setSelectedAll={() => setSelectedAll([])} selected={selected} ishiddenData={isShowedData} isOpen={isHideOpen} onClose={() => setIsHideOpen(false)} />
        </Container>
    );
};

export default Hidden;
