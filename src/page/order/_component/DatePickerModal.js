import React, { useState, useEffect } from 'react'
import { TrayFull, Tabs } from '@elevenia/master-ui/components/Molecules'
import { Header, HeaderLeft, HeaderBody } from '@elevenia/master-ui/components/Organisms/Mobile'
import {
    ButtonLink,
    Icon,
    Container,
    Segment,
    Row,
    Col,
    Calendar,
} from '@elevenia/master-ui/components/Atom'
// import moment from 'moment'

const DatePickerModal = ({ tabsOpen, onApply, onClose, dates }) => {
    const [activeTab, setActiveTab] = useState(tabsOpen ? tabsOpen : 'startDate')
    const [date, setDate] = useState({ startDate: dates.startDate, endDate: dates.endDate })
    const handleChangeDate = (name, value) => {
        setDate({ ...date, [name]: new Date(value) })
        onApply({ ...date, [name]: new Date(value) })
        onClose()
    }
    const handleClose = () => {
        setDate({ startDate: dates.startDate, endDate: dates.endDate })
        onClose()
    }
    useEffect(() => {
        setActiveTab(tabsOpen ? tabsOpen : 'startDate')
    }, [tabsOpen])
    return (
        <TrayFull isOpen={tabsOpen !== '' ? true : false}>
            <Header fixed border>
                <HeaderLeft>
                    <ButtonLink onClick={() => handleClose()}>
                        <Icon name="cancel" size="24" fillColor="black50" />
                    </ButtonLink>
                </HeaderLeft>
                <HeaderBody>Pilih Tanggal</HeaderBody>
            </Header>
            <Segment bg="white" py={8}>
                <Tabs active={activeTab} onChange={key => setActiveTab(key)} underlineSize={2}>
                    <div key={'startDate'}>Dari</div>
                    <div key={'endDate'}>Sampai</div>
                </Tabs>
            </Segment>
            <Container bg="white">
                <Row>
                    <Col>
                        {activeTab === 'startDate' ? (
                            <Calendar
                                placeholderText="Masukkan tanggal"
                                selected={date.startDate}
                                shouldCloseOnSelect={false}
                                onChange={data => handleChangeDate('startDate', data)}
                                calendarClassName="calendar-full"
                                maxDate={date.endDate ? new Date(date.endDate) : new Date()}
                            />
                        ) : (
                            <Calendar
                                placeholderText="Masukkan tanggal"
                                selected={date.endDate}
                                shouldCloseOnSelect={false}
                                onChange={data => handleChangeDate('endDate', data)}
                                calendarClassName="calendar-full"
                                minDate={date.startDate ? new Date(date.startDate) : null}
                                maxDate={new Date()}
                            />
                        )}
                    </Col>
                </Row>
            </Container>
        </TrayFull>
    )
}

export default DatePickerModal
