import React, { useState, useEffect } from "react";
import { TrayFull } from "@elevenia/master-ui/components/Molecules";
import {
  ButtonLink,
  Icon,
  Button,
  Text,
  Segment,
  Row,
  Col,
  Container
} from "@elevenia/master-ui/components/Atom";
import {
  Header,
  HeaderLeft,
  HeaderBody,
  HeaderRight,
  Footer
} from "@elevenia/master-ui/components/Organisms/Mobile";

const FilterModal = ({
  isOpen,
  params,
  onClose,
  onFilter,
  activeTabs,
  ...props
}) => {

  const [sortList] = useState([
    {
      enum: "REQUEST_GET_QNA_HASNT_REPLIED_YET",
      name: "Belum dibalas"
    }
  ]);
  
  /**
   * Save and Reset Section
   */
  const handleApply = async () => {
    onClose();
  };
  const handleReset = () => {
  };
  const handleClose = () => {
    onClose();
  };
  useEffect(() => {
  }, []);

  return (
    <>
      <TrayFull isOpen={isOpen}>
        <Header fixed border>
          <HeaderLeft>
            <ButtonLink onClick={() => handleClose()}>
              <Icon name="cancel" size="24" fillColor="black50" />
            </ButtonLink>
          </HeaderLeft>
          <HeaderBody>FILTER</HeaderBody>
          <HeaderRight>
            <ButtonLink
              style={{ lineHeight: "24px", height: "24px", marginLeft: "auto" }}
              onClick={() => handleReset()}
            >
              RESET
            </ButtonLink>
          </HeaderRight>
        </Header>
        <Segment
          style={{
            paddingBottom: "96px"
          }}
        >
          <Container>
          <ul className="u-p-0">
            {sortList.map((list, index) => {
              // const checked = list.enum === activeSort
              const lastIndex = sortList.length - 1;
              return (
                <React.Fragment key={index}>
                  <SortListBlock
                    // onClick={() => setActiveSort(list.enum)}
                    name={list.name}
                    // checked={checked}
                    isLastIndex={index === lastIndex}
                  />
                </React.Fragment>
              );
            })}
          </ul>
          </Container>
        </Segment>
        <Footer mobile fixed>
          <Button
            variant={"primary-alt"}
            style={{ width: "100%" }}
            onClick={() => handleApply()}
          >
            TERAPKAN
          </Button>
        </Footer>
      </TrayFull>
    </>
  );
};
const SortListBlock = ({ name, checked, isLastIndex, ...props }) => {
  return (
    <li {...props}>
      <Row
        bg={"white"}
        p={16}
        borderBottom={!isLastIndex && "1px solid black30"}
      >
        <Col wide={9}>
          <Text B14 color="black70">
            {name}
          </Text>
        </Col>
        <Col wide={3} className="u-tx-right" style={{ height: "16px" }}>
          {checked && <Icon name="check" size="16" fillColor="success" />}
        </Col>
      </Row>
    </li>
  );
};

export default FilterModal;
