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

const Categories = props => {
    const {RequestCategoryProductFilter} = props;
    const [active,setActive] = useState("");
    const categories = props.product[props.active].filter.categoryId;
    
    useEffect(() => {
        categories === "" && setActive("");
    },[categories]);

    const handleActive = (value) => {
        setActive(value)
        RequestCategoryProductFilter(value,props.active);
        props.setOpenCategories(false)
    }

    const handleUnactive = () => {
        setActive("")
        RequestCategoryProductFilter("",props.active);
        props.setOpenCategories(false);
    }
    return (
        <TrayFull isOpen={props.isOpen} overlayClick={() => props.setOpenCategories(false)}>
            <Header border>
                <HeaderLeft>
                    <ButtonLink onClick={() => handleUnactive()}>
                        <Icon name="cancel" size="24" fillColor="black50" />
                    </ButtonLink>
                </HeaderLeft>
                <HeaderBody>Pilih Kategori</HeaderBody>
            </Header>
            <Segment bg="white">
                <SelectList active={active} onChange={value => handleActive(value)}>
                    {
                        props.product[props.active].dataFilter.map((item) => {
                            return (
                                <div key={item.category1Id}>{item.categoryName}</div>
                            )
                        })
                    }
                </SelectList>
            </Segment>
        </TrayFull >
    )
}

export default Categories;