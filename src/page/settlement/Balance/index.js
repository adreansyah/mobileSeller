import React,{useEffect,useState,useCallback} from 'react';
import {Icon,ButtonLink,Col,Row} from '@elevenia/master-ui/components/Atom';
import {useSelector} from "react-redux";
import {Segment,Text} from '@elevenia/master-ui/components/Atom';
import FloatingButton from 'component/FloatingButton';
import BalanceBoard from '../_components/balanceComponent/Balanceboard';
import HistorySaldo from '../_components/balanceComponent/HistorySaldo';
import FilterPeriode from '../_components/modalBalance/FilterPeriode';
import SortPeriode from '../_components/modalBalance/SortPeriode';
import InformasiBalance from '../_components/modalBalance/InformationBalance';
const Balance = (props) => {
    const {DefaultSettlementSaldo,SettlementSaldoHistory} = props;
    const settlement = useSelector(state => state.settlement);
    const [isOpenPeriod,setOpenPeriod] = useState(false);
    const [isOpenSortPeriod,setOpenSortPeriod] = useState(false);
    const [isOpenModalSaldo,setOpenModalSaldo] = useState(false);
    const handleOpenPeriod = useCallback(() => {
        setOpenPeriod(!isOpenPeriod);
    },[isOpenPeriod]);
    const handleOpenSortPeriod = useCallback(() => {
        setOpenSortPeriod(!isOpenSortPeriod);
    },[isOpenSortPeriod]);

    const handleOpeninfomasi = useCallback(() => {
        setOpenModalSaldo(!isOpenModalSaldo)
    },[isOpenModalSaldo]);

    useEffect(() => {
        DefaultSettlementSaldo();
        SettlementSaldoHistory("today","all");
    },[DefaultSettlementSaldo,SettlementSaldoHistory]);

    return (
        <>
            <BalanceBoard handleOpeninfomasi={handleOpeninfomasi} />
            <HistorySaldo />
            <Segment className="u-ds-flex u-js-center">
                <FloatingButton>
                    <Row>
                        <Col style={{top: -2}} p={4} borderRight="0.25px solid #afafaf">
                            <ButtonLink mr={4} onClick={handleOpenPeriod}>
                                <Icon fillColor={settlement.Paramfilter.period === "TODAY" || settlement.Paramfilter.period === "" ? "black50" : "green50"} name="filter" size="small" mr={4} />
                                <Text h14 color="black70">Periode</Text>
                            </ButtonLink>
                        </Col>
                        <Col style={{top: -2}} p={4} borderLeft="0.25px solid #afafaf">
                            <ButtonLink ml={4} onClick={handleOpenSortPeriod}>
                                <Icon fillColor={settlement.Paramfilter.filter === "ALL" || settlement.Paramfilter.filter === "" ? "black50" : "green50"} name="sort" size="small" mr={4} />
                                <Text h14 color="black70">Filter</Text>
                            </ButtonLink>
                        </Col>
                    </Row>
                </FloatingButton>
            </Segment>
            <FilterPeriode {...props} isOpen={isOpenPeriod} handleOpenPeriod={handleOpenPeriod} />
            <SortPeriode {...props} isOpen={isOpenSortPeriod} handleOpenSortPeriod={handleOpenSortPeriod} />
            <InformasiBalance isOpen={isOpenModalSaldo} handleOpeninfomasi={handleOpeninfomasi} />
        </>
    )
}

export default Balance;
