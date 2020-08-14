import React, { useState } from "react";
import {
  TrayFull
} from "@elevenia/master-ui/components/Molecules";
import {
  ButtonLink,
  Icon,
  Text,
  Row,
  Col,
  Button,
  Segment
} from "@elevenia/master-ui/components/Atom";
import {
  Header,
  Footer,
  HeaderLeft,
  HeaderBody
} from "@elevenia/master-ui/components/Organisms/Mobile";

const SortModal = ({ isOpen, params, onClose, onSort, activeTabs }) => {
  const [sortList] = useState([
    {
      enum: "QNA_DATE_ASC",
      name: "Q&A Terbaru ke Terlama​"
    },
    {
      enum: "QNA_DATE_DESC",
      name: "Q&A Terlama ke Terbaru​"
    },
    {
      enum: "ORDER_REPLY_ASC",
      name: "Balasan Terbaru ke Terlama"
    },
    {
      enum: "ORDER_REPLY_DESC",
      name: "Balasan Terlama ke Terbaru"
    }
  ]);
  // const [activeSort, setActiveSort] = useState(params.activeSort)

  /**
   * Save and Reset Section
   */
  const handleApply = async () => {
    // const nextParams = {
    //   // ...params,
    //   // activeSort,
    //   page: 0
    // };
    // onSort(nextParams)
    // onClose()
  };
  // useEffect(() => {
  //     setActiveSort(params.activeSort)
  // }, [params])
  return (
    <>
      <TrayFull isOpen={isOpen}>
        <Header fixed border>
          <HeaderLeft>
            <ButtonLink
              onClick={() => {
                // setActiveSort(params.activeSort)
                onClose();
              }}
            >
              <Icon name="cancel" size="24" fillColor="black50" />
            </ButtonLink>
          </HeaderLeft>
          <HeaderBody>Urutkan</HeaderBody>
        </Header>
        <Segment mb="auto">
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

export default SortModal;
