import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { TrayFull } from '@elevenia/master-ui/components/Molecules'
import {
    RadioButton,
    ButtonLink,
    Icon,
    Switch,
    Button,
    Text,
    Row,
    Col,
    Container,
    Segment,
    Spinner,
    Textfield,
    FormControl,
} from '@elevenia/master-ui/components/Atom'
import { getCourier } from 'store/actions/order'
import moment from 'moment'
import {
    Header,
    HeaderLeft,
    HeaderBody,
    HeaderRight,
    Footer,
} from '@elevenia/master-ui/components/Organisms/Mobile'
import DatePickerModal from './DatePickerModal'

const FilterModal = ({ isOpen, params, onClose, onFilter, activeTabs, ...props }) => {
    const { order, getCourier } = props
    /**
     * Date Section
     */
    const [date, setDate] = useState({
        startDate: params.startDate ? new Date(params.startDate) : null,
        endDate: params.endDate ? new Date(params.endDate) : null,
    })
    const [datePickerOpen, setDatePickerOpen] = useState('')
    /**
     * Order Status Section
     */
    const [selectedOrderStatus, setSelectedOrderStatus] = useState(params.orderStatus)
    /**
     * Courier Section
     */
    const [isPickup, setIsPickup] = useState(params.isPickup)
    const [selectedCourier, setSelectedCourier] = useState(
        params.courier ? [...params.courier] : [],
    )
    const [invalidAwb, setInvalidAwb] = useState(params.invalidAwb)
    const handleSelectPickup = prevValue => {
        setIsPickup(!prevValue)
        setSelectedCourier([])
    }
    const handleSelectCourier = value => {
        let arr = selectedCourier
        const idx = arr.indexOf(value)
        if (idx >= 0) {
            arr.splice(idx, 1)
        } else if (idx === -1) {
            arr.splice(idx, 0, value)
        }
        setSelectedCourier([...arr])
    }
    useEffect(() => {
        if (order.courier.data.length === 0) getCourier()
    }, [order.courier.data.length, getCourier])
    /**
     * Save and Reset Section
     */
    const handleApply = async () => {
        let nextParams = {
            ...params,
            orderStatus: selectedOrderStatus ? selectedOrderStatus : params.orderStatus,
            courier: selectedCourier,
            startDate: date.startDate ? moment(date.startDate).format('YYYY-MM-DD') : '',
            endDate: date.endDate ? moment(date.endDate).format('YYYY-MM-DD') : '',
            page: 0,
            isPickup,
        }
        if (typeof params.invalidAwb !== 'undefined') {
            nextParams = { ...nextParams, invalidAwb }
        }
        onFilter(nextParams)
        onClose()
    }
    const handleReset = () => {
        setIsPickup(false)
        setSelectedCourier([])
        setSelectedOrderStatus(activeTabs && activeTabs === 'new' ? 'DEFAULT_NEW_ORDER' : '')
        setDate({
            startDate: new Date(moment().subtract(1, 'months')),
            endDate: new Date(),
        })
        setInvalidAwb(false)
    }
    const handleClose = () => {
        setIsPickup(params.isPickup)
        setSelectedCourier([...params.courier])
        setSelectedOrderStatus(params.orderStatus)
        setDate({
            startDate: params.startDate ? new Date(params.startDate) : null,
            endDate: params.endDate ? new Date(params.endDate) : null,
        })
        setInvalidAwb(typeof params.invalidAwb !== 'undefined' ? params.invalidAwb : false)
        onClose()
    }
    useEffect(() => {
        setDate({
            startDate: params.startDate ? new Date(params.startDate) : null,
            endDate: params.endDate ? new Date(params.endDate) : null,
        })
        setSelectedOrderStatus(params.orderStatus)
        setSelectedCourier([...params.courier])
        setIsPickup(params.isPickup)
        setInvalidAwb(typeof params.invalidAwb !== 'undefined' ? params.invalidAwb : false)
    }, [params])

    return (
        <>
            <TrayFull isOpen={isOpen}>
                <Header fixed border>
                    <HeaderLeft>
                        <ButtonLink onClick={() => handleClose()}>
                            <Icon name="cancel" size="24" fillColor="black50" />
                        </ButtonLink>
                    </HeaderLeft>
                    <HeaderBody>Filter</HeaderBody>
                    <HeaderRight>
                        <ButtonLink
                            style={{ lineHeight: '24px', height: '24px', marginLeft: 'auto' }}
                            onClick={() => handleReset()}
                        >
                            RESET
                        </ButtonLink>
                    </HeaderRight>
                </Header>
                <Container>
                    <Row px={16} pt={24} pb={8}>
                        <Text B14 color="black70" fontWeight="500">
                            Tanggal
                        </Text>
                    </Row>
                    <Row px={16} py={24} bg="white">
                        <Col wide={12} mb={12}>
                            <FormControl label="Dari" model="static">
                                <Textfield
                                    model="line"
                                    inputProps={{
                                        value: moment(date.startDate).format('ddd, DD MMM YYYY'),
                                        onClick: () => setDatePickerOpen('startDate'),
                                        onFocus: e => e.target.blur(),
                                        readOnly: true,
                                        onChange: () => {
                                            return
                                        },
                                    }}
                                    right={<Icon name="date" size="24" fillColor="black50" />}
                                />
                            </FormControl>
                        </Col>
                        <Col wide={12}>
                            <FormControl label="Sampai" model="static">
                                <Textfield
                                    model="line"
                                    inputProps={{
                                        value: moment(date.endDate).format('ddd, DD MMM YYYY'),
                                        onClick: () => setDatePickerOpen('endDate'),
                                        onFocus: e => e.target.blur(),
                                        readOnly: true,
                                        onChange: () => {
                                            return
                                        },
                                    }}
                                    right={<Icon name="date" size="24" fillColor="black50" />}
                                />
                            </FormControl>
                        </Col>
                    </Row>
                    {/** Additional filter for New Order tab*/}
                    {activeTabs && activeTabs === 'new' && (
                        <OrderStatusFilter
                            selected={selectedOrderStatus}
                            onChange={e => setSelectedOrderStatus(e.target.value)}
                        />
                    )}
                    <Row px={16} pt={24} pb={8}>
                        <Text B14 color="black70" fontWeight="500">
                            Pengiriman
                        </Text>
                    </Row>
                    {/** Additional filter for Sent Order tab */}
                    {activeTabs && activeTabs === 'sent' && (
                        <InvalidAwbFilter
                            invalidAwb={invalidAwb}
                            onChange={() => setInvalidAwb(!invalidAwb)}
                        />
                    )}
                    <Row p={16} bg="white">
                        <Col wide={9}>
                            <Text B14 color="black70">
                                Perlu di Pickup
                            </Text>
                            <Text B12 color="black50">
                                (JNE pick up, elevenia express, GO-JEK)
                            </Text>
                        </Col>
                        <Col wide={3} className="u-tx-right">
                            <Switch
                                onChange={() => handleSelectPickup(isPickup)}
                                checked={isPickup}
                            />
                        </Col>
                    </Row>
                    {!isPickup && (
                        <ul className="u-my-8 u-p-0">
                            {order.courier.isLoaded ? (
                                order.courier.data.map((list, index) => {
                                    const checked = selectedCourier.indexOf(list.courier) > -1
                                    const lastIndex = order.courier.data.length - 1
                                    return (
                                        <React.Fragment key={index}>
                                            <CourierListBlock
                                                onClick={() => handleSelectCourier(list.courier)}
                                                name={list.courierCode}
                                                checked={checked}
                                                isLastIndex={index === lastIndex}
                                            />
                                        </React.Fragment>
                                    )
                                })
                            ) : (
                                <Segment width="100%" height={30} className="u-tx-center">
                                    <Spinner />
                                </Segment>
                            )}
                        </ul>
                    )}
                </Container>
                <Footer fixed border>
                    <Button
                        variant={'primary-alt'}
                        style={{ width: '100%' }}
                        onClick={() => handleApply()}
                    >
                        TERAPKAN
                    </Button>
                </Footer>
            </TrayFull>
            <DatePickerModal
                dates={date}
                tabsOpen={datePickerOpen}
                onClose={() => setDatePickerOpen('')}
                onApply={({ startDate, endDate }) => setDate({ startDate, endDate })}
            />
        </>
    )
}
const CourierListBlock = ({ name, checked, isLastIndex, ...props }) => {
    return (
        <li {...props}>
            <Row bg={'white'} p={16} borderBottom={!isLastIndex && '1px solid black30'}>
                <Col wide={9}>
                    <Text B14 color="black70">
                        {name}
                    </Text>
                </Col>
                <Col wide={3} className="u-tx-right" style={{ height: '16px' }}>
                    {checked && <Icon name="check" size="16" fillColor="success" />}
                </Col>
            </Row>
        </li>
    )
}

const OrderStatusFilter = ({ selected, onChange }) => {
    const items = [
        {
            label: 'Ready Stock',
            value: 'NEW_ORDER',
        },
        {
            label: 'Pre Order',
            value: 'PRE_ORDER',
        },
    ]
    return (
        <>
            <Row px={16} pt={24} pb={8}>
                <Text B14 color="black70" fontWeight="500">
                    Produk
                </Text>
            </Row>
            <Row p={16} bg="white">
                <RadioButton
                    radioProps={{
                        onChange: e => onChange(e),
                        name: 'orderStatus',
                        id: 'orderStatus',
                    }}
                    radioItems={items}
                    selected={selected}
                />
            </Row>
        </>
    )
}
const InvalidAwbFilter = ({ invalidAwb, onChange }) => {
    return (
        <>
            <Row p={16} bg="white" mb={8}>
                <Col wide={9}>
                    <Text B14 color="black70">
                        Invalid AWB/Nomor Resi
                    </Text>
                </Col>
                <Col wide={3} className="u-tx-right">
                    <Switch onChange={() => onChange(invalidAwb)} checked={invalidAwb} />
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = ({ order }) => ({
    order,
})
const mapDispatchToProps = {
    getCourier,
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterModal)
