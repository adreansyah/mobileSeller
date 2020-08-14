import React from 'react';
import {ButtonLink,Icon} from '@elevenia/master-ui/components/Atom'
import {
    Header,
    HeaderBody,
    HeaderLeft
} from "@elevenia/master-ui/components/Organisms/Mobile";
const Headers = props => {
    console.log(props);
    return (
        <>
            <Header border fixed>
                <HeaderLeft>
                    <ButtonLink onClick={() => props.history.goBack()}>
                        <Icon name={'arrow-left'} size={24} fillColor="black50" />
                    </ButtonLink>
                </HeaderLeft>
                <HeaderBody>Riwayat Penghasilan</HeaderBody>
                {/* <HeaderRight>
                    <ButtonLink onClick={setOpen}>
                        <Icon name="information" size={24} fillColor="black50" />
                    </ButtonLink>
                </HeaderRight> */}
            </Header>
            {/* <Information isOpen={isOpen} setOpen={() => onOpen()} setClose={() => onClose()} /> */}
        </>
    );
}


export default Headers;