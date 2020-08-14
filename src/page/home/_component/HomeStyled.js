import styled from 'styled-components'
import { sizing, border, spacing } from '@elevenia/master-ui/components/Utils'

const HorizontalScroller = styled.div`
    display: block;
    position: relative;
    width: 100%;
    padding-left: 16px;
    padding-right: 8px;
    overflow-x: scroll;
    ul {
        position: relative;
        display: flex;
        flex-direction: row;
        padding-left: 0;
        li {
            position: relative;
            display: inline-flex;
            padding-right: 8px;
            padding-left: 0px;
            justify-content: center;
            align-items: flex-start;
            flex: 1 0 auto;
            &:last-child {
                padding-right: 16px;
            }
        }
    }
`
const ImageWrapper = styled.div`
    background-position: center center;
    background-repeat: no-repeat;
    overflow: hidden;
    ${sizing}
    ${border}
    ${spacing}
`
const Image = styled.img`
    min-height: 100%;
    object-fit: cover;
    ${sizing}
`
export { HorizontalScroller, ImageWrapper, Image }
