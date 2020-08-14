import React,{useState,useEffect} from "react";
import {Header,HeaderLeft,HeaderBody,Footer} from '@elevenia/master-ui/components/Organisms/Mobile'
import {Icon,ButtonLink,Segment,ButtonGroup,Button,Table,Textfield,Text} from '@elevenia/master-ui/components/Atom';
import {
    TrayFull,
} from '@elevenia/master-ui/components/Molecules'
import {pola1,pola2,pola3} from './setPola';
const SetCombinationStock = (props) => {
    const [getPola,setPola] = useState([]);
    useEffect(() => {
        if(props.data.length === 1) {
            setPola(pola1(props.data));
        }
        else if(props.data.length === 2) {
            setPola(pola2(props.data));
        }
        if(props.data.length === 3) {
            setPola(pola3(props.data));
        }
    },[props.data]);

    console.log(getPola);
    return (
        <TrayFull isOpen={props.isOpen}>
            <Header border fixed>
                <HeaderLeft>
                    <ButtonLink type="button" onClick={props.setOpenModal}>
                        <Icon name={'arrow-left'} size={24} fillColor="black50" />
                    </ButtonLink>
                </HeaderLeft>
                <HeaderBody>Kombinasi Opsi Produk</HeaderBody>
            </Header>
            <form id="set-stock">
                {/* {
                    getPola.map((item,index) => {
                        return (
                            <Segment key={index} mt={20}>
                                <Table p={16} width="100%" >
                                    <thead>
                                        <tr>
                                            <th>{item.names}</th>
                                            <th>Stock</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            item.pola.map((item,index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.result}</td>
                                                        <td>
                                                            <Textfield model="line" />
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Segment>
                        )
                    })
                } */}
                {
                    getPola.map((item,index) => {
                        return (
                            <Segment key={index} mt={20}>
                                <Text style={{fontWeight: 500}} HB16 px={16} pb={8}>{item.names}</Text>
                                <Table p={16} width="100%" >
                                    <thead>
                                        <tr>
                                            <th>{item.setField}</th>
                                            <th>Stock</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            item.pola.map((item,index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.result}</td>
                                                        <td>
                                                            <Textfield model="line" />
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Segment>
                        )
                    })
                }
                <Footer style={{display: "block"}} mt={20} fixed>
                    <Segment>
                        <ButtonGroup responsive>
                            <Button type="button" variant="primary-alt">
                                Atur Stock
                        </Button>
                        </ButtonGroup>
                    </Segment>
                </Footer>
            </form>
        </TrayFull>
    )
}
export default SetCombinationStock;