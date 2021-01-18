import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import TopNav from "./../../components/topNav";
import { Layout, Tabs } from "antd";
import BookSetting from "../bookSetting";
import getRoots from "../../requests/GetRoots";
import TexShortcut from "../TexShortcut";
import NewCommand from "../NewCommand";

const { TabPane } = Tabs;

export default function SetupPage(props) {
  const { Content } = Layout;

  const rootId = props.match.params.id;
  const [book, setBook] = useState({});

  useEffect(() => {
    fetchRoot();
  }, []);

  const fetchRoot = () => {
    getRoots({ rootId }).then((data) => {
      if (!data || data.status !== 200) {
        console.error("FETCH_TAGS_FAILED", data);
      } else {
        setBook(data.data);
      }
    });
  };

  return (
    <Layout>
      <TopNav />
      <Content>
        <Tabs defaultActiveKey="1" tabPosition={"left"}>
          <TabPane tab={"Book information"} key={1}>
            <BookSetting book={book} />
          </TabPane>
          <TabPane tab={"Tex shortcut"} key={2}>
            <TexShortcut book={book} />
          </TabPane>
          <TabPane tab={"New command"} key={3}>
            <NewCommand book={book} />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
}
