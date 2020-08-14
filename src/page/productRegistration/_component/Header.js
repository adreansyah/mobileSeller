import React from "react";
import {Header,HeaderLeft,HeaderBody} from '@elevenia/master-ui/components/Organisms/Mobile'
import {Icon,ButtonLink} from '@elevenia/master-ui/components/Atom'


const Headers = (props) => {
    return (
        <Header border fixed>
            <HeaderLeft>
                <ButtonLink onClick={() => props.history.goBack()}>
                    <Icon name={'arrow-left'} size={24} fillColor="black50" />
                </ButtonLink>
            </HeaderLeft>
            <HeaderBody>Tambah Produk</HeaderBody>
        </Header>
    )
}

export default Headers