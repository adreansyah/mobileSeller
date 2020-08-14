import React from 'react'
import {
    CheckBox,
    Icon,
    ButtonLink,
    Row,
    Col,
    Container,
    Segment
} from '@elevenia/master-ui/components/Atom'

const FilterSortBlock = ({
    onSelectAllChange,
    selected,
    onOpenFilter,
    onOpenSort,
    isFilterDiff,
    isSortDiff,
}) => {
    const items = [{ label: `Pilih Semua`, value: 'all', checked: true }]
    return (
        <>
            <Container bg="white" position="fixed" borderBottom="1px solid black30" zIndex={1020}>
                <Row py={8} px={16}>
                    {typeof selected !== 'undefined' && (
                        <Col wide={5}>
                            <CheckBox
                                checkProps={{
                                    onChange: e => onSelectAllChange(e),
                                    name: 'item',
                                }}
                                checkItems={items}
                                selected={selected}
                            />
                        </Col>
                    )}
                    <Col wide={typeof selected !== 'undefined' ? 7 : 12}>
                        <Row>
                            <Col
                                px={8}
                                borderLeft={
                                    typeof selected !== 'undefined'
                                        ? '1px solid black30'
                                        : '0px solid black30'
                                }
                                className="u-tx-center"
                            >
                                <ButtonLink
                                    className={'u-tx-black40'}
                                    onClick={() => onOpenFilter()}
                                    style={{ height: '100%' }}
                                >
                                    <Icon
                                        fillColor={isFilterDiff ? 'success' : 'black40'}
                                        name="filter"
                                        size={24}
                                    />
                                    Filter
                                </ButtonLink>
                            </Col>
                            <Col px={8} borderLeft="1px solid black30" className="u-tx-center">
                                <ButtonLink
                                    className="u-tx-black40"
                                    style={{ height: '100%' }}
                                    onClick={() => onOpenSort()}
                                >
                                    <Icon
                                        fillColor={isSortDiff ? 'success' : 'black40'}
                                        name="sort"
                                        size={24}
                                    />
                                    Urutkan
                                </ButtonLink>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Segment height={43} />
        </>
    )
}

export default FilterSortBlock
