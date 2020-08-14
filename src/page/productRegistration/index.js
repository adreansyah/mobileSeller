import React,{useState,useCallback} from "react";
import {Segment,Row,Col,Text,Icon,CheckBox,Textfield,ButtonGroup,Button} from "@elevenia/master-ui/components/Atom";
import Headers from "./_component/Header";
import ModalPop from "./_component/uploadImage/ModalPop";
import ImageEdit from "./_component/uploadImage/ImageEdit";
import ModalEditImage from "./_component/uploadImage/ModalEditImage";
import SetStock from "./_component/opsionalProduk/SetStock";

const ProductRegistration = (props) => {
    const [useModal,setModal] = useState(false);
    const [isOpenDetailImage,setOpenDetailImage] = useState(false);
    const [tmpImage,setTmpImage] = useState([]);
    const [openEditor,setOpenEditor] = useState(false);
    const [dataOpenEditor,setDataOpenEditor] = useState("");
    const [param,getParamImage] = useState({id: 0,image: ""})
    const [tempCondition,setTempCondition] = useState("");
    const [readyStock,setReadyStock] = useState([]);

    const handleImage = useCallback(e => {
        if(e.target.files[0] !== undefined) {
            const imagesURL = URL.createObjectURL(e.target.files[0]);
            setTempCondition("add");
            setDataOpenEditor(imagesURL);
            setOpenEditor(!openEditor)
            setModal(!useModal);
        }
    },[openEditor,useModal]);

    const handleImageEdit = useCallback(e => {
        if(e.target.files[0] !== undefined) {
            const imagesURL = URL.createObjectURL(e.target.files[0]);
            setTempCondition("edit");
            setDataOpenEditor(imagesURL);
            setOpenEditor(!openEditor);
            setOpenDetailImage(!isOpenDetailImage);
        }
    },[openEditor,isOpenDetailImage]);

    const openDetail = (index,image) => {
        getParamImage({
            id: index,
            image
        })
        setOpenDetailImage(!isOpenDetailImage);
    }

    const handleAfterEdit = useCallback(images => {
        if(tempCondition === "add") {
            setTmpImage([...tmpImage,images]);
        }
        else if(tempCondition === "edit") {
            tmpImage[param.id] = images;
        }
    },[tmpImage,tempCondition,param.id]);

    const handleRemoveimage = (index) => {
        if(index > -1) {
            tmpImage.splice(index,1);
            setOpenDetailImage(!isOpenDetailImage);
        }
    }

    const swapFirstFoto = (index) => {
        let swap = tmpImage[0]
        tmpImage[0] = tmpImage[index];
        tmpImage[index] = swap
        setOpenDetailImage(!isOpenDetailImage);
    }

    const selecItems = (items,value) => {
        let arr = items;
        const idx = items.indexOf(value);
        if(idx >= 0) {
            items.splice(idx,1);
        } else if(idx === -1) {
            items.splice(idx,0,value);
        }
        return arr;
    }

    const handleReadyStock = event => {
        const value = event.target.value;
        const result = selecItems(readyStock,value);
        setReadyStock([...result]);
    };


    return (
        <>
            <Headers />
            <Text pt={16} px={16} pb={8} HB16 color="black70">Foto Produk</Text>
            <form encType="multipart/form-data">
                <Segment bg="white" py={16}>
                    <Row px={16}>
                        {
                            tmpImage.map((item,index) => {
                                return (
                                    <Col onClick={() => openDetail(index,item)} key={index} mr={8} wide={2.7} height={70} className="u-tx-center">
                                        <img style={{maxWidth: "100%",height: 70}} src={item} alt="hello" />
                                        {
                                            index === 0 && tmpImage.length !== 1 &&
                                            <Text style={{
                                                position: "inherit",
                                                color: "white",
                                                fontSize: 12,
                                                bottom: 21,
                                                display: "inline-flex",
                                                paddingTop: 2,
                                                paddingBottom: 2,
                                                paddingLeft: 2,
                                                paddingRight: 3,
                                                background: "green"
                                            }}
                                                className="u-tx-center" color="white">Foto Utama</Text>
                                        }
                                    </Col>
                                )
                            })
                        }
                        {
                            tmpImage.length !== 4 &&
                            <Col onClick={() => setModal(!useModal)} mx={4} height={70} pt={12} wide={2.7} borderRadius={10} border="1px dashed #cccfd2" className="u-tx-center">
                                <Icon name={'image'} size={24} fillColor="#cccfd2" />
                                <Text style={{fontSize: 10}} color="#cccfd2">Tambah Foto</Text>
                            </Col>
                        }
                    </Row>
                </Segment>
                <Text pt={16} px={16} pb={8} HB16 color="black70">Informasi Produk</Text>
                <Segment bg="white" py={16}>
                    <Row px={16}>
                        <Col wide={12} pb={8}>
                            <Text H12 color="black50" pb={8}>JENIS</Text>
                            <CheckBox
                                checkProps={{
                                    onChange: handleReadyStock,
                                    name: "color",
                                    id: "colorBlue"
                                }}
                                checkItems={[
                                    {label: "Ready Stock",value: "blue"}
                                ]}
                                selected={readyStock}
                            />
                        </Col>
                        <Col wide={12} pb={8} pt={8}>
                            <Text H12 color="black50">NAMA</Text>
                            <Textfield
                                model="line"
                                inputProps={{
                                    // onChange: e => handleFormChange(e),
                                    placeholder: 'Masukan Nama Produk',
                                    name: 'produkName',
                                    className: 'validate[required]'
                                }}
                            />
                        </Col>
                        <Col wide={12} pb={8} pt={8}>
                            <Text H12 color="black50">KATEGORI</Text>
                            <Textfield
                                readonly
                                model="line"
                                inputProps={{
                                    // onChange: e => handleFormChange(e),
                                    placeholder: 'Pilih Kategori',
                                    name: 'produkKategori',
                                    className: 'validate[required]'
                                }}
                                right={<Icon name={"chevron-right"} size={16} fillColor="black50" />}
                            />
                        </Col>
                        <Col wide={12} pb={8} pt={8}>
                            <Text H12 color="black50">DESKRIPSI</Text>
                            <Textfield
                                model="line"
                                inputProps={{
                                    // onChange: e => handleFormChange(e),
                                    placeholder: 'Isi Deskripsi Produk',
                                    name: 'produkName',
                                    className: 'validate[required]'
                                }}
                            />
                        </Col>
                    </Row>
                </Segment>
                <Text pt={16} px={16} pb={8} HB16 color="black70">Harga Produk</Text>
                <Segment bg="white" py={16}>
                    <Row px={16}>
                        <Col wide={12} pb={8}>
                            <Text H12 color="black50">HARGA</Text>
                            <Textfield
                                model="line"
                                inputProps={{
                                    // onChange: e => handleFormChange(e),
                                    placeholder: 'Rp 0',
                                    name: 'produkHarga',
                                    className: 'validate[required]'
                                }}
                            />
                        </Col>
                        <Col wide={12} pb={8} pt={8}>
                            <CheckBox
                                checkProps={{
                                    onChange: handleReadyStock,
                                    name: "color",
                                    id: "colorBlue"
                                }}
                                checkItems={[
                                    {label: "Diskon",value: "blue"}
                                ]}
                                selected={readyStock}
                            />
                        </Col>
                        <Col wide={12} pt={8}>
                            <Text H12 color="black50">DISKON SELLER(OPSIONAL)</Text>
                        </Col>
                        <Col wide={4} pr={8} pt={8}>
                            <Textfield
                                readonly
                                model="line"
                                inputProps={{
                                    // onChange: e => handleFormChange(e),
                                    placeholder: '%',
                                    name: 'produkDiskon',
                                    className: 'validate[required]'
                                }}
                                right={<Icon style={{
                                    position: "absolute",
                                    right: 0
                                }} name={"chevron-down"} size={16} fillColor="black50" />}
                            />
                        </Col>
                        <Col wide={8} pl={8} py={8}>
                            <Textfield
                                model="line"
                                inputProps={{
                                    // onChange: e => handleFormChange(e),
                                    placeholder: '0',
                                    name: 'produkDiskonHarga',
                                    className: 'validate[required]'
                                }}
                            />
                        </Col>
                        <Col wide={12} py={8}>
                            <CheckBox
                                checkProps={{
                                    onChange: handleReadyStock,
                                    name: "produkPeriode",
                                    id: "colorBlue"
                                }}
                                checkItems={[
                                    {label: "Periode",value: "blue"}
                                ]}
                                selected={readyStock}
                            />
                        </Col>
                        <Col wide={6} pr={8} pt={8}>
                            <Text H12 color="black50">DARI</Text>
                            <Textfield
                                model="line"
                                inputProps={{
                                    // onChange: e => handleFormChange(e),
                                    placeholder: 'sabtu, 29/02/2020',
                                    name: 'produkDateStart',
                                    className: 'validate[required]'
                                }}
                            />
                        </Col>
                        <Col wide={6} pl={8} py={8}>
                            <Text H12 color="black50">SAMPAI</Text>
                            <Textfield
                                model="line"
                                inputProps={{
                                    // onChange: e => handleFormChange(e),
                                    placeholder: 'sabtu, 29/02/2020',
                                    name: 'produkDateEnd',
                                    className: 'validate[required]'
                                }}
                            />
                        </Col>
                    </Row>
                </Segment>
                <Text pt={16} px={16} pb={8} HB16 color="black70">Keterangan Produk</Text>
                <Segment bg="white" py={16}>
                    <Row px={16}>
                        <Col wide={12} pb={8}>
                            <Text H12 color="black50">OPSI PRODUK(OPSIONAL)</Text>
                            <Textfield
                                model="line"
                                inputProps={{
                                    // onChange: e => handleFormChange(e),
                                    placeholder: 'Tambah Opsi Produk',
                                    name: 'produkOpsional',
                                    className: 'validate[required]'
                                }}
                            />
                        </Col>
                        <Col wide={6} pr={8} pt={8}>
                            <Text H12 color="black50">STOK</Text>
                            <Textfield
                                model="line"
                                inputProps={{
                                    // onChange: e => handleFormChange(e),
                                    placeholder: '0',
                                    name: 'produkStock',
                                    className: 'validate[required]'
                                }}
                            />
                        </Col>
                        <Col wide={6} pl={8} py={8}>
                            <Text H12 color="black50">BERAT(KG)</Text>
                            <Textfield
                                model="line"
                                inputProps={{
                                    // onChange: e => handleFormChange(e),
                                    placeholder: '0',
                                    name: 'produkBerat',
                                    className: 'validate[required]'
                                }}
                            />
                        </Col>
                    </Row>
                </Segment>
                <Text pt={16} px={16} pb={8} HB16 color="black70">Template Pengiriman</Text>
                <Segment bg="white" py={16}>
                    <Row px={16}>
                        <Col wide={12} pb={8}>
                            <Text H12 color="black50">Pilih Pengiriman</Text>
                            <Textfield
                                model="line"
                                inputProps={{
                                    // onChange: e => handleFormChange(e),
                                    placeholder: 'Lokasi Pengiriman',
                                    name: 'produkChoosePengiriman',
                                    className: 'validate[required]'
                                }}
                            />
                        </Col>
                        <Col wide={12} pr={8} pt={8}>
                            <Text H12 color="black50">Informasi Garansi(Opsional)</Text>
                            <Textfield
                                model="line"
                                inputProps={{
                                    // onChange: e => handleFormChange(e),
                                    placeholder: 'Isi Informasi Garansi',
                                    name: 'produkGaransi',
                                    className: 'validate[required]'
                                }}
                            />
                        </Col>
                    </Row>
                </Segment>
                <Segment bg="white" py={16} mt={20}>
                    <Row px={16}>
                        <Col wide={12} borderTop="1px solid #dcdee3">
                            <ButtonGroup responsive>
                                <Button disabled={true} type="button" variant="primary-alt">
                                    SIMPAN PRODUK
                                    </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Segment>
            </form>
            <ModalPop
                isOpen={useModal}
                setModal={(() => setModal(!useModal))}
                handleImage={handleImage}
            />
            <ImageEdit
                {...props}
                isOpen={openEditor}
                dataOpenEditor={dataOpenEditor}
                setOpenEditor={setOpenEditor}
                handleAfterEdit={handleAfterEdit}
            />
            <ModalEditImage
                isOpen={isOpenDetailImage}
                setOpenDetailImage={setOpenDetailImage}
                param={param}
                handleImage={handleImageEdit}
                handleRemoveimage={handleRemoveimage}
                swapFirstFoto={swapFirstFoto}
            />
            <SetStock />
        </>
    )
}

export default ProductRegistration