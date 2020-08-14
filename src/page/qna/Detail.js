import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getQnaDetail, clearQnaData } from "store/actions/qna";
import {
  ButtonLink,
  Icon,
  Row,
  Container,
  Col,
  Segment,
  Text,
  Textfield
} from "@elevenia/master-ui/components/Atom";
import {
  Header,
  HeaderBody,
  HeaderRight,
  HeaderLeft,
  Footer
} from "@elevenia/master-ui/components/Organisms/Mobile";
import moment from "moment";
import { trackScreenView } from "helper/Tracker";

const QnaDetail = props => {
  const { getQnaDetail, clearQnaData, qna } = props;
  const { detail } = qna;
  const header = detail.data.length > 0 ? detail.data[0].header : {};
  const topicId = props.paramShort[0];

  useEffect(() => {
    trackScreenView("Q&A Detail", "qna-detail-id");
  }, []);

  useEffect(() => {
    getQnaDetail(topicId);
    return () => {
      clearQnaData("detail");
    };
  }, [getQnaDetail, clearQnaData, topicId]);
  // console.log("qna-detail", qna);
  return (
    <div className="u-ps-relative height--100">
      <Container>
        <Header>
          <HeaderLeft>
            <ButtonLink onClick={() => props.history.goBack()}>
              <Icon fillColor="black50" name="arrow-left" size={24} />
            </ButtonLink>
          </HeaderLeft>
          <HeaderBody>
            <Text H16>Detail Q&A</Text>
          </HeaderBody>
          <HeaderRight>
            <ButtonLink>
              <Icon fillColor={"black50"} name={"more"} size={24} />
            </ButtonLink>
          </HeaderRight>
        </Header>
        <Segment flexDirection="column" bg="white" px={16} py={8}>
          <Row alignItems="center">
            <Col flex="0">
              <Segment borderRadius={4} alignItems="center">
                <img
                  alt=""
                  width={36}
                  src={`${process.env.REACT_APP_CDN_URL}${header.urlPath}`}
                  className="u-rnd"
                />
              </Segment>
            </Col>
            <Col ml={12}>
              <Segment flexDirection="column">
                <Text B14 color="black70">
                  {header.productName}
                </Text>
                <Text B12 color="black50">
                  No produk: {header.productId}
                </Text>
              </Segment>
            </Col>
            <Col flex="0" ml="auto">
              <Segment bg="green30" borderRadius={4} px={4}>
                <ButtonLink>
                  <Text B10B color="white">
                    PUBLIK
                  </Text>
                </ButtonLink>
              </Segment>
            </Col>
          </Row>
        </Segment>
        <Segment p={16}>
          {detail.isLoaded &&
            detail.data.length > 0 &&
            detail.data.map((data, index) => {
              const { isSeller, position } = data;
              const boxStyle = {
                minWidth: 150,
                margin: isSeller
                  ? `${position === "first" ? "16px" : "4px"} 0px 0px 24px`
                  : `${position === "first" ? "16px" : "4px"} 24px 0px 0px`,
                wordBreak: "break-all",
                textAlign: "right"
              };
              let borderTopRightRadius,
                borderTopLeftRadius,
                borderBottomRightRadius,
                borderBottomLeftRadius;
              if (position === "first") {
                borderTopRightRadius = isSeller ? 16 : 16;
                borderTopLeftRadius = isSeller ? 16 : 16;
                borderBottomRightRadius = isSeller ? 0 : 16;
                borderBottomLeftRadius = isSeller ? 16 : 0;
              } else if (position === "middle") {
                borderTopRightRadius = isSeller ? 16 : 16;
                borderTopLeftRadius = isSeller ? 16 : 16;
                borderBottomRightRadius = isSeller ? 16 : 16;
                borderBottomLeftRadius = isSeller ? 16 : 16;
              } else {
                borderTopRightRadius = isSeller ? 0 : 16;
                borderTopLeftRadius = isSeller ? 16 : 0;
                borderBottomRightRadius = isSeller ? 16 : 16;
                borderBottomLeftRadius = isSeller ? 16 : 16;
              }
              return (
                <React.Fragment key={index}>
                  {/* "seller :borderTopRightRadius, borderBottomRightRadius" */}
                  {/* "buyer :borderTopLeftRadius, borderBottomLeftRadius" */}
                  <Row justifyContent={isSeller ? "flex-end" : "flex-start"}>
                    <Segment
                      position="relative"
                      bg={isSeller ? "orange20" : "white"}
                      m={boxStyle.margin}
                      p={8}
                      style={boxStyle}
                      borderRadius={16}
                      borderTopRightRadius={borderTopRightRadius}
                      borderTopLeftRadius={borderTopLeftRadius}
                      borderBottomRightRadius={borderBottomRightRadius}
                      borderBottomLeftRadius={borderBottomLeftRadius}
                    >
                      <Row>
                        <Text P14 color={isSeller ? "white" : "black70"}>
                          {data.message}
                        </Text>
                      </Row>
                      <Row justifyContent="right" mt={4}>
                        <Text B10 color={isSeller ? "white" : "black40"}>
                          {moment
                            .utc(data.boardDate, "YYYY-MM-DDTHH:mm:ssZ")
                            .format("HH:mm")}
                        </Text>
                      </Row>
                      {isSeller && (
                        <Segment
                          position="absolute"
                          left={-24}
                          top={"50%"}
                          style={{ transform: "translateY(-50%" }}
                        >
                          <ButtonLink>
                            <Icon
                              name="delete"
                              size="small"
                              fillColor="black50"
                            />
                          </ButtonLink>
                        </Segment>
                      )}
                    </Segment>
                  </Row>
                </React.Fragment>
              );
            })}
        </Segment>
        <Footer mobile fixed>
          <Segment width="100%">
            <Textfield
              inputProps={{
                // onChange: e => handleInput(e),
                // value: searchKeyword,
                // ref: textInputRef
                placeholder: "Balas pertanyaan..."
              }}
            />
          </Segment>
        </Footer>
      </Container>
    </div>
  );
};

const mapStateToProps = ({ qna }) => ({
  qna
});

const mapDispatchToProps = { getQnaDetail, clearQnaData };
export default connect(mapStateToProps, mapDispatchToProps)(QnaDetail);
