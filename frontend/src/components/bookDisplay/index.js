import React, { useState, useEffect } from "react";
import _ from "lodash";
import CardDeck from "react-bootstrap/CardDeck";
import { Button, Affix } from "antd";
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

  const displayedBook = (type, bookList) => {
    let filteredBookList;
    switch (type) {
      case "Student":
        filteredBookList = _.filter(bookList, function (book) {
          return book.root.completed;
        });
        return filteredBookList;
      case "Tester":
        filteredBookList = _.filter(bookList, function (book) {
          return props.access.book.includes(book.root.id);
        });
        return filteredBookList;
      default:
        return bookList;
    }
  };

  const fetchRoots = () => {
    getRoots().then((data) => {
      if (!data || data.status !== 200) {
        console.error("FETCH_TAGS_FAILED", data);
      } else {
        const bookList = data.data;
        // Consider which book should be displayed
        setData(displayedBook(props.type, bookList));
      }
    });
  };

  const createBookSwitch = (type) => {
    // whether the user can create books
    switch (type) {
      case "Author":
        return true;
      default:
        return false;
    }
  };

  const editModeSwitch = (type) => {
    // whether the user can edit books
    switch (type) {
      case "Author":
        return true;
      case "TA":
        return true;
      default:
        return false;
    }
  };

  const settingSwitch = (type) => {
    // whether the user can change the settings of books
    switch (type) {
      case "Author":
        return true;
      case "TA":
        return true;
      default:
        return false;
    }
  };

  return (
    <React.Fragment>
      <CardDeck style={{ justifyContent: "center" }}>
        {data.map((book) => {
          return (
            <BookCard
              key={book.id}
              book={book}
              editModeActive={editModeSwitch(props.type)}
              settingActive={settingSwitch(props.type)}
            />
          );
        })}
      </CardDeck>

      {createBookSwitch(props.type) ? (
        <div>
          <Affix style={{ position: "fixed", bottom: 20, right: 20 }}>
            <Button
              icon={"plus"}
              shape="circle"
              size={"large"}
              onClick={() => {
                setVisible(true);
              }}
            />
          </Affix>
          <AddBook
            visible={visible}
            onCancel={() => setVisible(false)}
            loading={loading}
            setVisible={setVisible}
            setLoading={setLoading}
            fetchRoots={() => fetchRoots()}
          />
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
