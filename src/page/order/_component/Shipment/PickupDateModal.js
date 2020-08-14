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
import moment from 'moment'

const PickupDateModal = ({ isOpen, onClose, onApply, dates, selected }) => {
    const [selectedDate, setSelectedDate] = useState('')
    const handleApply = () => {
        onApply(selectedDate)
        onClose()
    }
    const handleClose = () => {
        setSelectedDate(selected)
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
                <HeaderBody>Pilih Tanggal Pick Up</HeaderBody>
            </Header>
            <Container>
                <ul className="u-my-8 u-p-0">
                    {dates.map((list, index) => {
                        const checked = selectedDate === list.fullDate 
                        const lastIndex = dates.length - 1
                        return (
                            <li key={index} onClick={() => setSelectedDate(list.fullDate)}>
                                <Row
                                    bg={'white'}
                                    p={16}
                                    borderBottom={index !== lastIndex && '1px solid black30'}
                                >
                                    <Col wide={9}>
                                        <Text B14 color="black70">
                                            {moment.utc(list.fullDate, 'YYYYMMDD').format(
                                                'ddd, DD MMMM YYYY',
                                            )}
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
                            disabled={!selectedDate.length}
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

export default PickupDateModal
