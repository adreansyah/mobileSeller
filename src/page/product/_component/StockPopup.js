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

const StockPopup = ({isOpen,onClose,...props}) => {
  const handleClose = () => {
    onClose()
  }
  return (
    <>
      <ModalLite isOpen={isOpen} toggle={() => handleClose()} backdrop="true">
        <ModalHeader>
          <ModalTitle>
            <Text textAlign="center">Update Stok Berhasil</Text>
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Text textAlign="center" color="black50">Stok Produk berhasil diperbarui</Text>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup responsive>
            <Button onClick={() => handleClose()} size="medium" variant="primary-alt">OK</Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalLite>
    </>
  )
}

export default StockPopup
