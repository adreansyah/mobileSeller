import React,{useState,useCallback,useEffect} from "react";
import {useSelector} from "react-redux";
import {Icon,ButtonLink,Calendar,Segment} from '@elevenia/master-ui/components/Atom';
import {Tray,TrayHeader,TrayTitle,SelectList} from '@elevenia/master-ui/components/Molecules';
import {Periodes} from "./listPeriode";
import moment from "moment";
const FilterPeriode = (props) => {
    const {isOpen,handleOpenPeriod,SettlementSaldoHistory} = props;
    const settlement = useSelector(state => state.settlement)
    const [active,setActive] = useState("TODAY");
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");
    const [calendarOpen,setCalendarOpen] = useState(false);

    useEffect(() => {
        if(active === "CUSTOM" && startDate !== "" && endDate !== "") {
            setActive(active)
            setStartDate("");
            setEndDate("");
        }
        else {
            isOpen && setActive(active)
        }
    },[active,isOpen,startDate,endDate])

    const handleActivePeriod = useCallback((active) => {
        setActive(active);
        if(active !== "CUSTOM") {
            handleOpenPeriod()
            const paramObj = {
                ...settlement.Paramfilter,
                period: active
            }
            SettlementSaldoHistory(paramObj.period,paramObj.filter);
        }
        else {
            setCalendarOpen(!calendarOpen);
        }
    },[calendarOpen,handleOpenPeriod,SettlementSaldoHistory,settlement.Paramfilter])

    const handleStartDate = useCallback((date) => {
        setStartDate(date);
    },[])

    const handleEndDate = useCallback((date) => {
        setEndDate(date);
        handleOpenPeriod();
        setCalendarOpen(!calendarOpen);
        const passDate = moment(startDate).format('YYYYMMDD');
        const currDate = moment(date).format('YYYYMMDD')
        SettlementSaldoHistory("CUSTOM",settlement.Paramfilter.filter,passDate,currDate);
    },[handleOpenPeriod,calendarOpen,startDate,settlement.Paramfilter,SettlementSaldoHistory])

    const handleCancelPeriod = useCallback(() => {
        handleOpenPeriod()
    },[handleOpenPeriod]);

    return (
        <Tray isOpen={isOpen} overlayClick={handleOpenPeriod}>
            <TrayHeader>
                <TrayTitle>Periode</TrayTitle>
                <ButtonLink onClick={handleCancelPeriod}>
                    <Icon name="cancel" size="24" fillColor="black50" />
                </ButtonLink>
            </TrayHeader>
            <Segment>
                {
                    calendarOpen
                        ?
                        startDate === "" ?
                            <Calendar
                                selected={startDate}
                                shouldCloseOnSelect={false}
                                onChange={handleStartDate}
                                calendarClassName="calendar-full"
                                startDate={startDate}
                                endDate={endDate}
                            />
                            :
                            <Calendar
                                selected={endDate}
                                shouldCloseOnSelect={false}
                                onChange={handleEndDate}
                                calendarClassName="calendar-full"
                                startDate={startDate}
                                endDate={endDate}
                            />

                        :
                        <SelectList active={active} onChange={(handleActivePeriod)}>
                            {Periodes.map(item => {
                                return (
                                    <Segment key={item.value} >
                                        {item.name}
                                    </Segment>
                                )
                            })}
                        </SelectList>
                }
            </Segment>
        </Tray>
    )
}

export default FilterPeriode;