import React from "react";
import { Select } from "antd";

const { Option } = Select;

function CaptionOptions(props) {
  const { getFieldDecorator } = props.form;
  return getFieldDecorator("tocTitle", {
    initialValue: "",
  })(
    <Select
      showSearch
      style={{ width: 200 }}
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      <Option value="">None</Option>
      <Option value="Comment">Comment</Option>
      <Option value="Convention">Convention</Option>
      <Option value="Corollary">Corollary</Option>
      <Option value="Definition">Definition</Option>
      <Option value="Example">Example</Option>
      <Option value="Lemma">Lemma</Option>
      <Option value="Notation">Notation</Option>
      <Option value="Proof">Proof</Option>
      <Option value="Proposition">Proposition</Option>
      <Option value="Terminology">Terminology</Option>
      <Option value="Theorem">Theorem</Option>
      <Option value="Remark">Remark</Option>
    </Select>
  );
}

export default CaptionOptions;
