import React,{useEffect,useState} from "react";
import {
  ButtonLink,
  CheckBox,
  Col,
  Container,
  Icon,
  Text,
  Row
} from "@elevenia/master-ui/components/Atom";
const FilterSortBlock = ({
  onOpenFilter,
  onOpenSort,
  onSelectAllChange,
  selected,
  ...props
}) => {
  const {filter} = props.product[props.active];
  const {sort} = props.product[props.active];
  const [filterFlex,setFilterFlex] = useState(false);
  const [sortedFlex,setSortedFlex] = useState(false);
  
  useEffect(() => {
    let setObject = Object.values(filter);
    let summary;
    if(setObject[0] === "" && setObject[1] === "" && setObject[2] === "") {
      summary = false
    }
    else {
      summary = true
    }
    setFilterFlex(summary);
  },[filter])

  useEffect(() => {
    let sorted;
    if(sort === "createdDate,desc") {
      sorted = false;
    }
    else {
      sorted = true
    }
    setSortedFlex(sorted);
  },[sort]);

  let value;
  if(props.active === "displayed") {
    value = {
      col: 7,
      borderLeft: "1px solid black30",
      displays: ""
    }
  }
  else if(props.active === "soldout") {
    value = {
      col: 12,
      borderLeft: "",
      displays: "u-ds-none"
    }
  }
  else if(props.active === "hidden") {
    value = {
      col: 7,
      borderLeft: "1px solid black30",
      displays: ""
    }
  }
  else if(props.active === "periodover") {
    value = {
      col: 12,
      borderLeft: "",
      displays: "u-ds-none"
    }
  }
  else if(props.active === "evaluated") {
    value = {
      col: 12,
      borderLeft: "",
      displays: "u-ds-none"
    }
  }
  return (
    <Container
      bg="white"
      className="u-ps-fixed"
      borderBottom="1px solid black30"
      style={{zIndex: 10,marginTop: "92px"}}
    >
      <Row py={8} px={16} style={{lineHeight: "28px"}}>
        <Col wide={5} className={value.displays}>
          <CheckBox
            checkProps={{
              onChange: e => onSelectAllChange(e),
              name: "item"
            }}
            checkItems={[
              {
                label: `Pilih Semua`,
                value: "checkAll",
                checked: false
              }
            ]}
            selected={selected}
          />
        </Col>
        <Col wide={value.col}>
          <Row>
            <Col px={8} borderLeft={value.borderLeft}>
              <Text textAlign="center">
                <ButtonLink
                  className="u-tx-black40"
                  style={{height: "100%"}}
                  onClick={() => onOpenFilter()}
                >
                  <Icon fillColor={filterFlex ? "green40" : "black40"} name="sort" size={16} />
                  <Text H10>FILTER</Text>
                </ButtonLink>
              </Text>
            </Col>
            <Col px={8} borderLeft="1px solid black30">
              <Text textAlign="center">
                <ButtonLink
                  className="u-tx-black40"
                  style={{height: "100%"}}
                  onClick={() => onOpenSort()}
                >
                  <Icon fillColor={sortedFlex ? "green40" : "black40"} name="filter" size={16} />
                  <Text H10>URUTKAN</Text>
                </ButtonLink>
              </Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default FilterSortBlock;
