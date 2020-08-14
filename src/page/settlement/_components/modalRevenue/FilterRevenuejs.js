import React,{useEffect,useState,useCallback} from 'react';
import {Icon,ButtonLink,Calendar} from '@elevenia/master-ui/components/Atom';
import {Tray,TrayHeader,TrayTitle,SelectList} from '@elevenia/master-ui/components/Molecules';
import {FilterBy} from './filterBy';
import moment from 'moment';
import Segment from '@elevenia/master-ui/components/Atom/Segment';

const FilterRevenue = props => {
    const {onFilter,isOpen,SettlementHistory} = props;
    const [active,setActive] = useState("TODAY");
    const [startDate,setDateStart] = useState("");
    const [endDate,setDateEnd] = useState("");
    const [calenderOpen,setCalendarOpen] = useState(false);
    const flexTitle = active === "CUSTOM" ? "Custom " : "Filter";

    useEffect(() => {
        if(active === "CUSTOM" && startDate !== "" && endDate !== "") {
            setActive(active)
            setDateStart("");
            setDateEnd("");
        }
        else {
            isOpen && setActive(active)
        }
    },[active,isOpen,startDate,endDate])

    const handleStartDate = useCallback(date => {
        setDateStart(date);
    },[]);

    const handleEndDate = useCallback(date => {
        const isStartDate = moment(startDate).format('YYYY-MM-DD');
        const isEndDate = moment(date).format('YYYY-MM-DD');
        setDateEnd(date);
        SettlementHistory("",isStartDate,isEndDate);
        onFilter();
        setCalendarOpen(false);
    },[startDate,SettlementHistory,onFilter]);

    const handleListActive = useCallback(active => {
        setActive(active);
        active !== "CUSTOM" && SettlementHistory(active);
        if(active !== "CUSTOM") {
            onFilter()
        }
        else {
            setCalendarOpen(true);
        }
    },[onFilter,SettlementHistory])

    const handleCanceled = useCallback(() => {
        setActive(active)
        setCalendarOpen(false);
        onFilter();
    },[onFilter,active])

    return (
        <Tray isOpen={isOpen} overlayClick={onFilter}>
            <TrayHeader>
                <TrayTitle>{flexTitle}</TrayTitle>
                <ButtonLink onClick={handleCanceled}>
                    <Icon name="cancel" size="24" fillColor="black50" />
                </ButtonLink>
            </TrayHeader>
            <Segment>
                {
                    (calenderOpen) ?
                        <>
                            {
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
                            }
                        </> :
                        <SelectList active={active} onChange={handleListActive}>
                            {FilterBy.map(item => {
                                return (
                                    <Segment key={item.value} >
                                        {item.name}
                                    </Segment>
                                )
                            })}
                        </SelectList>
                }
            </Segment >
        </Tray >
    )
}

export default FilterRevenue;