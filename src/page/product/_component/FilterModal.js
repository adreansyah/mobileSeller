import React,{useState,useEffect} from 'react'
import {
    TrayFull
} from '@elevenia/master-ui/components/Molecules'
import {
    RadioButton,
    ButtonLink,
    Icon,
    Button,
    Text,
    Segment,
    Textfield
} from '@elevenia/master-ui/components/Atom'
import Categories from './Filters/categories/Categories';
import DifferenceStock from './Filters/differenceStock'
import AdsStatus from './Filters/statusAds';
import {Header,HeaderLeft,HeaderBody,HeaderRight,Footer} from '@elevenia/master-ui/components/Organisms/Mobile';
import {sisaStocks} from './Filters/differenceStock/sisaStock';
import {ads} from './Filters/statusAds/statusAds';

const FilterModal = ({isOpen,onClose,...props}) => {
    const {setSelectedAll,setDataTemp,RequestProductFilter,RequestCategoryContentProductFilter,RequestPreOrderAndReadyStockFilter,RequestResetAllFilterTabs,RequestOnClose} = props;
    const items = [
        {label: 'Ready Stock',value: '01'},
        {label: 'Pre Order',value: '04'},
    ];

    const [selectedProductType,setSelectedProductType] = useState("");
    const [isOpenCategories,setOpenCategories] = useState(false);
    const [isOpenDifferenceStock,setOpenDifferenceStock] = useState(false);
    const [isOpenAdsStatus,setOpenAdsStatus] = useState(false);

    useEffect(() => {
        setSelectedProductType(props.product[props.active].filter.salesMethodCode);
    },[props.product,props.active]);

    const handlePreorderReadyStock = (e) => {
        setSelectedProductType(e.target.value);
        RequestPreOrderAndReadyStockFilter(e.target.value,props.active);
    }
    const handleCategory = () => {
        setOpenCategories(true);
        RequestProductFilter(props.active);
    }
    const handleStock = () => {
        setOpenDifferenceStock(true);
    }

    const handleAdsStatus = () => {
        setOpenAdsStatus(true);
    }

    const handleApply = () => {
        onClose();
        if(props.active === "displayed" || props.active === "hidden") {
            setSelectedAll([])
            setDataTemp([])
        }
        RequestCategoryContentProductFilter(props.active);
    }

    const handleReset = () => {
        RequestResetAllFilterTabs(props.active);
    }

    const onClosed = () => {
        onClose();
        RequestOnClose(props.active);
    }

    const categoryId = props.product[props.active].dataFilter.filter(obj => {
        return obj.category1Id === parseInt(props.product[props.active].filter.categoryId)
    });

    const stockId = sisaStocks.filter(obj => {
        return obj.value === props.product[props.active].filter.stock
    });

    const adsStat = ads.filter(obj => {
        return obj.value === props.product[props.active].filter.premiumAds
    });

    return (
        <>
            <TrayFull isOpen={isOpen} overlayClick={() => onClose()}>
                <Header border>
                    <HeaderLeft>
                        <ButtonLink onClick={() => onClosed()}>
                            <Icon name="cancel" size="24" fillColor="black50" />
                        </ButtonLink>
                    </HeaderLeft>
                    <HeaderBody>Title</HeaderBody>
                    <HeaderRight
                        style={{lineHeight: '24px',height: '24px',marginLeft: 'auto'}}
                        onClick={() => handleReset()}
                    >
                        <Text color="success">RESET</Text>
                    </HeaderRight>
                </Header>
                <Segment>
                    <Segment bg="white" px={16} pt={16} pb={16}>
                        <Text B10 color="black50" fontWeight="500" pb={12}>
                            TIPE PRODUK
                        </Text>
                        <RadioButton
                            radioProps={{
                                onChange: e => handlePreorderReadyStock(e),
                                name: 'productType',
                                id: 'productType',
                                selected: selectedProductType,
                            }}
                            radioItems={items}
                            selected={selectedProductType}
                        />
                    </Segment>
                    <Segment bg="white" px={16} pb={4}>
                        <Text B10 color="black50" fontWeight="500">
                            KATEGORI
                        </Text>
                    </Segment>
                    <Segment bg="white" px={16} pb={16}>
                        <Textfield
                            onClick={() => handleCategory()}
                            model="line"
                            right={<Icon name={"chevron-down"} size={16} fillColor="black50" className={"u-mr-8"} />}
                            inputProps={{placeholder: categoryId.length !== 0 ? categoryId[0].categoryName : "Pilih Category",readOnly: true}}
                        />
                    </Segment>
                    <Segment bg="white" px={16} pb={4}>
                        <Text B10 color="black50" fontWeight="500">
                            SISA STOK
                        </Text>
                    </Segment>
                    <Segment bg="white" px={16} pb={16}>
                        <Textfield
                            onClick={() => handleStock()}
                            model="line"
                            right={<Icon name={"chevron-down"} size={16} fillColor="black50" className={"u-mr-8"} />}
                            inputProps={{placeholder: stockId.length !== 0 ? stockId[0].name : "Pilih Sisa Stok",readOnly: true}}
                        />
                    </Segment>
                    <Segment bg="white" px={16} pb={4}>
                        <Text B10 color="black50" fontWeight="500">
                            STATUS ADS
                        </Text>
                    </Segment>
                    <Segment bg="white" px={16} pb={16}>
                        <Textfield
                            onClick={() => handleAdsStatus()}
                            model="line"
                            right={<Icon name={"chevron-down"} size={16} fillColor="black50" className={"u-mr-8"} />}
                            inputProps={{placeholder: adsStat.length !== 0 ? adsStat[0].name : "Status Ads",readOnly: true}}
                        />
                    </Segment>
                </Segment>
                <Footer fixed bo>
                    <Button
                        variant={'primary-alt'}
                        style={{width: '100%'}}
                        onClick={() => handleApply()}
                    >
                        TERAPKAN
                    </Button>
                </Footer>
            </TrayFull>
            <Categories {...props} isOpen={isOpenCategories} setOpenCategories={setOpenCategories} />
            <DifferenceStock {...props} isOpen={isOpenDifferenceStock} setOpenDifferenceStock={setOpenDifferenceStock} />
            <AdsStatus {...props} isOpen={isOpenAdsStatus} setOpenAdsStatus={setOpenAdsStatus} />
        </>
    )
}

export default FilterModal
