import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
    Tray,
    TrayHeader,
    TrayContent,
    TrayTitle,
    TrayFooter,
} from '@elevenia/master-ui/components/Molecules'
import {
    Text,
    Row,
    Col,
    Container,
    AlertBox,
    ButtonGroup,
    Button,
    Segment,
    Spinner,
} from '@elevenia/master-ui/components/Atom'
import { getEleveniaDropOffAddress, submitResiEleveniaExpress } from 'store/actions/orderShip'
import moment from 'moment'

const EleveniaDropOff = ({
    isOpen,
    onClose,
    selectedOrder,
    orderShip,
    getEleveniaDropOffAddress,
    submitResiEleveniaExpress,
}) => {
    const [initial, setInitial] = useState(false)
    const handleSubmit = async () => {
        const body = {
            orderId: selectedOrder.orderId,
            deliveryId: selectedOrder.deliveryId,
            serviceType: selectedOrder.sellerServiceType,
            pickupTime: moment().format('HH:mm'),
            pickupDate: moment().format('YYYYMMDD'),
        }
        setInitial(false)
        if (orderShip.submitResi.isLoading === false) {
            await submitResiEleveniaExpress(body)
            onClose()
        }
    }
    /**
     * Check AWB for first Open
     */
    const checkAWB = () => {
        setInitial(true)
        selectedOrder.preAWB === null
            ? getEleveniaDropOffAddress({ deliveryId: selectedOrder.deliveryId })
            : handleSubmit()
    }
    /**
     * Effect for first open
     */
    useEffect(() => {
        if (isOpen && !initial) {
            checkAWB()
        }
    })

    return (
        <Tray isOpen={isOpen} overlayClick={() => onClose()}>
            <TrayHeader>
                <TrayTitle>Elevenia Express (Drop Off)</TrayTitle>
            </TrayHeader>
            <TrayContent>
                <Container p={16}>
                    <Row>
                        <Col>
                            <AlertBox type="warning" className="u-wd-full">
                                Mohon pastikan bahwa ukuran paket setelah dikemas tidak melebihi
                                loker ukuran L = 31 cm (H) x 48 cm (W)
                            </AlertBox>
                        </Col>
                    </Row>
                    {orderShip.eleveniaDropOff.isLoading ? (
                        <Row PT={16}>
                            <Col>
                                <Segment
                                    key={0}
                                    width="100%"
                                    height={40}
                                    py={5}
                                    className="u-tx-center"
                                >
                                    <Spinner />
                                </Segment>
                            </Col>
                        </Row>
                    ) : (
                        orderShip.eleveniaDropOff.data && (
                            <Row pt={16}>
                                <Col>
                                    <Text P12 color="black50" className="u-mb-8">
                                        LOKASI LOKER
                                    </Text>
                                    <Text B14 color="black70">
                                        {orderShip.eleveniaDropOff.data.sellerLockerAddress}
                                    </Text>
                                </Col>
                            </Row>
                        )
                    )}
                </Container>
            </TrayContent>
            <TrayFooter>
                <ButtonGroup responsive space={8}>
                    <Button size="medium" variant="secondary" onClick={() => onClose()}>
                        BATAL
                    </Button>
                    <Button size="medium" variant="primary-alt" onClick={e => handleSubmit(e)}>
                        PROSES DROP OFF
                    </Button>
                </ButtonGroup>
            </TrayFooter>
        </Tray>
    )
}
const mapStateToProps = ({ orderShip }) => ({
    orderShip,
})
const mapDispatchToProps = {
    getEleveniaDropOffAddress,
    submitResiEleveniaExpress,
}
export default connect(mapStateToProps, mapDispatchToProps)(EleveniaDropOff)
