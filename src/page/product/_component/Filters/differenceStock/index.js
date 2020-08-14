import React,{useState,useEffect} from 'react';
import {
    TrayFull,SelectList
} from '@elevenia/master-ui/components/Molecules'
import {
    Icon,
    Segment,
    ButtonLink
} from '@elevenia/master-ui/components/Atom';

import {Header,HeaderLeft,HeaderBody} from '@elevenia/master-ui/components/Organisms/Mobile';
import {sisaStocks} from './sisaStock';

const DifferenceStock = props => {
    const {RequestStockProductFilter} = props;
    const [active,setActive] = useState("");
    const stocks = props.product[props.active].filter.stock;

    useEffect(() => {
        stocks === "" && setActive("");
    },[stocks]);

    const handleActive = (value) => {
        setActive(value)
        RequestStockProductFilter(value,props.active);
        props.setOpenDifferenceStock(false)
    }

    const handleUnactive = () => {
        setActive("")
        RequestStockProductFilter("",props.active);
        props.setOpenDifferenceStock(false);
    }

    return (
        <TrayFull isOpen={props.isOpen} overlayClick={() => props.setOpenDifferenceStock(false)}>
            <Header border>
                <HeaderLeft>
                    <ButtonLink onClick={() => handleUnactive()}>
                        <Icon name="cancel" size="24" fillColor="black50" />
                    </ButtonLink>
                </HeaderLeft>
                <HeaderBody>Sisa Stock</HeaderBody>
            </Header>
            <Segment bg="white">
                <SelectList active={active} onChange={value => handleActive(value)}>
                    {
                        sisaStocks.map((item) => {
                            return (
                                <div key={item.value}>{item.name}</div>
                            )
                        })
                    }
                </SelectList>
            </Segment>
        </TrayFull >
    )
}

export default DifferenceStock;