import React, { useState } from 'react'
import { Tray, TrayHeader, TrayContent, TrayTitle } from '@elevenia/master-ui/components/Molecules'
import { Text, ButtonLink, Row, Col } from '@elevenia/master-ui/components/Atom'

const JnePickupTimeModal = ({ isOpen, onClose, onApply, selected }) => {
    const [selectedTime, setSelectedTime] = useState('')
    const handleApply = () => {
        onApply(selectedTime)
        onClose()
    }
    const handleClose = () => {
        setSelectedTime(selected)
        onClose()
    }
    return (
        <Tray
            isOpen={isOpen}
            overlayClick={() => handleClose()}
            slideDown={350}
            style={{ zIndex: 1051 }}
        >
            <TrayHeader className="u-bg-white u-tx-right u-rnd-0 u-bd-top u-bd-black30">
                <TrayTitle></TrayTitle>
                <ButtonLink
                    onClick={e => handleApply(e)}
                    disabled={!selectedTime}
                    variat="primary-alt"
                >
                    SELESAI
                </ButtonLink>
            </TrayHeader>
            <TrayContent className="u-bg-black20">
                <ul className="u-my-8 u-p-0">
                    {[...new Array(8)].map((_, index) => {
                        let value = `${13 + index}:00`
                        const checked = selectedTime === value
                        return (
                            <li key={index} onClick={() => setSelectedTime(value)}>
                                <Row p={16} className="u-tx-center">
                                    <Col>
                                        <Text H16 color={checked ? 'secondaryGreen' : 'black50'}>
                                            {value}
                                        </Text>
                                    </Col>
                                </Row>
                            </li>
                        )
                    })}
                </ul>
            </TrayContent>
        </Tray>
    )
}

export default JnePickupTimeModal
