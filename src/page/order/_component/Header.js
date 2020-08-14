import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Icon, ButtonLink, Textfield, Text, Segment } from '@elevenia/master-ui/components/Atom'
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import { requestSearch } from 'store/actions/order'
import {
    Header,
    HeaderBody,
    HeaderRight,
    HeaderLeft,
} from '@elevenia/master-ui/components/Organisms/Mobile'
import { Link } from 'react-router-dom'

const onSearch$ = new Subject()

const HeaderBlock = ({ requestSearch, order }) => {
    const textInputRef = useRef()
    const [toggle, setToggle] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [finishedSearchKeyword, setFinishedSearchKeyword] = useState(null)
    const handleInput = e => {
        const { value } = e.target
        setSearchKeyword(value)
        onSearch$.next(value)
        onSearch$.pipe(debounceTime(1000)).subscribe(value => {
            setFinishedSearchKeyword(value)
        })
    }
    const focusTextInput = () => {
        setTimeout(() => {
            textInputRef && textInputRef.current.focus()
        }, 100)
    }
    useEffect(() => {
        finishedSearchKeyword !== null && requestSearch(finishedSearchKeyword)
    }, [finishedSearchKeyword, requestSearch])
    useEffect(() => {
        if (order.searchKeyword) {
            setToggle(true)
            setSearchKeyword(order.searchKeyword)
            setFinishedSearchKeyword(order.searchKeyword)
        }
    }, [order.searchKeyword])
    return (
        <Segment className="page-order" bg="white" height={60}>
            <Header className={`collapse-header toLeft${toggle ? ' hide' : ''}`}>
                <HeaderLeft>
                    <Link to="/sales">
                        <ButtonLink>
                            <Icon fillColor="black50" name="arrow-left" size={24} />
                        </ButtonLink>
                    </Link>
                </HeaderLeft>
                <HeaderBody>Status Penjualan</HeaderBody>
                <HeaderRight>
                    <ButtonLink
                        onClick={() => {
                            setToggle(true)
                            requestSearch('')
                            focusTextInput()
                        }}
                    >
                        <Icon fillColor="black50" name="search" size={24} />
                    </ButtonLink>
                </HeaderRight>
            </Header>
            <Header className={`collapse-header toRight${!toggle ? ' hide' : ''}`}>
                <HeaderBody>
                    <Textfield
                        inputProps={{
                            onChange: e => handleInput(e),
                            onKeyUp: e => handleInput(e),
                            value: searchKeyword,
                            ref: textInputRef,
                            type: 'search',
                            name: 'searchKeyword',
                        }}
                        left={<Icon name={'search'} size={24} fillColor="black50" />}
                    />
                </HeaderBody>
                <HeaderRight>
                    <ButtonLink
                        onClick={() => {
                            requestSearch('')
                            setSearchKeyword('')
                            setToggle(false)
                        }}
                    >
                        <Text color={'black50'}>Cancel</Text>
                    </ButtonLink>
                </HeaderRight>
            </Header>
        </Segment>
    )
}
const mapStateToProps = ({ order }) => ({
    order,
})
const mapDispatchToProps = { requestSearch }

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBlock)
