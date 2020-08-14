import React,{useState,useCallback} from "react";
import {Header,HeaderLeft,HeaderRight,HeaderBody,Footer} from '@elevenia/master-ui/components/Organisms/Mobile'
import {Icon,ButtonLink,Segment,ButtonGroup,Button,Text,Row,Col,Textfield,Tag,FormControl} from '@elevenia/master-ui/components/Atom';
import {
    TrayFull,
} from '@elevenia/master-ui/components/Molecules'
import {validateInput} from 'helper';
import SetCombinationStock from './SetCombinationStock';

const SetStock = (props) => {
    const [changeValue,setChangeValue] = useState([{
        names: "",
        options: "",
        label: []
    }]);

    const [isActive,setActive] = useState(true);
    const [isOpen,setOpenModal] = useState(false);

    const addOption = useCallback(() => {
        setChangeValue((prev) => {
            return [...prev,{
                names: "",
                options: "",
                label: []
            }]
        });
        setActive(true);
    },[])

    const removeOption = useCallback((index) => {
        if(index > -1) {
            changeValue.splice(index,1);
        }
        setChangeValue([
            ...changeValue,
        ]);
    },[changeValue])

    const handleChange = (e,index) => {
        const {value,name} = e.target
        const naming = name.replace(`[${index}]`,"");
        changeValue[index][naming] = value;
        setChangeValue([
            ...changeValue,
        ]);
        validateInput('set-stock',name);
        changeValue.forEach((item,key) => {
            if(key === index) {
                if(item.names !== "" && item.label.length !== 0) {
                    setActive(false);
                }
                else {
                    setActive(true);
                }
            }
        });
    }

    const handleKeyDown = (e,index) => {
        if(e.keyCode === 32) {
            changeValue[index]["label"] = [...changeValue[index]["label"],changeValue[index]["options"]];
            changeValue[index]["options"] = "";
            setChangeValue([
                ...changeValue,
            ]);
        }
    }

    const removeLabel = (e,index,keyRemove) => {
        e.preventDefault();
        if(keyRemove > -1) {
            changeValue[index].label.splice(keyRemove,1);
        }
        setChangeValue([
            ...changeValue,
        ]);
    }

    const SetStock = () => {
        setOpenModal(!isOpen)
    }

    return (
        <TrayFull isOpen={true}>
            <Header border fixed>
                <HeaderLeft>
                    <ButtonLink type="button" >
                        <Icon name={'arrow-left'} size={24} fillColor="black50" />
                    </ButtonLink>
                </HeaderLeft>
                <HeaderBody>Atur Stock</HeaderBody>
                <HeaderRight>
                    {
                        changeValue.length <= 2 &&
                        <ButtonLink type="button" onClick={addOption}>
                            <Icon name={'plus'} size={24} fillColor="black50" />
                        </ButtonLink>
                    }
                </HeaderRight>
            </Header>
            <form id="set-stock">
                <Segment mb={20}>
                    {
                        changeValue.map((item,index) => {
                            const condition = changeValue[index].label.length === 0 ? "none" : "inline-block";
                            return (
                                <Segment key={index}>
                                    <Row>
                                        <Col wide={6}>
                                            <Text style={{fontWeight: 500}} HB16 py={16} px={16} color="black70">Opsi Produk {index + 1}</Text>
                                        </Col>
                                        <Col wide={6} className="u-tx-right">
                                            {
                                                index > 0 ?
                                                    <ButtonLink type="button" onClick={() => removeOption(index)}>
                                                        <Text HB16 py={16} px={16} color="green50">Hapus</Text>
                                                    </ButtonLink> : ""
                                            }
                                        </Col>
                                    </Row>
                                    <Segment bg="white" px={16} py={16}>
                                        <Row>
                                            <Col wide={12}>
                                                <Text HB16 color="black50">Nama Opsi</Text>
                                                <FormControl>
                                                    <Textfield
                                                        model="line"
                                                        inputProps={{
                                                            onChange: (e) => handleChange(e,index),
                                                            placeholder: 'Contoh Opsi : Warna, Ukuran',
                                                            name: `names[${index}]`,
                                                            value: changeValue[index].names,
                                                            className: 'validate[required]',
                                                            autoComplete: "off"
                                                        }}
                                                    />
                                                </FormControl>
                                            </Col>
                                            <Col wide={12} pt={8}>
                                                <Text HB16 pt={8} color="black50">Detail Opsi</Text>
                                                <Segment pt={8} style={{display: condition}}>
                                                    {
                                                        changeValue[index].label.map((item,key) => {
                                                            return (
                                                                <React.Fragment key={key}>
                                                                    <span
                                                                        onClick={(e) => removeLabel(e,index,key)}
                                                                        style={{marginRight: 10,display: "inherit",marginBottom: 10}}>
                                                                        <Tag remove>{item}</Tag>
                                                                    </span>
                                                                </React.Fragment>
                                                            )
                                                        })
                                                    }
                                                </Segment>
                                                <FormControl>
                                                    <Textfield
                                                        model="line"
                                                        inputProps={{
                                                            onKeyDown: (e) => handleKeyDown(e,index),
                                                            onChange: (e) => handleChange(e,index),
                                                            placeholder: 'Contoh Detail : Merah, Kuning, Hijau',
                                                            name: `options[${index}]`,
                                                            value: changeValue[index].options.replace(/\s/g,''),
                                                            className: 'validate[required]',
                                                            autoComplete: "off"
                                                        }}
                                                    />
                                                </FormControl>
                                            </Col>
                                        </Row>
                                    </Segment>
                                </Segment>
                            )
                        })
                    }
                </Segment>
                <Footer style={{display: "block"}} mt={20} fixed>
                    <Segment>
                        <ButtonGroup responsive>
                            <Button disabled={isActive} type="button" onClick={() => SetStock()} variant="primary-alt">
                                Atur Stock
                        </Button>
                        </ButtonGroup>
                    </Segment>
                </Footer>
            </form>
            <SetCombinationStock data={changeValue} isOpen={isOpen} setOpenModal={() => setOpenModal(!isOpen)} />
        </TrayFull>
    )
}
export default SetStock;