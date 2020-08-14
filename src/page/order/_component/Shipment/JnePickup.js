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
import { submitResiJNEPickup, getJNEPickupDate } from 'store/actions/orderShip'
import moment from 'moment'
import PickupDateModal from './PickupDateModal'
import JnePickupVehicleModal from './JnePickupVehicleModal'
import JnePickupTimeModal from './JnePickupTimeModal'

const JnePickup = ({
    isOpen,
    onClose,
    selectedOrder,
    orderShip,
    submitResiJNEPickup,
    getJNEPickupDate,
}) => {
    const [pickupDate, setPickupDate] = useState('')
    const [pickupTime, setPickupTime] = useState('')
    const [vehicle, setVehicle] = useState('')

    const [pickupDateModal, setPickupDateModal] = useState(false)
    const [pickupTimeModal, setPickupTimeModal] = useState(false)
    const [vehicleModal, setVehicleModal] = useState(false)
    useEffect(() => {
        if (!isOpen) {
            setPickupDate('')
            setPickupTime('')
            setVehicle('')
            validateFormClear('form-jne-pickup')
        }
        if (isOpen) {
            getJNEPickupDate({
                orderId: selectedOrder.orderId,
                deliveryId: selectedOrder.deliveryId,
            })
        }
    }, [isOpen, selectedOrder, getJNEPickupDate])

    const handleSubmit = e => {
        e.preventDefault()
        if (validateForm('form-jne-pickup', true, false)) {
            const body = {
                orderId: selectedOrder.orderId,
                deliveryId: selectedOrder.deliveryId,
                pickupDate: pickupDate,
                pickupTime: pickupTime,
                vehicleMode: vehicle,
            }
            submitResiJNEPickup(body)
            orderShip.submitResi.isLoading === false && onClose()
        }
    }
    const formattedDate = pickupDate
        ? moment(pickupDate, 'YYYYMMDD').format('ddd, DD MMMM YYYY')
        : ''
    const rangePickupDateEnd = orderShip.jnePickupDate.data.length
        ? moment(
              orderShip.jnePickupDate.data[orderShip.jnePickupDate.data.length - 1].fullDate,
              'YYYYMMDD',
          ).format('DD/MM/YYYY')
        : '...'
    const disabled = pickupDate === '' || pickupTime === '' || vehicle === ''
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
                                - Batas terakhir request pick up adalah tanggal {rangePickupDateEnd}
                                .
                                <br />- Pengajuan request pick up yang dilakukan setelah jam 10:00
                                akan diproses pada hari kerja selanjutnya.
                            </AlertBox>
                        </Col>
                    </Row>
                    <Row bg="white" p={16}>
                        <Col>
                            <form id="form-jne-pickup">
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
                                <FormControl
                                    label="WAKTU PICK UP"
                                    model="static"
                                    className="u-mt-16"
                                >
                                    <Textfield
                                        model="line"
                                        inputProps={{
                                            onChange: () => {
                                                return
                                            },
                                            value: pickupTime,
                                            placeholder: 'Pilih waktu pick up',
                                            type: 'text',
                                            name: 'pickupTime',
                                            className: 'validate[required]',
                                            readOnly: true,
                                            onFocus: e => e.target.blur(),
                                            onClick: () => setPickupTimeModal(true),
                                        }}
                                        right={
                                            <Icon
                                                name={'chevron-down'}
                                                size={24}
                                                fillColor="black50"
                                            />
                                        }
                                    />
                                </FormControl>
                                <FormControl
                                    label="JENIS KENDARAAN"
                                    model="static"
                                    className="u-mt-16"
                                >
                                    <Textfield
                                        model="line"
                                        inputProps={{
                                            onChange: () => {
                                                return
                                            },
                                            value: vehicle,
                                            placeholder: 'Pilih jenis kendaraan',
                                            type: 'text',
                                            name: 'vehicle',
                                            className: 'validate[required]',
                                            readOnly: true,
                                            onFocus: e => e.target.blur(),
                                            onClick: () => setVehicleModal(true),
                                        }}
                                        right={
                                            <Icon
                                                name={'chevron-down'}
                                                size={24}
                                                fillColor="black50"
                                            />
                                        }
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
                dates={orderShip.jnePickupDate.data}
                selected={pickupDate}
            />
            <JnePickupVehicleModal
                isOpen={vehicleModal}
                onClose={() => setVehicleModal(false)}
                onApply={value => setVehicle(value)}
                selected={vehicle}
            />
            <JnePickupTimeModal
                isOpen={pickupTimeModal}
                onClose={() => setPickupTimeModal(false)}
                onApply={value => setPickupTime(value)}
                selected={pickupTime}
            />
        </>
    )
}
const mapStateToProps = ({ orderShip }) => ({
    orderShip,
})
const mapDispatchToProps = {
    submitResiJNEPickup,
    getJNEPickupDate,
}
export default connect(mapStateToProps, mapDispatchToProps)(JnePickup)
