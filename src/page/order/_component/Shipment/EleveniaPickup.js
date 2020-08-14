import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
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
import { validateForm, validateFormClear } from 'helper'
import { submitResiEleveniaExpress, getEleveniaPickupDate } from 'store/actions/orderShip'
import moment from 'moment'
import PickupDateModal from './PickupDateModal'

const EleveniaPickup = ({
    isOpen,
    onClose,
    selectedOrder,
    orderShip,
    submitResiEleveniaExpress,
    getEleveniaPickupDate,
}) => {
    const [pickupDate, setPickupDate] = useState('')
    const [pickupDateModal, setPickupDateModal] = useState(false)
    useEffect(() => {
        if (!isOpen) {
            setPickupDate('')
            validateFormClear('form-elevenia-pickup')
        }
        if (isOpen) {
            getEleveniaPickupDate({
                orderId: selectedOrder.orderId,
                deliveryId: selectedOrder.deliveryId,
                serviceType: selectedOrder.sellerServiceType,
                pickupTime: selectedOrder.pickupTime,
            })
        }
    }, [isOpen, selectedOrder, getEleveniaPickupDate])

    const handleSubmit = e => {
        e.preventDefault()
        if (validateForm('form-elevenia-pickup', true, false)) {
            const body = {
                orderId: selectedOrder.orderId,
                deliveryId: selectedOrder.deliveryId,
                serviceType: selectedOrder.sellerServiceType,
                pickupTime: selectedOrder.pickupTime,
                pickupDate: pickupDate,
            }
            submitResiEleveniaExpress(body)
            orderShip.submitResi.isLoading === false && onClose()
        }
    }
    const formattedDate = pickupDate
        ? moment(pickupDate, 'YYYYMMDD').format('ddd, DD MMMM YYYY')
        : ''
    let rangePickupDate = orderShip.eleveniaPickupDate.data
    const rangePickupDateEnd = rangePickupDate.length
        ? moment(rangePickupDate[rangePickupDate.length - 1].fullDate, 'YYYYMMDD').format(
              'DD/MM/YYYY',
          )
        : '...'
    const pickupTimeEnd = rangePickupDate.length
        ? rangePickupDate[rangePickupDate.length - 1].time
        : '...'
    const disabled = pickupDate === ''
    return (
        <>
            <TrayFull isOpen={isOpen} className="u-bg-white">
                <Header fixed border>
                    <HeaderLeft>
                        <ButtonLink onClick={() => onClose()}>
                            <Icon name={'arrow-left'} size={24} fillColor="black70" />
                        </ButtonLink>
                    </HeaderLeft>
                    <HeaderBody>Request Pick Up</HeaderBody>
                </Header>
                <Container>
                    <Row bg="black20" p={16}>
                        <Col>
                            <AlertBox type="warning">
                                - Batas pengambilan barang adalah tanggal {rangePickupDateEnd} Pukul{' '}
                                {pickupTimeEnd}.
                                <br />- Apabila tidak ada pengambilan barang sebelum waktu yang
                                telah ditentukan, pesanan akan dibatalkan otomatis oleh sistem.
                            </AlertBox>
                        </Col>
                    </Row>
                    <Row bg="white" p={16}>
                        <Col>
                            <form id="form-elevenia-pickup">
                                <FormControl label="TANGGAL PICK UP" model="static">
                                    <Textfield
                                        model="line"
                                        inputProps={{
                                            onChange: () => {
                                                return
                                            },
                                            value: formattedDate,
                                            placeholder: 'Pilih tanggal pick up',
                                            type: 'text',
                                            name: 'pickupDate',
                                            className: 'validate[required]',
                                            readOnly: true,
                                            onFocus: e => e.target.blur(),
                                            onClick: () => setPickupDateModal(true),
                                        }}
                                        right={<Icon name={'date'} size={24} fillColor="black50" />}
                                    />
                                </FormControl>
                            </form>
                        </Col>
                    </Row>
                </Container>
                <Footer fixed border>
                    <FooterBody>
                        <ButtonGroup responsive>
                            <Button
                                type="button"
                                variant="primary-alt"
                                disabled={disabled}
                                onClick={e => handleSubmit(e)}
                            >
                                OK
                            </Button>
                        </ButtonGroup>
                    </FooterBody>
                </Footer>
            </TrayFull>
            <PickupDateModal
                isOpen={pickupDateModal}
                onClose={() => setPickupDateModal(false)}
                onApply={value => setPickupDate(value)}
                dates={orderShip.eleveniaPickupDate.data}
                selected={pickupDate}
            />
        </>
    )
}
const mapStateToProps = ({ orderShip }) => ({
    orderShip,
})
const mapDispatchToProps = {
    submitResiEleveniaExpress,
    getEleveniaPickupDate,
}
export default connect(mapStateToProps, mapDispatchToProps)(EleveniaPickup)
