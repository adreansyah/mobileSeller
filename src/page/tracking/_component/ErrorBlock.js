import React from 'react'
import ErrorEmpty from 'assets/images/error-empty.png'
import { Text, Container, Row, Col } from '@elevenia/master-ui/components/Atom'

const ErrorBlock = () => {
    return (
        <Container py={48} className="u-tx-center" bg="white">
            <Row>
                <Col>
                    <img src={ErrorEmpty} alt={'Empty Result'} />
                </Col>
            </Row>
            <Row pt={8}>
                <Col>
                    <Text H20 fontWeight="bold" color="black70">
                        Belum Ada status Pengiriman
                    </Text>
                </Col>
            </Row>
            <Row pt={8}>
                <Col>
                    <Text B14 color="black40">
                        Periksa kembali nomor atau pengiriman anda
                    </Text>
                </Col>
            </Row>
        </Container>
    )
}

export default ErrorBlock
