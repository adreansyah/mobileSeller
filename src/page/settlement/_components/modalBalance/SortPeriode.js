import React,{useState,useCallback} from "react";
import {Icon,ButtonLink,Segment} from '@elevenia/master-ui/components/Atom';
import {Tray,TrayHeader,TrayTitle,SelectList} from '@elevenia/master-ui/components/Molecules';
import {sortPeriodes} from "./listPeriode";
import {useSelector} from 'react-redux';

const SortPeriode = (props) => {
    const {isOpen,handleOpenSortPeriod,SettlementSaldoHistory} = props;
    const settlement = useSelector(state => state.settlement);
    const [active,setActive] = useState("ALL");
    const handleActiveClose = useCallback((active) => {
        setActive(active)
        const paramObj = {
            ...settlement.Paramfilter,
            filter: active
        }
        SettlementSaldoHistory(paramObj.period,paramObj.filter);
        handleOpenSortPeriod();
    },[handleOpenSortPeriod,settlement.Paramfilter,SettlementSaldoHistory])

    return (
        <Tray isOpen={isOpen} overlayClick={handleOpenSortPeriod}>
            <TrayHeader>
                <TrayTitle>Filter</TrayTitle>
                <ButtonLink onClick={handleOpenSortPeriod}>
                    <Icon name="cancel" size="24" fillColor="black50" />
                </ButtonLink>
            </TrayHeader>
            <Segment>
                <SelectList active={active} onChange={handleActiveClose}>
                    {sortPeriodes.map(item => {
                        return (
                            <Segment key={item.value} >
                                {item.name}
                            </Segment>
                        )
                    })}
                </SelectList>
            </Segment>
        </Tray>
    )
}

export default SortPeriode;