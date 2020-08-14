import styled from "styled-components";

const TrackerPoint = styled.div`  
  margin: auto;
  height: 16px;
  width: 16px;
  border-radius: 8px;
  background-color: ${props => props.theme.color.success};
  &:after {
    content:"";
    position: absolute;
    top: 16px;
    left: calc(50% - 1px);
    height:100%;
    border-left: 2px solid ${props => props.theme.color.black30};
}
`;

const Tracker = styled.div`
  &:first-child {
    ${TrackerPoint} {
      height: 16px;
      width: 16px;
      border-radius: 8px;
      background-color: ${props => props.theme.color.white};
      border: 4px solid ${props => props.theme.color.primary};
      &:after {
        border-left: 2px dashed ${props => props.theme.color.black40};
      }
    }
  }
  &:last-child {
    ${TrackerPoint} {
      &:after {
        content:none;
      }
    }
  }
`;



export default Tracker;
export { TrackerPoint }