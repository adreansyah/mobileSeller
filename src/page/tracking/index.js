import React, { useState, useEffect } from 'react'
import { Header, HeaderLeft, HeaderBody } from '@elevenia/master-ui/components/Organisms/Mobile'
import {
    ButtonLink,
    Icon,
    Container,
    Row,
    Col,
    Text,
    Segment,
    Spinner,
} from '@elevenia/master-ui/components/Atom'
import { getTracking, clearTracking } from 'store/actions/tracking'
import { connect } from 'react-redux'
import ErrorBlock from './_component/ErrorBlock'
import Tracker, { TrackerPoint } from './_component/Tracker'

const TrackingPage = props => {
    const { match, getTracking, clearTracking, tracking, setAlerts } = props
    const [initial, setInitial] = useState(false)
    useEffect(() => {
        const params = { deliveryId: match.params.trackingId }
        if (!initial) {
            getTracking(match.params.courier, params)
            setInitial(true)
        }
    }, [match.params.courier, match.params.trackingId, initial, getTracking])
    useEffect(() => {
        return () => {
            clearTracking()
        }
    }, [clearTracking])
    return (
        <>
            {setAlerts.alert.status && setAlerts.alert.componentMessage}
            <Header fixed>
                <HeaderLeft>
                    <ButtonLink onClick={() => props.history.goBack()}>
                        <Icon fillColor="black50" name="arrow-left" size={24} />
                    </ButtonLink>
                </HeaderLeft>
                <HeaderBody>Lacak Pengiriman</HeaderBody>
            </Header>
            {!tracking.isLoaded ? (
                <Segment width="100%" height={30} py={5} className="u-tx-center">
                    <Spinner />
                </Segment>
            ) : tracking.data ? (
                <>
                    <Container>
                        <Row px={16} pb={8} pt={16}>
                            <Col>
                                <Text H14>Informasi Pesanan</Text>
                            </Col>
                        </Row>
                    </Container>
                    <Container bg="white">
                        <Row pl={16} pt={16} pb={8}>
                            <Col borderBottom="1px solid black30" pb={12} pr={16}>
                                <Text B10 color="black50">
                                    NOMOR PESANAN
                                </Text>
                                <Text B14 color="black70">
                                    {tracking.data.orderId}
                                </Text>
                            </Col>
                        </Row>
                        <Row pl={16} py={8}>
                            <Col borderBottom="1px solid black30" pb={12} pr={16}>
                                <Text B10 color="black50">
                                    METODE PENGIRIMAN
                                </Text>
                                <Text B14 color="black70">
                                    {tracking.data.courierName}
                                </Text>
                            </Col>
                        </Row>
                        <Row pl={16} py={8}>
                            <Col borderBottom="1px solid black30" pb={12} pr={16}>
                                <Text B10 color="black50">
                                    NOMOR RESI/PENGIRIMAN
                                </Text>
                                <Text B14 color="black70">
                                    {tracking.data.invoiceNumber}
                                </Text>
                            </Col>
                        </Row>
                        <Row pl={16} py={8}>
                            <Col borderBottom="1px solid black30" pb={12} pr={16}>
                                <Text B10 color="black50">
                                    NOMOR PRE-AWB
                                </Text>
                                <Text B14 color="black70">
                                    {tracking.data.preInvoiceNumber}
                                </Text>
                            </Col>
                        </Row>
                        <Row pl={16} py={8}>
                            <Col borderBottom="1px solid black30" pb={12} pr={16}>
                                <Text B10 color="black50">
                                    ALAMAT PENGIRIMAN
                                </Text>
                                <Text B14 color="black70">
                                    {tracking.data.address}
                                </Text>
                            </Col>
                        </Row>
                        <Row pl={16} py={8}>
                            <Col pb={12} pr={16}>
                                <Text B10 color="black50">
                                    TANGGAL DITERIMA
                                </Text>
                                <Text B14 color="black70">
                                    {tracking.data.receivedDate}
                                </Text>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row px={16} pb={8} pt={16}>
                            <Col>
                                <Text H14>Status Pengiriman</Text>
                            </Col>
                        </Row>
                    </Container>
                    {!tracking.data.history ? (
                        <ErrorBlock />
                    ) : (
                            <Container bg="white">
                                {tracking.data.history.map((list, index) => (
                                    <React.Fragment key={index}>
                                        <Tracker>
                                            <Row px={16} py={8}>
                                                <Col wide={3} className="u-tx-right">
                                                    <Text B12 fontWeight="500" color="black70">
                                                        {list.date}
                                                    </Text>
                                                    <Text B12 color="black70">
                                                        {list.hour}
                                                    </Text>
                                                </Col>
                                                <Col wide={1} textAlign="center"><TrackerPoint/></Col>
                                                <Col wide={8}>
                                                    <Text B12 color="black70">
                                                        {list.desc}
                                                    </Text>
                                                </Col>
                                            </Row>
                                        </Tracker>
                                    </React.Fragment>
                                ))}
                            </Container>
                        )}
                </>
            ) : (
                        <Container py={'40vh'} className="u-tx-center">
                            <Row>
                                <Col>Gagal Mengambil Data</Col>
                            </Row>
                        </Container>
                    )}
        </>
    )
}

const mapStateToProps = ({ tracking, setAlerts }) => ({
    tracking,
    setAlerts,
})

const mapDispatchToProps = {
    getTracking,
    clearTracking,
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackingPage)
