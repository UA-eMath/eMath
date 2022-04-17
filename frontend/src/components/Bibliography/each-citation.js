import React, { useState } from "react";
import { Input, Icon, List, Row, Col, Modal } from "antd";
import { putCitation, removeCitation } from "../../requests/bibliography";

const { confirm } = Modal;
const { TextArea } = Input;

export const EachCitation = ({ index, bibliography }) => {
  const [inputKey, setInputKey] = useState(bibliography[index].key);
  const [inputBibtex, setInputBibtex] = useState(bibliography[index].content);
  const [onClickEdit, setOnClickEdit] = useState(false);
  const [visible, setVisible] = useState(true);

  const changeInputKey = ({ target: { value } }) => {
    setInputKey(value);
  };

  const changeInputBibtex = ({ target: { value } }) => {
    setInputBibtex(value);
  };

  const showInputBox = () => {
    setOnClickEdit(true);
  };

  const saveUpdatedCitation = () => {
    bibliography[index].key = inputKey;
    bibliography[index].content = inputBibtex;
    putCitation(bibliography[index]);
    setOnClickEdit(false);
  };

  const deleteCitation = () => {
    confirm({
      title: "Are you sure delete this citation?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        removeCitation({ bbID: bibliography[index].id });
        setVisible(false);
      },
      onCancel() {},
    });
  };

  const editOrSave = onClickEdit ? (
    <Icon
      type="save"
      style={{ color: "#0085F9" }}
      onClick={saveUpdatedCitation}
    />
  ) : (
    <Icon type="edit" style={{ color: "#0085F9" }} onClick={showInputBox} />
  );

  const content = onClickEdit ? (
    <>
      <Col span={10}>
        <TextArea value={inputKey} onChange={changeInputKey} autosize />
      </Col>
      <Col span={11}>
        <TextArea value={inputBibtex} onChange={changeInputBibtex} autosize />
      </Col>
    </>
  ) : (
    <>
      <Col span={10}>{inputKey}</Col>
      <Col span={11}>{inputBibtex}</Col>
    </>
  );

  return visible ? (
    <List key={index}>
      <Row>
        <Col span={1} style={{ color: "#0085F9", textAlign: "center" }}>
          {index + 1}
        </Col>
        {content}
        <Col span={1}>{editOrSave}</Col>
        <Col span={1}>
          <Icon
            type="delete"
            style={{ color: "#ED5C57" }}
            onClick={deleteCitation}
          />
        </Col>
      </Row>
    </List>
  ) : (
    ""
  );
};
