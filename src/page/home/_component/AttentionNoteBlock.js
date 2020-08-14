import React from 'react'
import { Container, AlertBox } from '@elevenia/master-ui/components/Atom'

const AttentionNoteBlock = ({ onOpenModal, onHideNote }) => {
    return (
        <Container pt={8} pb={16} px={16}>
            <AlertBox type="warning" dismiss={() => onHideNote()}>
                Proses pengiriman versi ini hanya dapat me nggunakan kurir tertentu.
                <span className="u-ml-4" style={{ fontWeight: 500 }} onClick={() => onOpenModal()}>
                    Lihat Detail
                </span>
            </AlertBox>
        </Container>
    )
}

export default AttentionNoteBlock
