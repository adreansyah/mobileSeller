import React from 'react'
import { Header, HeaderBody } from '@elevenia/master-ui/components/Organisms/Mobile'
import ImageLogo from 'assets/images/elevenia-seller.svg'

const HeaderBlock = () => {
    return (
        <Header fixed border>
            <HeaderBody><img src={ImageLogo} alt="elevenia"/></HeaderBody>
        </Header>
    )
}

export default HeaderBlock
