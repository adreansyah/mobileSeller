import React,{useState} from 'react'
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
  Row,
  Textfield
} from '@elevenia/master-ui/components/Atom'
import {validateInput,validateForm,validateFormClear} from 'helper';

const HideTray = ({isOpen,onClose,...props}) => {
  const {RequestHiddenProduct,RequestShowProduct,setSelectedAll} = props;
  const [descriptionForm,setDescriptionForm] = useState({
    description: "",
  });

  const handleChange = e => {
    const {name,value} = e.target;
    setDescriptionForm(descriptionForm => ({
      ...descriptionForm,
      [name]: value
    }));
    validateInput("description-form",name);
  }

  const handleClose = () => {
    validateFormClear("description-form");
    setDescriptionForm({
      description: ""
    });
    onClose();
  }
  const handleHide = (e) => {
    e.preventDefault();
    let arr = [];
    const data = props.selected.concat(...props.ishiddenData)
    for(let i = 0; i < data.length; i++) {
      if(arr.indexOf(data[i]) === -1) {
        arr.push(data[i]);
      }
    }

    if(validateForm("description-form",true,false)) {
      const {description} = descriptionForm;
      props.isShould === "hidden" && RequestHiddenProduct(arr,description);
      props.isShould === "showed" && RequestShowProduct(arr,description);
      setDescriptionForm({
        description: ""
      });
      setSelectedAll();
      onClose();
    }
  }

  return (
    <>
      <Tray isOpen={isOpen} overlayClick={() => onClose()}>
        <form id="description-form" onSubmit={(e) => handleHide(e)}>
          <TrayHeader>
            <TrayTitle>Produk Anda akan {props.isShould === "hidden" ? "disembunyikan" : "ditampilkan"}</TrayTitle>
          </TrayHeader>
          <TrayContent className="u-px-16 u-py-8">
            <Textfield
              model="line"
              inputProps={{
                onChange: e => handleChange(e),
                placeholder: "Beritahu kami alasannya...",
                name: "description",
                className: "validate[required]",
                value: descriptionForm.description
              }} />

          </TrayContent>
          <TrayFooter fixed>
            <Row>
              <Col pr={4}>
                <Button
                  type={'button'}
                  variant={'secondary'}
                  className={"u-wd-full"}
                  onClick={() => handleClose()}
                >
                  BATAL
              </Button>
              </Col>
              <Col pl={4}>
                <Button
                  type="submit"
                  variant={'primary-alt'}
                  style={{width: '100%'}}
                >
                  {props.isShould === "hidden" ? "SEMBUNYIKAN" : "TAMPILKAN"}
                </Button>
              </Col>
            </Row>
          </TrayFooter>
        </form>
      </Tray>
    </>
  )
}

export default HideTray
