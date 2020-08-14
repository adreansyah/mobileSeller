import React from 'react'
import ErrorEmpty from 'assets/images/error-empty.png'
import { Text, Container, Row, Col } from '@elevenia/master-ui/components/Atom'

const ErrorData = () => {
    return (
        <Container pt={48} className="u-tx-center">
            <Row>
                <Col>
                    <img src={ErrorEmpty} alt={'Empty Result'} />
                </Col>
            </Row>
            <Row pt={8}>
                <Col>
                    <Text H20 fontWeight="bold" color="black70">
                        Tidak ada Data
                    </Text>
                </Col>
            </Row>
        </Container>
    )
}

export default ErrorData;
