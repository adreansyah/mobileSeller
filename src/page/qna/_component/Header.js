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

const onSearch$ = new Subject()

const HeaderBlock = ({ requestSearch, ...props }) => {
    const textInputRef = useRef()
    const [toggle, setToggle] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState('')
    const handleInput = e => {
        const { value } = e.target
        setSearchKeyword(value)
        onSearch$.next(value)
    }
    const focusTextInput = () => {
        setTimeout(() => {
            textInputRef && textInputRef.current.focus()
        }, 100)
    }
    useEffect(() => {
        onSearch$.pipe(debounceTime(500)).subscribe(value => requestSearch(value))
    }, [searchKeyword, requestSearch])

    return (
        <Segment height={60} className="page-order">
            <Header className={`collapse-header toLeft${toggle ? ' hide' : ''}`}>
                <HeaderLeft>
                    <ButtonLink onClick={() => props.history.goBack()}>
                        <Icon fillColor="black50" name="arrow-left" size={24} />
                    </ButtonLink>
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
                            value: searchKeyword,
                            ref: textInputRef,
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
