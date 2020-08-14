import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getStatisticOrderStatus } from 'store/actions/statistic'
import {
    ButtonLink,
    Icon,
    Row,
    Col,
    Text,
    Container,
    Segment,
    Spinner,
} from '@elevenia/master-ui/components/Atom'
import { Pie } from 'react-chartjs-2'
import PeriodTray from '../PeriodTray'
import ErrorData from '../ErrorData'
import { getColor } from 'helper'
import moment from 'moment'

const primary = getColor('primary')
const secondaryGreen = getColor('secondaryGreen')
const secondaryRed = getColor('secondaryRed')
const black30 = getColor('black30')
const black40 = getColor('black40')
const black50 = getColor('black50')

const OrderStatus = props => {
    const { getStatisticOrderStatus, statistic, period } = props
    const { orderStatus } = statistic
    /**
     * Period Section
     */
    const [isTrayOpen, setIsTrayOpen] = useState(false)
    const [activePeriod, setActivePeriod] = useState({
        value: 'last_7',
        label: '7 Hari Terakhir',
    })
    const handleChangePeriod = value => {
        const foundLabel = period.find(key => key.label === value)
        setActivePeriod({ label: foundLabel ? foundLabel.label : '', value })
        getStatisticOrderStatus({ period: value })
    }
    useEffect(() => {
        if (orderStatus.period) {
            const foundPeriod = period.find(key => key.value === orderStatus.period)
            setActivePeriod(foundPeriod)
        }
    }, [orderStatus.period, period])
    /**
     * Chart Utils Func
     */
    // const chartRatio = {
    //     height: 200,
    //     width: 50
    // };
    const chartOptions = {
        tooltips: {
            enabled: false,
            titleFontFamily: 'Rubik',
            titleFontSize: 12,
            titleFontStyle: 'bold',
            bodyFontFamily: 'Rubik',
            bodyFontSize: 12,
            backgroundColor: black50,
            callbacks: {
                labelColor: (tooltipItem, chart) => {
                    return {
                        backgroundColor:
                            chart.data.datasets[tooltipItem.datasetIndex].backgroundColor[
                                tooltipItem.index
                            ],
                    }
                },
                label: (tooltipItem, data) => {
                    const label = data.labels[tooltipItem.index]
                    const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
                        .toString()
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                    return `${label} : ${value}`
                },
            },
        },
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
    }
    const getStatusProps = status => {
        switch (status) {
            case 'pesanan berhasil':
                return { color: secondaryGreen, sequence: 3 }
            case 'pesanan ditolak':
                return { color: primary, sequence: 1 }
            case 'pesanan gagal':
                return { color: secondaryRed, sequence: 2 }
            case 'pesanan lainnya':
                return { color: black30, sequence: 4 }
            default:
                return { color: black40, sequence: 0 }
        }
    }
    /**
     *  Chart Main Func
     */
    const chartData = () => {
        const { data } = orderStatus
        if (data.length) {
            let labels = [],
                chartValues = [],
                backgroundColor = []
            data.forEach(list => {
                if (list.status.toLowerCase() !== 'pesanan masuk') {
                    labels.push(list.status)
                    chartValues.push(list.value)
                    backgroundColor.push(getStatusProps(list.status.toLowerCase()).color)
                }
            })
            return {
                labels,
                datasets: [
                    {
                        data: chartValues,
                        backgroundColor,
                        borderWidth: 0,
                    },
                ],
            }
        }
        return null
    }
    /**
     * SortData list summary information (bottom summary)
     */
    const sortData = data => {
        const newData = data.map(list => {
            const sequence = getStatusProps(list.status.toLowerCase()).sequence
            return { ...list, sequence }
        })
        if (newData.length) {
            const sorted = [...newData].sort((a, b) =>
                a.sequence > b.sequence ? 1 : b.sequence > a.sequence ? -1 : 0,
            )
            return sorted
        }
        return []
    }
    return (
        <>
            {orderStatus.isLoaded ? (
                <>
                    <div className="u-bg-black20 sec-update u-tx-black40">
                        Terakhir diperbarui:{' '}
                        <span className="u-tx-black50">
                            {orderStatus.last_update
                                ? moment(orderStatus.last_update, 'DD-MM-YYYY HH:mm:ss').format(
                                      'DD MMM YYYY, HH:mm',
                                  )
                                : '-'}
                        </span>
                    </div>
                    <Container>
                        <Row mt="8px" pt="16px" px="16px">
                            <Col>
                                <Text H14 color="black70">
                                    {activePeriod.label ? activePeriod.label : '...'}
                                </Text>
                                <Text P14 color="info" style={{ fontSize: '10px' }}>
                                    {/* {dateRange() && dateRange().start + " - " + dateRange().end} */}
                                </Text>
                            </Col>
                            <Col style={{ textAlign: 'right' }}>
                                <ButtonLink
                                    onClick={() => setIsTrayOpen(!isTrayOpen)}
                                    className="u-tx-black50 u-tx-right"
                                >
                                    <Text H14 mr="4px" color="info" className="title-s">
                                        Pilih Periode
                                    </Text>
                                    <Icon
                                        fillColor={'black50'}
                                        name={'chevron-down'}
                                        size={'small'}
                                    />
                                </ButtonLink>
                            </Col>
                        </Row>

                        {orderStatus.data && orderStatus.data.length ? (
                            <>
                                {/**
                                 * Chart is here
                                 */}
                                <Row p="16px" className="sec-chart">
                                    <Col className="dash-right">
                                        <div style={{ width: '128px' }}>
                                            <Pie
                                                data={chartData}
                                                options={chartOptions}
                                                // height={chartRatio.height}
                                                // width={chartRatio.width}
                                                width={128}
                                            />
                                        </div>
                                    </Col>
                                    <Col className="u-js-end u-ds-flex">
                                        <ul className="u-ds-inline-block">
                                            {chartData().labels.map((list, index) => {
                                                const {
                                                    data,
                                                    backgroundColor,
                                                } = chartData().datasets[0]
                                                const total = data.reduce((pv, cv) => pv + cv, 0)
                                                const percentage =
                                                    (parseInt(data[index]) / parseInt(total)) * 100
                                                return (
                                                    <React.Fragment key={index}>
                                                        <Row mt="12px">
                                                            <span
                                                                className="label-Color"
                                                                style={{
                                                                    backgroundColor:
                                                                        backgroundColor[index],
                                                                }}
                                                            />
                                                            <div>
                                                                <Text
                                                                    className="title-s"
                                                                    color="black40"
                                                                >
                                                                    {list}
                                                                </Text>
                                                                <Text
                                                                    style={{ fontSize: '12px' }}
                                                                    color="black70"
                                                                    mt="4px"
                                                                >
                                                                    {percentage.toFixed()} %
                                                                </Text>
                                                            </div>
                                                        </Row>
                                                    </React.Fragment>
                                                )
                                            })}
                                        </ul>
                                    </Col>
                                </Row>
                                <Segment p="16px" borderTop="1px solid black30">
                                    <Text H14 color="black70" mb="8px">
                                        Jumlah pesanan
                                    </Text>
                                    {sortData(orderStatus.data).map((list, index) => (
                                        <React.Fragment key={index}>
                                            <Row mt="8px" className="u-js-between">
                                                <Text color="black40">{list.status}</Text>
                                                <Text H14>
                                                    {list.value
                                                        .toString()
                                                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                                                </Text>
                                            </Row>
                                        </React.Fragment>
                                    ))}
                                </Segment>
                            </>
                        ) : (
                            <ErrorData />
                        )}
                    </Container>
                </>
            ) : (
                <Segment width={24} height={24} m="auto" mt="80px">
                    <Spinner />
                </Segment>
            )}

            <PeriodTray
                show={isTrayOpen}
                activePeriod={activePeriod}
                toggle={() => setIsTrayOpen(!isTrayOpen)}
                onChange={e => handleChangePeriod(e)}
                options={period}
            />
        </>
    )
}

const mapStateToProps = ({ statistic }) => ({
    statistic,
})
const mapDispatchToProps = {
    getStatisticOrderStatus,
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderStatus)
