import React from 'react'
import {
    ModalLite,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from '@elevenia/master-ui/components/Molecules'
import { Text, ButtonGroup, Button } from '@elevenia/master-ui/components/Atom'

const AttentionModal = ({ isOpen, onClose }) => {
    return (
        <ModalLite isOpen={isOpen} toggle={() => onClose()} backdrop="static">
            <ModalHeader>
                <ModalTitle className="u-tx-center">Perhatian</ModalTitle>
            </ModalHeader>
            <ModalBody className="u-tx-center">
                <Text B14 color="black50" className="u-pb-12">
                    Untuk versi ini, fitur batalkan/tolak pesanan belum tersedia.
                </Text>
                <Text B14 color="black50">
                    Fitur selengkapnya, kunjungi versi desktop : <b>soffice.elevenia.co.id</b>
                </Text>
            </ModalBody>
            <ModalFooter>
                <ButtonGroup responsive>
                    <Button size="medium" variant="primary-alt" onClick={() => onClose()}>
                        OK
                    </Button>
                </ButtonGroup>
            </ModalFooter>
        </ModalLite>
    )
}

export default AttentionModal
