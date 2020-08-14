import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  setActiveTab,
  getQnaCounter,
  getQnaList,
  clearQnaData
} from "store/actions/qna";
import {
  ButtonLink,
  Icon,
  Row,
  Col,
  Segment,
  Text
} from "@elevenia/master-ui/components/Atom";
import { Link } from "react-router-dom";
import { Tabs } from "@elevenia/master-ui/components/Molecules";
import Header from "./_component/Header";
import FilterModal from "./_component/FilterModal";
import SortModal from "./_component/SortModal";
import moment from "moment";
import { trackScreenView } from "helper/Tracker";

const Qna = props => {
  const tabs = [
    {
      uri: "public",
      name: "Publik"
    },
    {
      uri: "private",
      name: "Private"
    }
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].uri); // default
  const { getQnaCounter, getQnaList, clearQnaData, qna, profile } = props;
  const { counter, list } = qna;
  // const { activeTab } = list
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // const handleChangeTabs = uri => {
  //   props.history.push(`/qna/${uri}`);
  // };

  // const getContent = activeTab => {
  //   switch (activeTab) {
  //     case "displayed":
  //       return <Displayed />;
  //     default:
  //       return;
  //   }
  // };
  // console.log("qna", qna);

  useEffect(() => {
    trackScreenView("Q&A", "qna-id");
  }, []);

  useEffect(() => {
    getQnaCounter();
    getQnaList("public", { ...list.public.params, isPrivate: false });
    getQnaList("private", { ...list.private.params, isPrivate: true });
    return () => {
      clearQnaData("list");
    };
  }, [
    getQnaCounter,
    getQnaList,
    clearQnaData,
    list.public.params,
    list.private.params
  ]);

  return (
    <div className="u-ps-relative height--100">
      <Segment width="100%" position="fixed" top={0} bg="white" zIndex="1020">
        <Segment position="relative">
          <Header history={props.history} />
          <Tabs
            bg="white"
            active={activeTab}
            onChange={active => setActiveTab(active)}
            tabsMargin="4"
            underlineSize={2}
          >
            {tabs.map(list => {
              return (
                <div key={list.uri} className="u-tx-center">
                  {list.name} ({!counter.loading ? counter.data[list.uri] : "-"}
                  )
                </div>
              );
            })}
          </Tabs>
          <Segment bg="white" borderBottom="1px solid black30">
            <Row py={8}>
              <Col py={8} px={8}>
                <Text textAlign="center">
                  <ButtonLink onClick={() => setIsFilterOpen(true)}>
                    <Icon fillColor="black40" name="sort" size={16} />
                    <Text H10 color="black40">
                      FILTER
                    </Text>
                  </ButtonLink>
                </Text>
              </Col>
              <Col py={8} px={8} borderLeft="1px solid black30">
                <Text textAlign="center">
                  <ButtonLink onClick={() => setIsSortOpen(true)}>
                    <Icon fillColor="black40" name="filter" size={16} />
                    <Text H10 color="black40">
                      URUTKAN
                    </Text>
                  </ButtonLink>
                </Text>
              </Col>
            </Row>
          </Segment>
          <FilterModal
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />
          <SortModal isOpen={isSortOpen} onClose={() => setIsSortOpen(false)} />
        </Segment>
      </Segment>

      <Segment position="relative" top={131}>
        {list[activeTab].isLoaded &&
          list[activeTab].data.content &&
          list[activeTab].data.content.map((data, index) => (
            <React.Fragment key={index}>
              <Segment bg="white" p={12} mt={8}>
                <Row>
                  <Col>
                    <Segment
                      as={Link}
                      display="inline-block"
                      to={`/qna/detail/${data.topicId}`}
                    >
                      <Row>
                        <Col flex="0">
                          <Segment borderRadius={4}>
                            <img
                              alt=""
                              width={36}
                              src={`${process.env.REACT_APP_CDN_URL}${data.urlPath}`}
                              className="u-rnd"
                            />
                          </Segment>
                        </Col>
                        <Col ml={12}>
                          <Segment flexDirection="column">
                            <Text B14 color="black70">
                              {data.productName}
                            </Text>
                            <Text B12 color="black50">
                              No produk: {data.productId}
                            </Text>
                          </Segment>
                        </Col>
                      </Row>
                    </Segment>
                  </Col>
                  <Col wide={1} ml="auto" justifyContent="flex-end">
                    <ButtonLink>
                      <Icon name="more" size="small" fillColor="black50" />
                    </ButtonLink>
                  </Col>
                </Row>
                <Row justifyContent="space-between" mt={4}>
                  <Text B10B>{data.senderName}</Text>
                  <Segment flexDirection="row" alignItems="center">
                    {!data.lastMessage && (
                      <Segment
                        display="inline-block"
                        width={8}
                        height={8}
                        borderRadius="50%"
                        bg="red30"
                        mr={8}
                      />
                    )}
                    <Text B10>
                      {moment.utc(data.boardDate, "YYYY-MM-DDTHH:mm:ssZ").format("HH:mm")}
                    </Text>
                  </Segment>
                </Row>
                <Row mt={4}>
                  <Text P14 color="black70">
                    {data.message}
                  </Text>
                </Row>
                {data.commentNumber === 0 && data.lastMessage === null && (
                  <Row alignItems="center">
                    <img
                      alt=""
                      width={20}
                      src={`${process.env.REACT_APP_CDN_URL}${profile.data.storeLogo}`}
                      className="u-fl-left"
                    />
                    <Text B12 color="black50">
                      Balas pertanyaan...
                    </Text>
                  </Row>
                )}
                {data.commentNumber >= 2 && (
                  <Row mt={16}>
                    <Text
                      B12
                      color="green30"
                      to={`/qna/detail/${data.topicId}`}
                    >
                      Lihat {data.commentNumber} balasan sebelunya...
                    </Text>
                  </Row>
                )}
                {data.lastMessage !== null && (
                  <Segment bg="black20" borderRadius={10} p={12} mt={16}>
                    <Row justifyContent="space-between">
                      <Text B10B>{data.lastMessage.senderName}</Text>
                      <Segment flexDirection="row" alignItems="center">
                        {!data.lastMessage.isSeller && (
                          <Segment
                            display="inline-block"
                            width={8}
                            height={8}
                            borderRadius="50%"
                            bg="red30"
                            mr={8}
                          />
                        )}
                        <Text B10>
                          {moment.utc(data.lastMessage.boardDate, "YYYY-MM-DDTHH:mm:ssZ").format("HH:mm")}
                        </Text>
                      </Segment>
                    </Row>
                    <Row>
                      <Text B10 color="black50">
                        {data.lastMessage.message}
                      </Text>
                    </Row>
                  </Segment>
                )}
              </Segment>
            </React.Fragment>
          ))}
      </Segment>
    </div>
  );
};

const mapStateToProps = ({ qna, profile }) => ({
  qna,
  profile
});

const mapDispatchToProps = {
  setActiveTab,
  getQnaCounter,
  getQnaList,
  clearQnaData
};
export default connect(mapStateToProps, mapDispatchToProps)(Qna);
