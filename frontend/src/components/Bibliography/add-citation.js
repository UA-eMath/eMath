import React, { useState } from "react";
import { Input, Icon, List, Row, Col, Button } from "antd";
import { postCitation } from "../../requests/bibliography";

const { TextArea } = Input;

export const AddNewCitation = ({ bibliography }) => {
  const [onClickAdd, setOnClickAdd] = useState(false);
  const [inputKey, setInputKey] = useState("");
  const [inputBibtex, setInputBibtex] = useState("");

  const addCitation = () => {
    setOnClickAdd(true);
  };

  const changeInputKey = ({ target: { value } }) => {
    setInputKey(value);
  };

  const changeInputBibtex = ({ target: { value } }) => {
    setInputBibtex(value);
  };

  const saveNewCitation = () => {
    const citation = { key: inputKey, content: inputBibtex };
    bibliography.push(citation);
    const request_body = JSON.stringify(citation);
    postCitation(request_body);
    setOnClickAdd(false);
  };

  return (
    <div>
      {onClickAdd ? (
        <List key={bibliography.length}>
          <Row>
            <Col span={1} style={{ color: "#0085F9", textAlign: "center" }}>
              {bibliography.length + 1}
            </Col>
            <Col span={10}>
              <TextArea
                placeholder="Please put an unique key here"
                value={inputKey}
                onChange={changeInputKey}
                autosize={{ minRows: 2 }}
              />
            </Col>
            <Col span={11}>
              <TextArea
                placeholder="Please put Bibtex here"
                value={inputBibtex}
                onChange={changeInputBibtex}
                autosize={{ minRows: 5 }}
              />
            </Col>
            <Col span={2}>
              <Icon
                type="save"
                style={{ color: "#0085F9" }}
                onClick={saveNewCitation}
              />
            </Col>
          </Row>
        </List>
      ) : (
        ""
      )}
      <List
        key={bibliography.length + 1}
        style={{ textAlign: "center", marginTop: 16 }}
      >
        <Button type="link" onClick={addCitation} block>
          <Icon type="plus" /> Add Citation
        </Button>
      </List>
    </div>
  );
};
