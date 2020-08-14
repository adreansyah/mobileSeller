import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BehaviorSubject } from 'rxjs'
import { throttleTime } from 'rxjs/operators'
let lastPosWindowY = {}
export default class InfiniteScroll extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        element: PropTypes.node,
        hasMore: PropTypes.bool,
        loader: PropTypes.node,
        loadMore: PropTypes.func.isRequired,
        refs: PropTypes.string,
        threshold: PropTypes.number,
        hasError: PropTypes.bool,
        error: PropTypes.node,
    }

    static defaultProps = {
        element: 'div',
        hasMore: false,
        refs: 'infiniteRef',
        threshold: 0,
        loader: null,
        hasError: false,
        error: null,
    }

    constructor(props) {
        super(props)
        this.scrollStream = new BehaviorSubject()
    }

    componentDidMount() {
        const { refs } = this.props
        const latest =
            lastPosWindowY[refs] !== undefined ? lastPosWindowY[refs] : window.innerHeight
        window.scrollTo(0, parseInt(latest) - window.innerHeight)
        this.scrollListener = window.addEventListener('scroll', e => {
            this.handleScroll(e)
        })
    }

    componentDidUpdate() {
        const { refs, hasMore, threshold, loadMore, children, isLoading } = this.props
        const el = refs ? this.refs[refs] : this.refs['infiniteRef']
        if (el) {
            let elOffset = el.offsetTop + el.clientHeight
            let pageOffset = Math.ceil(window.innerHeight)
            let addedOffset = threshold ? parseInt(threshold) : 0
            let loadMoreOffset = Math.ceil(elOffset - addedOffset)
            if (pageOffset >= loadMoreOffset && hasMore && children.length > 0) {
                if (typeof isLoading === 'undefined' || !isLoading) {
                    loadMore()
                }
            }
        }
    }

    componentWillUnmount() {
        lastPosWindowY = {
            ...lastPosWindowY,
            [this.props.refs]: window.pageYOffset + window.innerHeight,
        }
        this.scrollListener = window.removeEventListener('scroll', e => {
            this.handleScroll(e)
        })
    }

    handleScroll = () => {
        const { refs, hasMore, threshold, loadMore, children, isLoading } = this.props
        const el = refs ? this.refs[refs] : this.refs['infiniteRef']
        if (el) {
            let elOffset = el.offsetTop + el.clientHeight
            let pageOffset = Math.ceil(window.pageYOffset + window.innerHeight)
            let addedOffset = threshold ? parseInt(threshold) : 0
            let loadMoreOffset = Math.ceil(elOffset - addedOffset)
            if (pageOffset >= loadMoreOffset && hasMore && children.length > 0) {
                if (typeof isLoading === 'undefined' || !isLoading) {
                    this.scrollStream.pipe(throttleTime(1000)).subscribe(() => loadMore())
                }
            }
        }
    }

    render() {
        const {
            element,
            hasMore,
            refs,
            threshold,
            loader,
            children,
            loadMore,
            error,
            hasError,
            isLoading,
            ...attributes
        } = this.props
        const childrenArray = [children]
        if (hasMore) {
            if (loader) {
                childrenArray.push(loader)
            }
        }
        if (children.length === 0 && error) {
            childrenArray.push(error)
        }

        return React.createElement(element, { ...attributes, ref: refs }, childrenArray)
    }
}
