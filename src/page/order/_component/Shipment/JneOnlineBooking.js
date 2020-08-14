import React from 'react'
import { connect } from 'react-redux'
import {
    ModalLite,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from '@elevenia/master-ui/components/Molecules'
import { Text, ButtonGroup, Button } from '@elevenia/master-ui/components/Atom'
import { submitResiJOB } from 'store/actions/orderShip'

const JneOnlineBooking = ({ isOpen, onClose, selectedOrder, orderShip, submitResiJOB }) => {
    const handleSubmit = e => {
        e.preventDefault()
        const body = {
            orderId: selectedOrder.orderId,
            deliveryId: selectedOrder.deliveryId,
            courier: selectedOrder.courier
        }
        submitResiJOB(body)
        orderShip.submitResi.isLoading === false && onClose()
    }
    return (
        <ModalLite isOpen={isOpen} toggle={() => onClose()} backdrop="static">
            <ModalHeader>
                <ModalTitle className="u-tx-center">JNE Online Booking</ModalTitle>
            </ModalHeader>
            <ModalBody className="u-tx-center">
                <Text B14 color="black50">
                    Dengan JOB, Anda tidak perlu memasukkan nomor resi pengiriman.
                </Text>
                <Text B14 color="black50" className="u-pb-12">
                    Lanjutkan proses pengiriman barang dengan JOB?
                </Text>
            </ModalBody>
            <ModalFooter>
                <ButtonGroup responsive space={8}>
                    <Button size="medium" variant="secondary" onClick={() => onClose()}>
                        BATAL
                    </Button>
                    <Button size="medium" variant="primary-alt" onClick={e => handleSubmit(e)}>
                        YA
                    </Button>
                </ButtonGroup>
            </ModalFooter>
        </ModalLite>
    )
}
const mapStateToProps = ({ orderShip }) => ({
    orderShip,
})
const mapDispatchToProps = { submitResiJOB }
export default connect(mapStateToProps, mapDispatchToProps)(JneOnlineBooking)
