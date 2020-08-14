import React,{useEffect,useState,useCallback} from "react";
import {
  Icon,
  AlertBox,
  Container,
  Text,
  Segment
} from "@elevenia/master-ui/components/Atom";
import {useSelector} from 'react-redux';
import FilterRevenue from '../_components/modalRevenue/FilterRevenuejs';
import DetailPenghasilan from '../_components/modalRevenue/DetailPenghasilan';
import FloatingButton from "component/FloatingButton";
import RevenueBoard from '../_components/revenueComponent/RevenueBoard';
import ReceivedValue from '../_components/revenueComponent/ReceivedValue';
import HistoryValue from "../_components/revenueComponent/HistoryValue";
import DetailHistory from "../_components/modalRevenue/DetailHistory";
import moment from "moment";

const Revenue = props => {
  const {
    DefaultSettlement,
    SettlementHistory
  } = props;
  const settlement = useSelector(state => state.settlement);
  const {
    history,
    netIncome,
    totalDeductAmount,
    totalSalePrice
  } = settlement.dataHistory;

  const [filter,setFilter] = useState(false);
  const [modalDetail,setModalDetail] = useState(false);
  const [detailHistory,setDetailHistory] = useState(false);
  const [isDate,setDateToDetail] = useState("");

  useEffect(() => {
    DefaultSettlement();
    SettlementHistory("today");
  },[DefaultSettlement,SettlementHistory]);

  const onFilter = useCallback(() => {
    setFilter(!filter)
  },[filter]);

  const onModalDetail = useCallback(e => {
    setModalDetail(!modalDetail)
  },[modalDetail]);

  const handleDetailHistory = useCallback((date) => {
    const transactionDate = moment(date,"DD/MM/YYYY").format('YYYYMMDD');
    setDetailHistory(!detailHistory);
    setDateToDetail(transactionDate);
  },[detailHistory])

  return (
    <>
      <RevenueBoard settlement={settlement} />
      <Segment m={16}>
        <Container>
          <AlertBox type="warning" dismiss>
            <Text>
              Hasil Penjualan adalah Uang yang akan dicairkan besok berdasarkan
              status penjualan saat ini.
          </Text>
          </AlertBox>
        </Container>
      </Segment>
      <ReceivedValue onModalDetail={onModalDetail} netIncome={netIncome} totalDeductAmount={totalDeductAmount} totalSalePrice={totalSalePrice} />
      <Text H14 px={16} pb={12} color="gray">{history.length} Transaksi</Text>
      {
        history.length === 0 ?
          <Segment p={22}>
            <Text H14 color="gray" className="u-tx-center">
              Tidak Ada History
            </Text>
          </Segment> :
          history.map((item,index) => (<HistoryValue key={index} {...item} handleDetailHistory={handleDetailHistory} />))
      }
      <Segment className="u-ds-flex u-js-center">
        <FloatingButton onClick={onFilter} size="medium" variant="secondary" className="round">
          <Icon fillColor={settlement.isFilterByRevenue === "TODAY" || settlement.isFilterByRevenue === "" ? "black50" : "green50"} name="sort" size="small" mr={8} />
          <Text h14 color="black70">FILTER</Text>
        </FloatingButton>
      </Segment>
      <FilterRevenue {...props} isOpen={filter} onFilter={onFilter} />
      <DetailPenghasilan isOpen={modalDetail} onModalDetail={onModalDetail} />
      <DetailHistory {...props} settlement={settlement} isTransactionDate={isDate} isOpen={detailHistory} setDetailHistory={handleDetailHistory} />
    </>
  );
};

export default Revenue;
