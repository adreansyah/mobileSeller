import React, { useState, useEffect } from 'react'
import {
    Icon,
    Badge,
    ButtonGroup,
    Button,
    Text,
    Segment,
    Row,
    Col,
} from '@elevenia/master-ui/components/Atom'
import {
    ModalLite,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from '@elevenia/master-ui/components/Molecules'
import { Header, HeaderBody } from '@elevenia/master-ui/components/Organisms/Mobile'
import { Link } from 'react-router-dom'
import { trackScreenView } from 'helper/Tracker'
import styled from 'styled-components'

const ListView = styled.ul`
    background-color: white;
    overflow: hidden;
    padding-left: 16px;
`
const ListViewItem = styled.li`
    height: 48px;
    display: flex;
    align-items: center;
    position: relative;
    border-bottom: 1px solid ${props => props.theme.color.black30};
    padding-right: 16px;
    &:last-child {
        border-bottom: none;
    }
    a {
        width: 100%;
    }
`

const Sales = () => {
    const menus = [
        {
            name: 'Status Penjualan',
            icon: 'order-status',
            path: '/order',
        },
        {
            name: 'Pembatalan',
            icon: 'cancellation',
            path: null,
        },
        {
            name: 'Pengembalian',
            icon: 'return',
            path: null,
        },
        {
            name: 'Penukaran',
            icon: 'exchange',
            path: null,
        }
    ]
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        trackScreenView('Sales', 'sales-id')
    }, [])

    return (
        <div>
            <Header border fixed>
                <HeaderBody>Penjualan</HeaderBody>
            </Header>
            <Segment pt={8} pb={60}>
                <ListView>
                    {menus.map((list, index) => (
                        <ListViewItem key={index}>
                            {!list.path ? (
                                <Link to={'#'} onClick={() => setShowModal(!showModal)}>
                                    <Row alignItems="center">
                                        <Icon name={list.icon} size={24} fillColor={'black50'} />
                                        <Col ml={8}>
                                            <Text
                                                B14
                                                color="black70"
                                                style={{ verticalAlign: 'middle' }}
                                            >
                                                {list.name}
                                            </Text>
                                        </Col>
                                        <Col className="u-tx-right">
                                            <Badge bg="success">COMING SOON</Badge>
                                            <Icon
                                                name={'chevron-right'}
                                                size={18}
                                                fillColor={'black50'}
                                                style={{ verticalAlign: 'middle' }}
                                                className="u-ml-4"
                                            />
                                        </Col>
                                    </Row>
                                </Link>
                            ) : (
                                    <Link to={list.path}>
                                        <Row alignItems="center">
                                            <Icon name={list.icon} size={24} fillColor={'black50'} />
                                            <Col ml={8}>
                                                <Text
                                                    B14
                                                    color="black70"
                                                    style={{ verticalAlign: 'middle' }}
                                                >
                                                    {list.name}
                                                </Text>
                                            </Col>
                                            <Col className="u-tx-right">
                                                <Icon
                                                    name={'chevron-right'}
                                                    size={18}
                                                    fillColor={'black50'}
                                                    style={{ verticalAlign: 'middle' }}
                                                    className="u-ml-4"
                                                />
                                            </Col>
                                        </Row>
                                    </Link>
                                )}
                        </ListViewItem>
                    ))}
                </ListView>
            </Segment>
            <ModalLite isOpen={showModal} toggle={() => setShowModal(!showModal)} backdrop="static">
                <ModalHeader>
                    <ModalTitle className="u-tx-center">Perhatian</ModalTitle>
                </ModalHeader>
                <ModalBody className="u-tx-center">
                    <Text type="P1" className="u-tx-info">
                        Untuk versi ini, menu yang Anda pilih belum tersedia.
                        <br />
                        <br /> Fitur selengkapnya, kunjungi versi desktop:{' '}
                        <Text as="span" weight="500">
                            soffice.elevenia.co.id
                        </Text>
                    </Text>
                </ModalBody>
                <ModalFooter>
                    <ButtonGroup space={8} responsive>
                        <Button
                            size="medium"
                            variant="primary-alt"
                            onClick={() => setShowModal(!showModal)}
                        >
                            OK
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalLite>
        </div>
    )
}

export default Sales
