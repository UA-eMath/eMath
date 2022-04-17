import React, { useState, useEffect } from "react";
import { Modal, Select, Card, Input } from "antd";
import { getBibliography } from "../../requests/bibliography";

const { Option } = Select;

export const InsertCitationModal = ({
  visible,
  highlightedText,
  updateCitation,
  handleModalVisiblility,
  citationTextChange,
}) => {
  const [bibliographyDB, setBibliographyDB] = useState([]);
  const [selectedCitation, setSelectedCitation] = useState();
  const [previewContent, setPreviewContent] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  useEffect(() => {
    getBibliography().then((bb) => {
      const _bibliographyDB = bb.data;
      if (bibliographyDB.length !== _bibliographyDB.length) {
        setBibliographyDB(_bibliographyDB);
      }
    });
  }, [bibliographyDB]);

  const handleModalOk = () => {
    updateCitation(selectedCitation.id);
    handleModalVisiblility();
  };

  const handleModalCancel = () => {
    handleModalVisiblility();
  };

  const onSelectCitation = (index, option) => {
    const bb = bibliographyDB[index];
    setSelectedCitation(bb);
    setPreviewTitle(bb.key);
    setPreviewContent(bb.content);
  };

  const citationTextOnChange = ({ target: { value } }) => {
    citationTextChange(value);
  };

  return (
    <div>
      <Modal
        title="Insert Citation"
        visible={visible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        {/* TODO: add new citation shortcut  */}
        <div style={{ margin: "1em" }}>
          Text to display:{" "}
          <Input
            style={{ width: 300 }}
            defaultValue={highlightedText}
            onChange={citationTextOnChange}
          />
          {/* select citation */}
          <Select
            showSearch
            allowClear={true}
            style={{ width: 400, marginTop: "1em" }}
            placeholder="Select a citation to insert"
            optionFilterProp="children"
            onSelect={onSelectCitation}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) => {
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase());
            }}
          >
            {bibliographyDB.map((bb, index) => (
              <Option key={bb.id} value={index}>
                {bb.key}
              </Option>
            ))}
          </Select>
          {/* preview */}
          {selectedCitation ? (
            <Card
              style={{ marginTop: "1em", maxHeight: 400, overflow: "auto" }}
              title={previewTitle}
            >
              {previewContent}
            </Card>
          ) : (
            <Card style={{ width: 400, marginTop: "1em" }} title={"Preview"}>
              <p>No citation selected</p>
            </Card>
          )}
        </div>
      </Modal>
    </div>
  );
};
