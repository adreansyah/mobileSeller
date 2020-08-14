import React from 'react'
import {
  ModalLite,
  ModalHeader,
  ModalBody,
  ModalTitle,
  ModalFooter
} from '@elevenia/master-ui/components/Molecules'
import {
  Button,
  ButtonGroup,
  Text
} from '@elevenia/master-ui/components/Atom'

const DeletePopup = ({ isOpen, onClose, ...props }) => {

  return (
    <>
      <ModalLite isOpen={isOpen} toggle={() => onClose()} backdrop="true">
        <ModalHeader>
          <ModalTitle>
            <Text textAlign="center">Lorem Ipsum</Text>
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Text textAlign="center" color="black50">Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup responsive>
            <Button size="medium" variant="secondary-alt" onClick={() => onClose()}>BATAL</Button>
            <Button size="medium" variant="primary-alt">OK</Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalLite>
    </>
  )
}

export default DeletePopup
