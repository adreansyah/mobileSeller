import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getStatisticSellerRevenue } from 'store/actions/statistic'
import {
    ButtonLink,
    Icon,
    Text,
    Container,
    Row,
    Col,
    Spinner,
    Segment,
} from '@elevenia/master-ui/components/Atom'
import { Line } from 'react-chartjs-2'
import moment from 'moment'
import PeriodTray from '../PeriodTray'
import ErrorData from '../ErrorData'
import { getColor, hexToRgb } from 'helper'

const black40 = getColor('black40')
const black50 = getColor('black50')
const primary = getColor('primary')
const white = getColor('white')

const SellerRevenue = props => {
    const { getStatisticSellerRevenue, statistic, period } = props
    const { sellerRevenue } = statistic
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
        getStatisticSellerRevenue({ period: value })
    }
    useEffect(() => {
        if (sellerRevenue.period) {
            const foundPeriod = period.find(key => key.value === sellerRevenue.period)
            setActivePeriod(foundPeriod)
        }
    }, [sellerRevenue.period, period])
    /**
     * Chart Utils Func
     */
    const getFormatDate = date => {
        return moment(date, ['DD-MM-YYYY', 'MM-YYYY'], true).creationData().format
    }
    const sortData = data => {
        if (data.length) {
            const format = getFormatDate(data[0].date)
            const sorted = data.sort((a, b) =>
                moment(a.date, format) > moment(b.date, format)
                    ? 1
                    : moment(b.date, format) > moment(a.date, format)
                    ? -1
                    : 0,
            )
            return sorted
        }
        return []
    }
    const dateRange = () => {
        const { data } = sellerRevenue
        const sortedData = sortData(data)
        if (sortedData.length) {
            const firstDate = sortedData[0].date
            const lastDate = sortedData[sortedData.length - 1].date
            const format = getFormatDate(sortedData[0].date)
            return {
                start: moment(firstDate, format).format(
                    `${format === 'DD-MM-YYYY' ? 'DD MMM YYYY' : 'MMM YYYY'}`,
                ),
                end: moment(lastDate, format).format(
                    `${format === 'DD-MM-YYYY' ? 'DD MMM YYYY' : 'MMM YYYY'}`,
                ),
            }
        }
        return null
    }
    const chartRatio = {
        height: 200,
        width: 100,
    }
    const chartOptions = {
        tooltips: {
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
                            chart.data.datasets[tooltipItem.datasetIndex].pointBorderColor,
                    }
                },
                label: (tooltipItem, data) => {
                    let amount = tooltipItem.yLabel.toString()
                    return `  ${amount.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`
                },
            },
        },
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        scales: {
            yAxes: [
                {
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        fontColor: black40,
                        fontSize: 10,
                        lineHeight: 1.2,
                        fontFamily: 'Rubik',
                        callback: function(label, index, labels) {
                            return `${(label / 1000)
                                .toString()
                                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} k`
                        },
                    },
                    gridLines: {
                        borderDash: [8, 4],
                        color: hexToRgb(black40, 25),
                        zeroLineBorderDash: [8, 4],
                        zeroLineColor: hexToRgb(black40, 25),
                        drawBorder: false,
                    },
                },
            ],
            xAxes: [
                {
                    display: true,
                    ticks: {
                        fontColor: black40,
                        fontSize: 10,
                        lineHeight: 1.2,
                        fontFamily: 'Rubik',
                    },
                    gridLines: {
                        borderDash: [8, 4],
                        color: hexToRgb(black40, 25),
                        zeroLineBorderDash: [8, 4],
                        zeroLineColor: hexToRgb(black40, 25),
                        drawBorder: false,
                    },
                },
            ],
        },
    }
    /**
     *  Chart Main Func
     */
    const chartData = canvas => {
        /**
         * Get Gradient Color from Chart
         */
        const ctx = canvas.getContext('2d')
        const gradient = ctx.createLinearGradient(0, 0, 0, chartRatio.height)
        gradient.addColorStop(0, hexToRgb(black40, 50))
        gradient.addColorStop(1, hexToRgb(black40, 2))

        const { data } = sellerRevenue
        const sortedData = sortData(data)
        if (sortedData.length) {
            const format = moment(
                sortedData[0].date,
                ['DD-MM-YYYY', 'MM-YYYY'],
                true,
            ).creationData().format
            let labels = [],
                chartValues = []
            sortedData.forEach(list => {
                let labelFormat = ''
                format === 'DD-MM-YYYY' ? (labelFormat = 'DD/MM') : (labelFormat = 'MMM')
                labels.push(moment(list.date, format).format(labelFormat))
                chartValues.push(list.value)
            })
            return {
                labels,
                datasets: [
                    {
                        data: chartValues,
                        backgroundColor: gradient,
                        borderColor: black40,
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: primary,
                        pointBackgroundColor: white,
                        pointBorderWidth: 4,
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: primary,
                        pointHoverBorderColor: primary,
                        pointHoverBorderWidth: 2,
                        pointRadius: 2,
                        pointHitRadius: 1,
                        borderWidth: 1,
                        lineTension: 0,
                    },
                ],
            }
        }
        return null
    }
    return (
        <>
            {sellerRevenue.isLoaded ? (
                <>
                    <div className="u-bg-black20 sec-update u-tx-black40">
                        Terakhir diperbarui:{' '}
                        <span className="u-tx-black50">
                            {sellerRevenue.last_update
                                ? moment(sellerRevenue.last_update, 'DD-MM-YYYY HH:mm:ss').format(
                                      'DD MMM YYYY, HH:mm',
                                  )
                                : '-'}
                        </span>
                    </div>
                    <Container px="16px">
                        <Row mt="8px" pt="16px">
                            <Col>
                                <Text H14 color="black70">
                                    {activePeriod.label ? activePeriod.label : '...'}
                                </Text>
                                <Text P14 color="info" style={{ fontSize: '10px' }}>
                                    {dateRange() && dateRange().start + ' - ' + dateRange().end}
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
                        {sellerRevenue.data && sellerRevenue.data.length ? (
                            <>
                                {/**
                                 * Chart is here
                                 */}
                                <Row mt="16px">
                                    <Text mb="8px" color="black40" style={{ fontSize: '10px' }}>
                                        (k = .000 rupiah)
                                    </Text>
                                    <Line
                                        data={chartData}
                                        options={chartOptions}
                                        height={chartRatio.height}
                                    />
                                </Row>
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
    getStatisticSellerRevenue,
}
export default connect(mapStateToProps, mapDispatchToProps)(SellerRevenue)
