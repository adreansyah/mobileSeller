import React from "react";
import {Icon,ButtonLink,Segment,Text,Row,Col} from '@elevenia/master-ui/components/Atom';
import {Tray,TrayHeader,TrayTitle} from '@elevenia/master-ui/components/Molecules';
const InformationBalance = (props) => {
    const {isOpen,handleOpenModalSaldo} = props;
    return (
        <Tray isOpen={isOpen} overlayClick={handleOpenModalSaldo}>
            <TrayHeader>
                <TrayTitle>Informasi Saldo</TrayTitle>
                <ButtonLink onClick={handleOpenModalSaldo}>
                    <Icon name="cancel" size="24" fillColor="black50" />
                </ButtonLink>
            </TrayHeader>
            <Segment pl={16} py={16} bg="white">
                <Row>
                    <Text color="gray" mr={4}>&sdot;</Text>
                    <Col wide={11}>
                        <Text color="gray" style={{fontSize: 12}}>
                            Total saldo adalah jumlah akumulasi saldo yang diperoleh penjual.
                        </Text>
                    </Col>
                </Row>
                <Row pt={8}>
                    <Text color="gray" mr={4}>&sdot;</Text>
                    <Col wide={11}>
                        <Text color="gray" style={{fontSize: 12}}>
                            Saldo yang dapat dicairkan hanyalah saldo hasil penjualan produk.
                        </Text>
                    </Col>
                </Row>
                <Row pt={8}>
                    <Text color="gray" mr={4}>&sdot;</Text>
                    <Col wide={11}>
                        <Text color="gray" style={{fontSize: 12}}>
                            Seluruh saldo penjual dapat digunakan untuk membeli iklan di elevenia.
                        </Text>
                    </Col>
                </Row>
            </Segment>
        </Tray>
    )
}

export default InformationBalance;