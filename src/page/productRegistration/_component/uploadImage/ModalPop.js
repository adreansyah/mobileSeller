import React from "react";
import {Text,ButtonLink,Segment} from "@elevenia/master-ui/components/Atom";
import {ModalBody,ModalLite,ModalTitle,ModalHeader,ModalFooter} from "@elevenia/master-ui/components/Molecules";
const ModalPop = props => {
    const {isOpen,setModal,handleImage} = props;
    return (
        <>
            <ModalLite isOpen={isOpen} toggle={setModal} backdrop={true}>
                <ModalHeader>
                    <ModalTitle className="u-tx-center">Tambah Foto Produk</ModalTitle>
                </ModalHeader>
                <ModalBody className="u-tx-center">
                    <Segment>
                        <input
                            multiple
                            onChange={handleImage}
                            type="file"
                            accept="image/*"
                            name="photo"
                            style={{
                                position: "absolute",
                                zIndex: 10,
                                opacity: 0,
                                right: 0,
                                left: 0,
                                bottom:-3,
                                maxWidth: "100%",
                                height:25
                            }} />
                        <Text style={{fontWeight: 500}} color="#bdbdbd">Pilih Dari Gallery</Text>
                    </Segment>
                </ModalBody>
                <ModalFooter>
                    <ButtonLink onClick={setModal} type="button" toggle={setModal}>
                        <Text color="black70">Cancel</Text>
                    </ButtonLink>
                </ModalFooter>
            </ModalLite>
        </>
    );
}
export default ModalPop;