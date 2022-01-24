import React from "react";
import { Card, Icon, Tooltip, Empty } from "antd";
import "../index.css";
import "antd/dist/antd.css";

const { Meta } = Card;

export default class BookCard extends React.Component {
  authors = (book) => {
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
  render() {
    const { book, editModeActive, settingActive } = this.props;
    const authorList = this.authors(book);
    const coverContent =
      book.root.cover_image === null || book.root.cover_image === "" ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          imageStyle={{ width: 240, height: 200 }}
          description={false}
        />
      ) : (
        <img
          alt="example"
          style={{
            width: 234,
            height: 200,
            objectFit: "scale-down",
          }}
          src={book.root.cover_image}
          onClick={() => {
            window.location.href = "/view/" + book.title + "/" + book.id;
          }}
        />
      );
    const actionList = [];

    if (editModeActive) {
      actionList.push(
        <Icon
          type="edit"
          key="edit"
          onClick={() => {
            window.location.href = "/authoring/" + book.id;
          }}
        />
      );
    }
    if (settingActive) {
      actionList.push(
        <Icon
          type="setting"
          key="setting"
          onClick={() => {
            window.location.href = "/setup/" + book.id;
          }}
        />
      );
    }

    return (
      <Tooltip title={book.title} placement="bottom">
        <Card
          hoverable
          style={{
            width: 240,
            margin: 4,
            border: "3px ridge #e8e8e8",
          }}
          cover={coverContent}
          actions={actionList}
        >
          <Meta title={book.title} description={authorList} />
        </Card>
      </Tooltip>
    );
  }
}
