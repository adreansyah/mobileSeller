import React from 'react'
import { Icon, ButtonLink } from '@elevenia/master-ui/components/Atom'
import { Header, HeaderLeft, HeaderBody } from '@elevenia/master-ui/components/Organisms/Mobile'

const HeaderBlock = (props) => {
    return (
        <Header border fixed>
            <HeaderLeft>
                <ButtonLink onClick={() => props.history.goBack()}>
                    <Icon name={'arrow-left'} size={24} fillColor="black70" />
                </ButtonLink>
            </HeaderLeft>
            <HeaderBody>Pusat Bantuan</HeaderBody>
        </Header>
    )
}

export default HeaderBlock
