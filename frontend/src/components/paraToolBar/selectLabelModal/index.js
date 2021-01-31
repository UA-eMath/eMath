import React from "react";
import { Modal, Select } from "antd";
import getLabel from "../../../requests/getLabel";

const { Option } = Select;

export default class SelectLabelModal extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      labelList: [],
      selectedLabel: "",
      labelObj: null,
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    const labels = await getLabel();
    if (typeof labels !== "undefined" && this._isMounted) {
      var obj = {};
      labels.data.forEach((item) => {
        obj = Object.assign({ [item.content]: item }, obj);
      });
      this.setState({ labelList: labels.data, labelObj: obj });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  labelModalOk = (id) => {
    this.props.updateLinkID(this.state.selectedLabel);
    this.props.handleLabelModalVisiblility();
  };

  labelModalCancel = () => {
    this.props.handleLabelModalVisiblility();
  };

  onSelect = (value, option) => {
    if (this.state.labelObj !== null && this._isMounted) {
      const label = this.state.labelObj[value];
      if (label.linked_level) {
        this.setState({ selectedLabel: label.linked_level });
      } else {
        this.setState({ selectedLabel: label.linked_para });
      }
    }
  };

  render() {
    const { visible } = this.props;

    const options = this.state.labelList.map((item) => (
      <Option key={item.id} value={item.content}>
        {item.content}
      </Option>
    ));

    return (
      <div>
        <Modal
          title="Select Label"
          visible={visible}
          onOk={this.labelModalOk}
          onCancel={this.labelModalCancel}
        >
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a label to link"
            optionFilterProp="children"
            defaultOpen={true}
            onSelect={this.onSelect}
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
            {options}
          </Select>

          {/* <List
            bordered
            dataSource={this.state.labelList}
            renderItem={(item) => <List.Item>{item.content}</List.Item>}
          /> */}
        </Modal>
      </div>
    );
  }
}
