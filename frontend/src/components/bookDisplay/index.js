import React, { useState, useEffect } from "react";
import CardDeck from "react-bootstrap/CardDeck";
import { Button, Card, Icon, Tooltip } from "antd";
import "./index.css";
import "antd/dist/antd.css";
import getRoots from "../../requests/getRoots";
import AddBook from "./addBookModal";

export default function BookDisplay(props) {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { Meta } = Card;

  useEffect(() => {
    fetchRoots();
  }, []);

  const fetchRoots = () => {
    getRoots().then((data) => {
      if (!data || data.status !== 200) {
        console.error("FETCH_TAGS_FAILED", data);
      } else {
        setData(data.data);
      }
    });
  };

  return (
    <React.Fragment>
      <CardDeck style={{ justifyContent: "center" }}>
        {data.map((book) => {
          const authorList = authors(book);
          return (
            <Tooltip title={book.title} placement="bottom" key={book.id}>
              <div>
                <Card
                  hoverable
                  style={{ width: 300, margin: 20 }}
                  cover={
                    <img
                      alt="example"
                      src="https://images-na.ssl-images-amazon.com/images/I/419zQEc-u4L._SX384_BO1,204,203,200_.jpg"
                      onClick={() => {
                        window.location.href =
                          "/view/" + book.title + "/" + book.id;
                      }}
                    />
                  }
                  actions={[
                    <Icon
                      type="setting"
                      key="setting"
                      onClick={() => {
                        window.location.href = "/setup/" + book.id;
                      }}
                    />,
                    <Icon
                      type="edit"
                      key="edit"
                      onClick={() => {
                        window.location.href = "/authoring/" + book.id;
                      }}
                    />,
                    <Icon
                      type="read"
                      key="read"
                      onClick={() => {
                        window.location.href =
                          "/view/" + book.title + "/" + book.id;
                      }}
                    />,
                  ]}
                >
                  <Meta title={book.title} description={authorList} />
                </Card>
              </div>
            </Tooltip>
          );
        })}
      </CardDeck>

      <Button
        icon={"plus"}
        shape="circle"
        size={"large"}
        onClick={() => {
          setVisible(true);
        }}
      />

      <AddBook
        visible={visible}
        onCancel={() => setVisible(false)}
        loading={loading}
        setVisible={setVisible}
        setLoading={setLoading}
        fetchRoots={() => fetchRoots()}
      />
    </React.Fragment>
  );
}

let authors = (book) => {
  let description = "";

  if (book.root.author === null) {
    return "";
  }

  let author_array = [book.root.author];

  for (let key in author_array) {
    description += author_array[key].first_name + " ";
    let md = author_array[key].middle_name;
    description += !md ? "" : md + " ";
    description += author_array[key].last_name + " ";
  }

  return description;
};
