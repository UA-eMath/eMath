import React, { useState, useEffect } from "react";
import CardDeck from "react-bootstrap/CardDeck";
import { Button } from "antd";
import "./index.css";
import "antd/dist/antd.css";
import getRoots from "../../requests/GetRoots";
import AddBook from "./addBookModal";
import BookCard from "./bookCard";

export default function BookDisplay(props) {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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
          return <BookCard book={book} />;
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
