import React from "react";
import styled from "styled-components";

const ContextWrapper = styled.div`
  position: absolute;
  z-index: 9;
  top: 8px;
  right: 16px;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.12);
  padding: 12px;
  background-color: white;
  text-align: left;
`;

const ContextOverlay = styled.div`
  position: fixed;
  z-index: 8;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(21, 24, 35, 0);
`;

const ContextMenu = ({ children, ...props }) => {
  const { isOpen, onClose } = props;

  if (!isOpen) return ''
  return (
    <>
      <ContextOverlay onClick={onClose} />
      <ContextWrapper {...props} >
        {children}
      </ContextWrapper>
    </>
  )
}

export default ContextMenu;
