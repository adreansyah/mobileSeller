import React from "react";
import {Header,HeaderLeft,HeaderBody,Footer} from '@elevenia/master-ui/components/Organisms/Mobile'
import {Icon,ButtonLink,Segment,ButtonGroup,Button,Row,Col} from '@elevenia/master-ui/components/Atom';
import {
    TrayFull,
} from '@elevenia/master-ui/components/Molecules'
const ModalEditImage = (props) => {
    const {setOpenDetailImage,param,isOpen,handleImage,handleRemoveimage,swapFirstFoto} = props

    return (
        <TrayFull isOpen={isOpen}>
            <Header>
                <HeaderLeft>
                    <ButtonLink type="button" onClick={() => setOpenDetailImage()}>
                        <Icon name={'arrow-left'} size={24} fillColor="black50" />
                    </ButtonLink>
                </HeaderLeft>
                <HeaderBody>Edit photo</HeaderBody>
            </Header>
            <Segment style={{
                display: isOpen ? "block" : "none"
            }} className="u-tx-center" pt={40}>
                <img
                    height={300}
                    src={param.image}
                    alt="hello"
                />
            </Segment>
            <Footer fixed>
                <Row>
                    <Col wide={12}>
                        <ButtonGroup responsive>
                            <Button type="button" variant="secondary" onClick={() => handleRemoveimage(param.id)}>Hapus Foto</Button>
                            <Button type="button" variant="secondary">
                                Ganti Foto
                                <input
                                    multiple
                                    onChange={handleImage}
                                    type="file"
                                    accept="image/*"
                                    name="photo"
                                    style={{
                                        position: "absolute",
                                        left: 0,
                                        right: 0,
                                        opacity: 0,
                                        width: "100%",
                                        padding: 9
                                    }}
                                />
                            </Button>
                        </ButtonGroup>
                    </Col>
                    {
                        param.id !== 0 &&
                        <Col wide={12} pt={8}>
                            <ButtonGroup responsive>
                                <Button type="button" onClick={() => swapFirstFoto(param.id)} variant="primary-alt">Jadikan Foto Utama</Button>
                            </ButtonGroup>
                        </Col>
                    }
                </Row>
            </Footer>
        </TrayFull >
    )
}

export default ModalEditImage;