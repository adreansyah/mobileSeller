import React from "react";
import {Icon,Text,Col,Row} from "@elevenia/master-ui/components/Atom";
import FloatingButton from "./_component/FloatingButton";

const BtnAddDisplay = props => {
    return (
        <Row>
            <Col className="u-ds-flex u-js-center">
                <FloatingButton onClick={() => props.handleHideOpen()}>
                    <Icon name="visible" size="24" fillColor="black50" />
                    <Text H14 color="black50" ml={8} style={{lineHeight: "26px"}}>
                        TAMPILKAN
                    </Text>
                </FloatingButton>
            </Col>
        </Row>
    );
};

export default BtnAddDisplay;
