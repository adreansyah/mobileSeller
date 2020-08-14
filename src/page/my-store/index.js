import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Box, ButtonGroup, Button, Icon, Text, Spinner, Segment } from '@elevenia/master-ui/components/Atom'
import {
    ModalLite,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from '@elevenia/master-ui/components/Molecules'
import { Link } from 'react-router-dom'
import { copyText } from 'helper'
import { trackScreenView } from 'helper/Tracker'
import ActionCreators from 'store/actions/authentication'
import { Header, HeaderBody } from '@elevenia/master-ui/components/Organisms/Mobile'

const MyStore = ({ profile, setAlerts, authentication, logout }) => {
    const [isModalShow, setModal] = useState(false)
    const CDN_URI = process.env.REACT_APP_CDN_URL
    const menus = [
        {
            name: 'Statistik',
            icon: 'statistic',
            path: '/statistic',
        },
        {
            name: 'Penghasilan',
            icon: 'cash',
            path: '/settlement',
        },
        {
            name: 'Q & A',
            icon: 'qna',
            path: '/qna',
        },
        {
            name: 'F.A.Q',
            icon: 'faq',
            path: '',
            link: 'https://help.elevenia.co.id/hc/en-us/categories/360000149707-penjual',
        },
        {
            name: 'Pusat Bantuan',
            icon: 'help',
            path: '/help-center',
        },
        {
            name: 'Keluar',
            icon: 'logout',
            path: () => setModal(!isModalShow),
        },
    ]

    useEffect(() => {
        trackScreenView('My Store', 'my-store-id')
    }, [])

    const copyTextToClipboard = text => {
        if (copyText(text)) {
            alert('Link Seller Store Anda berhasil disalin.')
        }
    }

    const CustomBadge = props => {
        const { icon } = props
        const type = icon.toLowerCase() === 'official' ? 'official' : 'grade'
        let content = ''
        switch (icon.toLowerCase()) {
            case 'official':
                content = require('assets/images/badge/official-seller.png')
                break
            case 'basic':
                content = require('assets/images/badge/basic.png')
                break
            case 'bronze':
                content = require('assets/images/badge/bronze.png')
                break
            case 'silver':
                content = require('assets/images/badge/silver.png')
                break
            case 'gold':
                content = require('assets/images/badge/gold.png')
                break
            case 'platinum':
                content = require('assets/images/badge/platinum.png')
                break
            default:
                content = false
        }

        return content ? <img className={`u-mr-4 img-${type}`} src={content} alt={type} /> : ''
    }
    const { data } = profile

    return (
        <>
            {setAlerts.alert.status && setAlerts.alert.componentMessage}
            <div className="u-ps-relative height--100" style={{ backgroundColor: '#EFF3F6' }}>
                <Header fixed className={'u-bg-primary bd-bottom-line'}>
                    <HeaderBody className={'u-tx-white'}>Toko Saya</HeaderBody>
                </Header>
                <Segment pb={60}>
                    <div className="u-ps-relative cont-profile-box">
                        <Box className="box">
                            <img
                                className="img-profile u-m-16"
                                src={CDN_URI + data.storeLogo}
                                alt={'logo'}
                            />
                            <div className="u-py-16 u-pr-16" style={{ flex: 'auto' }}>
                                <div className="u-ds-flex u-js-between">
                                    <h2 className="u-tx-dark">{data.name}</h2>
                                    <button onClick={() => copyTextToClipboard(data.urlPath)}>
                                        <Icon name="duplicate" size={16} fillColor={'black50'} />
                                    </button>
                                </div>
                                <div className="u-mt-4">
                                    <CustomBadge icon={data.grade} />
                                    {data.officialStore && <CustomBadge icon={'official'} />}
                                </div>
                                <div className="u-mt-8">
                                    <span className="u-mr-4 follower">{data.followerCount}</span>
                                    <Icon
                                        name="profile"
                                        size={16}
                                        fillColor={'black50'}
                                        style={{ verticalAlign: 'bottom' }}
                                    />
                                </div>
                            </div>
                        </Box>
                    </div>
                    <div className="cont-menus">
                        <ul>
                            {menus.map((list, index) => (
                                <li key={index}>
                                    {typeof list.path === 'function' ? (
                                        <Link to={'#'} onClick={list.path}>
                                            <Icon name={list.icon} size={24} fillColor={'black50'} />
                                            <div className="menus-name">{list.name}</div>
                                        </Link>
                                    ) : list.link ? (
                                        <a href={list.link} target="_blank" rel="noopener noreferrer">
                                            <Icon name={list.icon} size={24} fillColor={'black50'} />
                                            <div className="menus-name">{list.name}</div>
                                        </a>
                                    ) : (
                                                <Link to={list.path}>
                                                    <Icon name={list.icon} size={24} fillColor={'black50'} />
                                                    <div className="menus-name">{list.name}</div>
                                                </Link>
                                            )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Segment>
            </div>

            <ModalLite isOpen={isModalShow} toggle={() => setModal(!isModalShow)} backdrop="static">
                <ModalHeader>
                    <ModalTitle className="u-tx-center">Keluar Aplikasi</ModalTitle>
                </ModalHeader>
                <ModalBody className="u-tx-center">
                    <Text type="P1" className="u-tx-info">
                        Apakah Anda ingin keluar aplikasi ?
                    </Text>
                </ModalBody>
                <ModalFooter>
                    {authentication.loading ? (
                        <ButtonGroup space={8}>
                            <Button size="medium" variant="secondary-alt" disabled>
                                <Spinner color="#70727D" />
                            </Button>
                            <Button size="medium" variant="primary-alt" disabled>
                                TIDAK
                            </Button>
                        </ButtonGroup>
                    ) : (
                            <ButtonGroup space={8}>
                                <Button
                                    size="medium"
                                    variant="secondary-alt"
                                    onClick={() => logout()}
                                >
                                    YA
                            </Button>
                                <Button
                                    size="medium"
                                    variant="primary-alt"
                                    onClick={() => setModal(!isModalShow)}
                                >
                                    TIDAK
                            </Button>
                            </ButtonGroup>
                        )}
                </ModalFooter>
            </ModalLite>
        </>
    )
}

const mapStateToProps = ({ profile, setAlerts, authentication }) => ({
    profile,
    setAlerts,
    authentication,
})
const mapDispatchToProps = {
    ...ActionCreators,
}
export default connect(mapStateToProps, mapDispatchToProps)(MyStore)
