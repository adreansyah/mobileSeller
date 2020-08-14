import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
    Tray,
    TrayHeader,
    TrayContent,
    TrayTitle,
    TrayFooter,
    ModalLite,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from '@elevenia/master-ui/components/Molecules'
import {
    Text,
    Row,
    Col,
    Container,
    ButtonGroup,
    Button,
    Segment,
    Spinner,
} from '@elevenia/master-ui/components/Atom'
import {
    getGojekPickupAddress,
    submitResiGojek,
    clearGojekPickupAddress,
    clearSubmitResiGojek,
} from 'store/actions/orderShip'

const GojekPickup = ({
    isOpen,
    onClose,
    selectedOrder,
    orderShip,
    getGojekPickupAddress,
    submitResiGojek,
    clearGojekPickupAddress,
    clearSubmitResiGojek,
}) => {
    const [initial, setInitial] = useState(false)
    const handleSubmit = async () => {
        const body = {
            orderId: selectedOrder.orderId,
            deliveryId: selectedOrder.deliveryId,
        }
        setInitial(false)
        if (orderShip.submitResi.isLoading === false) {
            await submitResiGojek(body)
            onClose()
        }
    }
    /**
     * Check AWB for first Open
     */
    const checkAWB = () => {
        setInitial(true)
        selectedOrder.preAWB === null
            ? getGojekPickupAddress({ deliveryId: selectedOrder.deliveryId })
            : handleSubmit()
    }
    /**
     * Effect for first Open
     */
    useEffect(() => {
        if (isOpen && !initial) {
            checkAWB()
        }
    })
    /**
     * Effect for get gojek pickup error
     */
    useEffect(() => {
        if (isOpen && orderShip.gojekPickup.isError) {
            setInitial(false)
            onClose()
            return () => {
                clearGojekPickupAddress()
            }
        }
    }, [isOpen, orderShip.gojekPickup.isError, onClose, clearGojekPickupAddress])
    /**
     * Open Modal if submit gojek resi want retry
     */
    if (orderShip.submitResiGojek.isRetry) {
        return (
            <ModalLite
                isOpen={orderShip.submitResiGojek.isRetry}
                toggle={() => onClose()}
                backdrop="static"
            >
                <ModalHeader>
                    <ModalTitle className="u-tx-center">Retry Pick Up: GO-JEK</ModalTitle>
                </ModalHeader>
                <ModalBody className="u-tx-center">
                    {orderShip.submitResiGojek.content.map((list, index) => (
                        <React.Fragment key={index}>
                            <Text B14 color="black50" className="u-pb-12">
                                {list}
                            </Text>
                        </React.Fragment>
                    ))}
                </ModalBody>
                <ModalFooter>
                    <ButtonGroup responsive space={8}>
                        <Button
                            size="medium"
                            variant="primary-alt"
                            onClick={() => {
                                clearSubmitResiGojek()
                                onClose()
                            }}
                        >
                            OK
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalLite>
        )
    }
    /**
     * Open Tray for first time
     */
    return (
        <Tray isOpen={isOpen} overlayClick={() => onClose()}>
            <TrayHeader>
                <TrayTitle>GO-JEK</TrayTitle>
            </TrayHeader>
            <TrayContent>
                {orderShip.gojekPickup.isLoading ? (
                    <Container p={16}>
                        <Row>
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
                    </Container>
                ) : (
                    orderShip.gojekPickup.data && (
                        <Container p={16}>
                            <Row>
                                <Col>
                                    <Text P12 color="black50" className="u-mb-8">
                                        LOKASI PICK UP
                                    </Text>
                                    <Text B14 color="black70">
                                        {orderShip.gojekPickup.data.address}
                                    </Text>
                                </Col>
                            </Row>
                        </Container>
                    )
                )}
            </TrayContent>
            <TrayFooter>
                <ButtonGroup responsive space={4}>
                    <Button
                        size="medium"
                        variant={!orderShip.gojekPickup.data ? 'primary-alt' : 'secondary'}
                        onClick={() => onClose()}
                        disabled={!orderShip.gojekPickup.data}
                    >
                        BATAL
                    </Button>
                    <Button
                        size="medium"
                        variant="primary-alt"
                        onClick={e => handleSubmit(e)}
                        disabled={!orderShip.gojekPickup.data}
                    >
                        REQUEST PICK UP
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
    getGojekPickupAddress,
    submitResiGojek,
    clearGojekPickupAddress,
    clearSubmitResiGojek,
}
export default connect(mapStateToProps, mapDispatchToProps)(GojekPickup)
