import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getStatisticGeneralPerformance } from 'store/actions/statistic'
import {
    ButtonLink,
    Icon,
    Container,
    Row,
    Col,
    Text,
    Segment,
    Spinner,
    Tooltip,
    TooltipText,
} from '@elevenia/master-ui/components/Atom'
import PeriodTray from '../PeriodTray'
import ErrorData from '../ErrorData'
import moment from 'moment'

const GeneralPerformance = props => {
    const { getStatisticGeneralPerformance, statistic, period } = props
    const { generalPerformance } = statistic
    /**
     * Period Section
     */
    const [isTrayOpen, setIsTrayOpen] = useState(false)
    const [activePeriod, setActivePeriod] = useState({
        value: 'last_30',
        label: '1 Bulan Terakhir',
    })
    const handleChangePeriod = value => {
        const foundLabel = period.find(key => key.label === value)
        setActivePeriod({ label: foundLabel ? foundLabel.label : '', value })
        getStatisticGeneralPerformance({ period: value })
    }
    useEffect(() => {
        if (generalPerformance.period) {
            const foundPeriod = period.find(key => key.value === generalPerformance.period)
            setActivePeriod(foundPeriod)
        }
    }, [generalPerformance.period, period])
    /**
     *  Mapping Data Section
     */
    const getAdditionalStatusInfo = status => {
        switch (status.toLowerCase()) {
            case 'toko dilihat':
                return {
                    index: 1,
                    hasInfo: true,
                }
            case 'pesanan gagal':
                return {
                    index: 2,
                    hasInfo: true,
                }
            case 'pesanan ditolak':
                return {
                    index: 3,
                    hasInfo: true,
                }
            case 'rata-rata waktu proses':
                return {
                    index: 4,
                    hasInfo: false,
                }
            case 'rata-rata kepuasan':
                return {
                    index: 5,
                    hasInfo: false,
                }
            default:
                return {
                    index: 6,
                    hasInfo: false,
                }
        }
    }
    const sortData = data => {
        if (data.length) {
            const newData = data.map(list => {
                const additionalStatusInfo = getAdditionalStatusInfo(list.status)
                return { ...list, ...additionalStatusInfo }
            })
            const sorted = newData.sort((a, b) =>
                a.index > b.index ? 1 : b.index > a.index ? -1 : 0,
            )
            return sorted
        }
        return []
    }
    const splitTime = numberOfHours => {
        var days = Math.floor(numberOfHours / 24)
        var remainder = numberOfHours % 24
        var hours = Math.floor(remainder)
        var minutes = Math.floor(60 * (remainder - hours))
        return { days, hours, minutes }
    }
    const [info, setInfo] = useState('')
    const getInfo = title => {
        switch (title.toLowerCase()) {
            case 'toko dilihat':
                return 'detail info toko dilihat'
            case 'pesanan gagal':
                return 'detail info pesanan gagal'
            case 'pesanan ditolak':
                return 'detail info pesanan ditolak'
            default:
                return ''
        }
    }
    const bindStar = star => {
        let gold = star
        let black = star < 5 ? 5 - star : 0
        return (
            <>
                {[...new Array(gold)].map((__, index) => (
                    <Icon key={index} name="star" size={16} fillColor="#FAAD24" />
                ))}
                {[...new Array(black)].map((__, index) => (
                    <Icon key={index} name="star" size={16} fillColor="black40" />
                ))}
            </>
        )
    }
    return (
        <>
            {generalPerformance.isLoaded ? (
                <>
                    <div className="u-bg-black20 sec-update u-tx-black40">
                        Terakhir diperbarui:{' '}
                        <span className="u-tx-black50">
                            {generalPerformance.last_update
                                ? moment(
                                      generalPerformance.last_update,
                                      'DD-MM-YYYY HH:mm:ss',
                                  ).format('DD MMM YYYY, HH:mm')
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
                        {generalPerformance.data && generalPerformance.data.length ? (
                            <Segment mt="10px">
                                {sortData(generalPerformance.data).map((list, index) => (
                                    <React.Fragment key={index}>
                                        <Row py="16px" pl="16px" className="bd-bottom">
                                            <Col flex="2">
                                                <Text
                                                    className="u-ds-inline"
                                                    color="black70"
                                                    mr="4px"
                                                >
                                                    {list.status}
                                                </Text>
                                                {list.hasInfo && (
                                                    <span onClick={() => setInfo(list.status)}>
                                                        <Tooltip type="hover">
                                                            i
                                                            <TooltipText
                                                                color={'light'}
                                                                position={'right'}
                                                            >
                                                                {getInfo(info)}
                                                            </TooltipText>
                                                        </Tooltip>
                                                    </span>
                                                )}
                                            </Col>
                                            <Col>
                                                <Text color="black50" ml="24px">
                                                    {list.index === 4
                                                        ? `${splitTime(list.value).days} Hari 
                                                        ${splitTime(list.value).hours} Jam`
                                                        : list.value === 5
                                                        ? bindStar(list.value)
                                                        : list.value
                                                              .toString()
                                                              .replace(
                                                                  /(\d)(?=(\d{3})+(?!\d))/g,
                                                                  '$1.',
                                                              )}
                                                </Text>
                                            </Col>
                                        </Row>
                                    </React.Fragment>
                                ))}
                            </Segment>
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
                options={[...period].splice(1, 4)}
            />
        </>
    )
}

const mapStateToProps = ({ statistic }) => ({
    statistic,
})
const mapDispatchToProps = {
    getStatisticGeneralPerformance,
}
export default connect(mapStateToProps, mapDispatchToProps)(GeneralPerformance)
