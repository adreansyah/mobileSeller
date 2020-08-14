import React from "react";
import {Header,HeaderLeft,HeaderBody,Footer} from '@elevenia/master-ui/components/Organisms/Mobile'
import {Icon,ButtonLink,Segment, ButtonGroup, Button} from '@elevenia/master-ui/components/Atom';
import {
    TrayFull,
} from '@elevenia/master-ui/components/Molecules'
const ApplyStock = (props) => {

    return (
        <TrayFull isOpen={true}>
            <Header>
                <HeaderLeft>
                    <ButtonLink type="button" >
                        <Icon name={'arrow-left'} size={24} fillColor="black50" />
                    </ButtonLink>
                </HeaderLeft>
                <HeaderBody>Kombinasi Opsi Produk</HeaderBody>
            </Header>
            <Segment>

            </Segment>
            <Footer style={{display: "block"}} fixed>
                <Segment>
                    <ButtonGroup responsive>
                        <Button variant="primary-alt">
                            Atur Stock
                        </Button>
                    </ButtonGroup>
                </Segment>
            </Footer>
        </TrayFull>
    )
}
export default ApplyStock;