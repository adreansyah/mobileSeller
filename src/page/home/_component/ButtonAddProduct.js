import React from 'react'
import { Icon, Text, Col, Row } from '@elevenia/master-ui/components/Atom'
import styled from 'styled-components'

const FloatingButton = styled.button`
    position: fixed;
    bottom: 64px;
    display: inline-flex;
    align-items: center;
    height: 40px;
    padding: 8px 16px;
    border: 1px solid ${props => props.theme.color.black30};
    border-radius: 20px;
    margin: auto;
    box-shadow: ${props => props.theme.shadowHover};
    background-color: ${props => props.theme.color.white};
    color: ${props => props.theme.color.black50};
    &:active {
        box-shadow: ${props => props.theme.shadowDefaultAction};
    }
    &:hover {
        box-shadow: ${props => props.theme.shadowHover};
        color: ${props => props.theme.color.black40};
    }
`
const ButtonAddProduct = props => {
    return (
        <Row>
            <Col justifyContent="center">
                <FloatingButton>
                    <Icon name="plus" size="24" fillColor="black50" />
                    <Text P14 fontWeight="500" ml={8}>
                        TAMBAH PRODUK
                    </Text>
                </FloatingButton>
            </Col>
        </Row>
    )
}

export default ButtonAddProduct
