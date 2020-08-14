import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
    Text,
    Button,
    ButtonGroup,
    ButtonLink,
    Icon,
    Row,
    Col,
    Textfield,
    Container,
    FormControl,
    AlertBox,
} from '@elevenia/master-ui/components/Atom'
import {
    Header,
    HeaderLeft,
    HeaderBody,
    Footer,
    FooterBody,
} from '@elevenia/master-ui/components/Organisms/Mobile'
import { TrayFull } from '@elevenia/master-ui/components/Molecules'
import { validateInput, validateForm, validateFormClear } from 'helper'
import { submitResiJNERegular } from 'store/actions/orderShip'

const JneRegular = ({ isOpen, onClose, selectedOrder, orderShip, submitResiJNERegular }) => {
    const [dataInput, setDataInput] = useState({
        noResi: '',
    })
    useEffect(() => {
        if (!isOpen) {
            setDataInput({
                noResi: '',
            })
            validateFormClear('form-jne-reg')
        }
    }, [isOpen])
    const handleFormChange = e => {
        const { name, value } = e.target
        setDataInput(setDataInput => ({
            ...setDataInput,
            [name]: value,
        }))
        validateInput('form-jne-reg', name)
    }
    const handleSubmit = e => {
        e.preventDefault()
        if (validateForm('form-jne-reg', true, false)) {
            const body = {
                deliveryId: selectedOrder.deliveryId,
                awb: dataInput.noResi,
                orderStatus: selectedOrder.orderStatus,
                courier: selectedOrder.courier,
            }
            submitResiJNERegular(body, selectedOrder.orderStatus)
            orderShip.submitResi.isLoading === false && onClose()
        }
    }
    return (
        <>
            <TrayFull isOpen={isOpen} className="u-bg-white">
                <Header fixed border>
                    <HeaderLeft>
                        <ButtonLink onClick={() => onClose()}>
                            <Icon name={'arrow-left'} size={24} fillColor="black70" />
                        </ButtonLink>
                    </HeaderLeft>
                    <HeaderBody>Nomor Resi</HeaderBody>
                </Header>
                {selectedOrder && (
                    <Container>
                        {selectedOrder.orderStatus === 'SENT' && (
                            <Row bg="black20" p={16}>
                                <Col>
                                    <AlertBox type="warning">
                                        Perubahan nomor resi pengiriman hanya bisa dilakukan 1
                                        (satu) kali. Pastikan Anda memasukkan nomor resi pengiriman
                                        dengan benar untuk mencegah pengurangan seller score
                                        sebanyak -5
                                    </AlertBox>
                                </Col>
                            </Row>
                        )}
                        <Row bg="white" p={16}>
                            <Col>
                                <Text B12 color="black50" fontWeight="500">
                                    NO PESANAN
                                </Text>
                                <Text B14 color="black50">
                                    {selectedOrder.orderId}
                                </Text>
                            </Col>
                            <Col className="u-tx-right">
                                <Text B12 color="black50" fontWeight="500">
                                    PENGIRIMAN
                                </Text>
                                <Text B14 color="black50">
                                    {selectedOrder.courierName}
                                </Text>
                            </Col>
                        </Row>
                        <Row bg="black20" py={4}></Row>
                        <Row bg="white" p={16}>
                            <Col>
                                <form id="form-jne-reg" onSubmit={e => e.preventDefault()}>
                                    <FormControl label="NOMOR RESI" model="static">
                                        <Textfield
                                            model="line"
                                            inputProps={{
                                                onChange: e => handleFormChange(e),
                                                value: dataInput.noResi,
                                                placeholder: 'Ketik nomor resi',
                                                type: 'text',
                                                name: 'noResi',
                                                className: 'validate[required,minLength[14]]',
                                            }}
                                            right={
                                                <Icon name={'scan'} size={24} fillColor="black50" />
                                            }
                                        />
                                    </FormControl>
                                </form>
                            </Col>
                        </Row>
                    </Container>
                )}
                <Footer fixed border>
                    <FooterBody>
                        <ButtonGroup responsive>
                            <Button
                                type="submit"
                                variant="primary-alt"
                                disabled={!validateForm('form-jne-reg') || !dataInput.noResi.length}
                                onClick={e => handleSubmit(e)}
                            >
                                OK
                            </Button>
                        </ButtonGroup>
                    </FooterBody>
                </Footer>
            </TrayFull>
        </>
    )
}
const mapStateToProps = ({ orderShip }) => ({
    orderShip,
})
const mapDispatchToProps = {
    submitResiJNERegular,
}
export default connect(mapStateToProps, mapDispatchToProps)(JneRegular)
