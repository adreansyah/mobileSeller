import React,{useState,useEffect} from 'react'
import {
  Tray,
  TrayHeader,
  TrayContent,
  TrayTitle,
  TrayFooter
} from '@elevenia/master-ui/components/Molecules'
import {
  Button,
  Col,
  Stepper,
  Text,
  Row
} from '@elevenia/master-ui/components/Atom'
import StockPopup from './StockPopup';

const StockTray = ({isOpen,onClose,...props}) => {
  const {RequestUpdateStockProduct} = props;
  const [stock,setStock] = useState(0);
  const [isPopupOpen,setIsPopupOpen] = useState(false);
  const limit = 100000;

  useEffect(() => {
    setStock(props.stockItem);
  },[props.stockItem])

  const handleSave = () => {
    setIsPopupOpen(true);
    RequestUpdateStockProduct(stock,props.productId,props.isUpdate);
    onClose();
  };

  const handleClose = () => {
    onClose();
    setStock(0);
  }

  return (
    <>
      <Tray isOpen={isOpen} overlayClick={() => handleClose()}>
        <TrayHeader>
          <TrayTitle>Jaket Hoodie Pria</TrayTitle>
        </TrayHeader>
        <TrayContent className="u-p-16">
          <Row>
            <Col className="u-yal-middle u-py-12">
              <Text H10 color="black50"> ATUR STOK</Text>
            </Col>
            <Col className="u-tx-right">
              <Stepper
                disabled
                value={stock}
                limit={limit}
                onChange={stock => setStock(stock)}></Stepper>
            </Col>
          </Row>
        </TrayContent>
        <TrayFooter fixed>
          <Row>
            <Col pr={4}>
              <Button
                variant={'secondary'}
                className={"u-wd-full"}
                onClick={() => handleClose()}
              >
                BATAL
              </Button>
            </Col>
            <Col pl={4}>
              <Button
                variant={'primary-alt'}
                style={{width: '100%'}}
                onClick={() => handleSave()}
              >
                SIMPAN
              </Button>
            </Col>
          </Row>
        </TrayFooter>
      </Tray>
      <StockPopup {...props} isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  )
}

export default StockTray
