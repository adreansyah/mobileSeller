import React,{useState,useCallback,useEffect} from "react";
import {Header,HeaderLeft,HeaderRight,HeaderBody,Footer} from '@elevenia/master-ui/components/Organisms/Mobile'
import {Icon,ButtonLink,Segment,Text} from '@elevenia/master-ui/components/Atom';
import {
    TrayFull,
} from '@elevenia/master-ui/components/Molecules'
import Cropper from 'react-easy-crop'
import getCroppedImg from "helper/CroppingImage";
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
const ImageEdit = (props) => {
    const {isOpen,dataOpenEditor,handleAfterEdit,setOpenEditor} = props;
    const [rotation,setRotation] = useState(0)
    const [crop,setCrop] = useState({x: 0,y: 0});
    const [zoom,setZoom] = useState(1);
    const [cropComplete,setCropComplete] = useState(null);

    useEffect(() => {
        isOpen && setRotation(0)
        isOpen && setCrop({x: 0,y: 0});
    },[isOpen]);
    
    const onCropComplete = useCallback((croppedArea,croppedAreaPixels) => {
        setCropComplete(croppedAreaPixels);
    },[]);

    const UpdateImageAfterCrop = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                dataOpenEditor,
                cropComplete,
                rotation
            );
            handleAfterEdit(croppedImage);
            setOpenEditor();
        } catch(e) {
            console.error(e);
        }
    },[rotation,cropComplete,dataOpenEditor,handleAfterEdit,setOpenEditor]);

    return (
        <TrayFull isOpen={isOpen}>
            <Header>
                <HeaderLeft>
                    <ButtonLink type="button" onClick={()=>setOpenEditor()}>
                        <Icon name={'arrow-left'} size={24} fillColor="black50" />
                    </ButtonLink>
                </HeaderLeft>
                <HeaderBody>Edit photo</HeaderBody>
                <HeaderRight>
                    <ButtonLink type="button" onClick={UpdateImageAfterCrop}>
                        <Text color="green50">Simpan</Text>
                    </ButtonLink>
                </HeaderRight>
            </Header>
            <Segment>
                <Cropper
                    image={dataOpenEditor}
                    crop={crop}
                    rotation={rotation}
                    zoom={zoom}
                    aspect={2 / 2}
                    onCropChange={setCrop}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </Segment>
            <Footer style={{display: "block"}} fixed>
                <Segment>
                    <Slider
                        min={0}
                        max={360}
                        value={rotation}
                        orientation='horizontal'
                        step={1}
                        onChange={useCallback((rotation) => setRotation(rotation),[])}
                    />
                </Segment>
            </Footer>
        </TrayFull>
    )
}
export default ImageEdit;