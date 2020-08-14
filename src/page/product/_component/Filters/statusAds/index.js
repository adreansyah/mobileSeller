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
import {ads} from './statusAds';

const AdsStatus = props => {
    const {RequestAdsProductFilter} = props;
    const [active,setActive] = useState("");
    const premiumAds = props.product[props.active].filter.premiumAds

    useEffect(() => {
        premiumAds === "" && setActive("");
    },[premiumAds]);

    const handleActive = (value) => {
        setActive(value)
        RequestAdsProductFilter(value,props.active);
        props.setOpenAdsStatus(false)
    }

    const handleUnactive = () => {
        setActive("")
        RequestAdsProductFilter("",props.active);
        props.setOpenAdsStatus(false);
    }

    return (
        <TrayFull isOpen={props.isOpen} overlayClick={() => props.setOpenAdsStatus(false)}>
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
                        ads.map((item) => {
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

export default AdsStatus;