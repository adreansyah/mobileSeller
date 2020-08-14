import React from 'react'
import ErrorEmptySearch from 'assets/images/error-empty-search.png'
import ErrorEmpty from 'assets/images/error-empty.png'
import { Text, Container, Row, Col } from '@elevenia/master-ui/components/Atom'

const ErrorBlock = ({ errOnSearch }) => {
    return (
        <Container pt={48} className="u-tx-center">
            <Row>
                <Col>
                    <img src={errOnSearch ? ErrorEmptySearch : ErrorEmpty} alt={'Empty Result'} />
                </Col>
            </Row>
            <Row pt={8}>
                <Col>
                    <Text H20 fontWeight="bold" color="black70">
                        {errOnSearch ? 'Produk tidak ditemukan di tab ini' : 'Tidak ada produk'}
                    </Text>
                </Col>
            </Row>
            {errOnSearch && (
                <Row pt={8}>
                    <Col>
                        <Text B14 color="black40">
                            Periksa kembali pencarian anda
                        </Text>
                    </Col>
                </Row>
            )}
        </Container>
    )
}

export default ErrorBlock
