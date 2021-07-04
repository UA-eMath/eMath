import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import BookSetting from "../bookSetting";
import getRoots from "../../requests/GetRoots";
import TexShortcut from "../TexShortcut";
import NewCommand from "../NewCommand";
import CreateTester from "../createTester";

const { TabPane } = Tabs;

export default function SetupPage(props) {
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
    <div>
      <Tabs defaultActiveKey="1" tabPosition={"left"}>
        <TabPane tab={"Book Information"} key={1}>
          <BookSetting book={book} />
        </TabPane>
        <TabPane tab={"Tex Author Assist"} key={2}>
          <TexShortcut book={book} />
        </TabPane>
        <TabPane tab={"New Command"} key={3}>
          <NewCommand book={book} />
        </TabPane>
        <TabPane tab={"Create Test Account"} key={4}>
          <CreateTester book={book} />
        </TabPane>
      </Tabs>
    </div>
  );
}
