import React from "react";
import { Modal, Select } from "antd";
import getLabel from "../../../requests/getLabel";
import getRoots from "../../../requests/GetRoots";

const { Option } = Select;

export default class SelectLabelModal extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      labelList: [],
      selectedLabel: null,
      labelObj: {},
      bookList: [],
      selectedBooks: [this.props.bookID],
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    const books = await getRoots({});
    const labels = await getLabel({ rootID: this.state.selectedBooks[0] }); // get labels for default book
    if (typeof labels !== "undefined" && this._isMounted) {
      var obj = {};
      labels.data.forEach((item) => {
        obj[item.content] = item;
      });
      this.setState({
        labelList: labels.data,
        labelObj: obj,
        bookList: books.data,
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  labelModalOk = (id) => {
    this.props.updateLinkLabel(this.state.selectedLabel);
    this.props.handleLabelModalVisiblility();
  };

  labelModalCancel = () => {
    this.props.handleLabelModalVisiblility();
  };

  onSelectLabel = (value, option) => {
    if (this.state.labelObj !== null && this._isMounted) {
      console.log("onselectlabel", this.state.labelObj);
      const label = this.state.labelObj[value];
      this.setState({ selectedLabel: label.id });
    }
  };

  onSelectBook = (value, option) => {
    if (this.state.bookList !== [] && this._isMounted) {
      this.state.bookList.forEach((item) => {
        if (item.title === value) {
          this.setState({
            selectedBooks: [...this.state.selectedBooks, item.id],
          });
          getLabel({ rootID: item.root.id }).then((labels) => {
            var obj = {};
            labels.data.forEach((item) => {
              obj[item.content] = item;
            });
            this.setState({
              labelList: this.state.labelList.concat(labels.data),
              labelObj: { ...this.state.labelObj, ...obj },
            });
          });
        }
      });
    }
  };

  onDeselect = (value, option) => {
    //TODO
  };

  render() {
    const { visible } = this.props;

    const books = this.state.bookList.map((item) => (
      <Option key={item.id} value={item.title}>
        {item.title}
      </Option>
    ));

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
          {/* select book */}
          <div style={{ margin: "1em" }}>
            <Select
              showSearch
              style={{ width: 300 }}
              placeholder="Select a book (Default is current book)"
              mode="multiple"
              optionFilterProp="children"
              onSelect={this.onSelectBook}
              onDeselect={this.onDeselect}
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
              {books}
            </Select>
          </div>

          {/* select labels */}
          {/* TODO: filter labels based on selected book */}
          <div style={{ margin: "1em" }}>
            <Select
              showSearch
              style={{ width: 300 }}
              placeholder="Select a label to link"
              optionFilterProp="children"
              onSelect={this.onSelectLabel}
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
          </div>
        </Modal>
      </div>
    );
  }
}
