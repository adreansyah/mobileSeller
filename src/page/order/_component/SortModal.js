import React, { useState, useEffect } from 'react'
import { TrayFull } from '@elevenia/master-ui/components/Molecules'
import { ButtonLink, Icon, Text, Row, Col, Button, Container } from '@elevenia/master-ui/components/Atom'
import {
    Header,
    Footer,
    HeaderLeft,
    HeaderBody,
} from '@elevenia/master-ui/components/Organisms/Mobile'

const SortModal = ({ isOpen, params, onClose, onSort, activeTabs }) => {
    const [sortList] = useState([
        {
            enum: 'ORDER_DATE_ASC',
            name: 'Pesanan terlama ke terbaru',
        },
        {
            enum: 'ORDER_DATE_DESC',
            name: 'Pesanan terbaru ke terlama',
        },
        {
            enum: 'ORDER_DESC',
            name: 'Transaksi paling besar ke paling kecil',
        },
        {
            enum: 'ORDER_ASC',
            name: 'Transaksi paling kecil ke paling besar',
        },
    ])
    const [activeSort, setActiveSort] = useState(params.activeSort)

    /**
     * Save and Reset Section
     */
    const handleApply = async () => {
        const nextParams = {
            ...params,
            activeSort,
            page: 0,
        }
        onSort(nextParams)
        onClose()
    }
    useEffect(() => {
        setActiveSort(params.activeSort)
    }, [params])
    return (
        <>
            <TrayFull isOpen={isOpen}>
                <Header fixed border>
                    <HeaderLeft>
                        <ButtonLink
                            onClick={() => {
                                setActiveSort(params.activeSort)
                                onClose()
                            }}
                        >
                            <Icon name="cancel" size="24" fillColor="black50" />
                        </ButtonLink>
                    </HeaderLeft>
                    <HeaderBody>Urutkan</HeaderBody>
                </Header>
                <Container>
                    <ul className="u-p-0">
                        {sortList.map((list, index) => {
                            const checked = list.enum === activeSort
                            const lastIndex = sortList.length - 1
                            return (
                                <React.Fragment key={index}>
                                    <SortListBlock
                                        onClick={() => setActiveSort(list.enum)}
                                        name={list.name}
                                        checked={checked}
                                        isLastIndex={index === lastIndex}
                                    />
                                </React.Fragment>
                            )
                        })}
                    </ul>
                </Container>
                <Footer border fixed>
                    <Button
                        variant={'primary-alt'}
                        style={{ width: '100%' }}
                        onClick={() => handleApply()}
                    >
                        TERAPKAN
                    </Button>
                </Footer>
            </TrayFull>
        </>
    )
}
const SortListBlock = ({ name, checked, isLastIndex, ...props }) => {
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

export default SortModal
