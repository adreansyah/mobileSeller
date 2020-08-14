import React, { useState } from 'react'
import {
    Header,
    HeaderLeft,
    HeaderBody,
    Footer,
    FooterBody,
} from '@elevenia/master-ui/components/Organisms/Mobile'
import { TrayFull } from '@elevenia/master-ui/components/Molecules'
import {
    Text,
    Button,
    ButtonGroup,
    ButtonLink,
    Icon,
    Row,
    Col,
    Container,
} from '@elevenia/master-ui/components/Atom'

const JnePickupVehicleModal = ({ isOpen, onClose, onApply, selected }) => {
    const [vehicle] = useState([
        { name: 'Motor', value: 'Motor' },
        { name: 'Mobil', value: 'Mobil' },
        { name: 'Truk', value: 'Truck' },
    ])
    const [selectedVehicle, setSelectedVehicle] = useState('')
    const handleApply = () => {
        onApply(selectedVehicle)
        onClose()
    }
    const handleClose = () => {
        setSelectedVehicle(selected)
        onClose()
    }
    return (
        <TrayFull isOpen={isOpen} className="u-bg-white">
            <Header fixed border>
                <HeaderLeft>
                    <ButtonLink onClick={() => handleClose()}>
                        <Icon name={'arrow-left'} size={24} fillColor="black70" />
                    </ButtonLink>
                </HeaderLeft>
                <HeaderBody>Jenis Kendaraan</HeaderBody>
            </Header>
            <Container>
                <ul className="u-my-8 u-p-0">
                    {vehicle.map((list, index) => {
                        const checked = selectedVehicle === list.value
                        const lastIndex = vehicle.length - 1
                        return (
                            <li key={index} onClick={() => setSelectedVehicle(list.value)}>
                                <Row
                                    bg={'white'}
                                    p={16}
                                    borderBottom={index !== lastIndex && '1px solid black30'}
                                >
                                    <Col wide={9}>
                                        <Text B14 color="black70">
                                            {list.name}
                                        </Text>
                                    </Col>
                                    <Col wide={3} className="u-tx-right" style={{ height: '16px' }}>
                                        {checked && (
                                            <Icon name="check" size="16" fillColor="success" />
                                        )}
                                    </Col>
                                </Row>
                            </li>
                        )
                    })}
                </ul>
            </Container>
            <Footer fixed border>
                <FooterBody>
                    <ButtonGroup responsive>
                        <Button
                            type="button"
                            variant="primary-alt"
                            disabled={!selectedVehicle}
                            onClick={e => handleApply(e)}
                        >
                            OK
                        </Button>
                    </ButtonGroup>
                </FooterBody>
            </Footer>
        </TrayFull>
    )
}

export default JnePickupVehicleModal
