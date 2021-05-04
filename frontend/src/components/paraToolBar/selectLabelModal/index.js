import React from "react";
import { Modal, Select, Card } from "antd";
import _ from "lodash";
import getLabel from "../../../requests/getLabel";
import getRoots from "../../../requests/GetRoots";
import getPara from "../../../requests/getPara";
import getLevel from "../../../requests/getLevel";
import getPage from "../../../requests/getPage";
import paraRenderer from "../../../pageRenderer";

const { Option } = Select;

export default class SelectLabelModal extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      labelList: [],
      selectedLabel: null,
      bookList: [],
      selectedBooks: [this.props.bookID],
      previewContent: "",
      previewTitle: "",
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    const books = await getRoots({});
    const labels = await getLabel({ rootID: this.state.selectedBooks[0] }); // get labels for default book
    if (typeof labels !== "undefined" && this._isMounted) {
      this.setState({
        labelList: labels.data,
        bookList: books.data,
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  labelModalOk = () => {
    this.props.updateLinkLabel(this.state.selectedLabel.id);
    this.props.handleLabelModalVisiblility();
  };

  labelModalCancel = () => {
    this.props.handleLabelModalVisiblility();
  };

  onSelectLabel = (labelID, option) => {
    getLabel({ labelID: labelID }).then((label) => {
      this.getLabelContent(label.data).then((item) => {
        const content = item.data;
        let title;
        if (label.data.isPage) {
          title = item.data.flat(Infinity)[0].para_parent.title;
        } else {
          title = item.data.flat(Infinity)[0].para_parent.tocTitle;
        }

        if (this._isMounted) {
          this.setState({
            selectedLabel: label.data,
            previewContent: content,
            previewTitle: title,
          });
        }
      });
    });
  };

  onSelectBook = (bookID, option) => {
    if (this._isMounted) {
      getLabel({ rootID: bookID }).then((labels) => {
        this.setState({
          selectedBooks: [...this.state.selectedBooks, bookID],
          labelList: this.state.labelList.concat(labels.data),
        });
      });
    }
  };

  onDeselect = (value, option) => {
    //TODO
  };

  getLabelContent = async (label) => {
    let item;
    const linkedID = label.linkedID;
    if (label.linkTo === "para") {
      item = await getPara({ id: linkedID });
      item.data = [item.data];
    } else {
      if (label.isPage) {
        item = await getPage({ id: linkedID, page: null });
      } else {
        item = await getLevel(linkedID);
      }
    }
    return item;
  };

  render() {
    const { visible } = this.props;
    const { selectedLabel, previewContent, previewTitle } = this.state;

    const books = this.state.bookList.map((item) => (
      <Option key={item.root.id} value={item.root.id}>
        {item.title}
      </Option>
    ));

    const labels = this.state.labelList.map((item) => (
      <Option key={item.id} value={item.id}>
        {`${item.content} (${item.id})`}
      </Option>
    ));

    // preview
    let preview;
    if (selectedLabel !== null) {
      preview = (
        <Card
          style={{ marginTop: "1em", maxHeight: 400, overflow: "auto" }}
          title={paraRenderer(previewTitle)}
        >
          <div>
            {_.map(previewContent, (para) => {
              return paraRenderer(para);
            })}
          </div>
        </Card>
      );
    } else {
      preview = (
        <Card style={{ width: 300, marginTop: "1em" }} title={"Preview"}>
          <p>No label selected</p>
        </Card>
      );
    }

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
              autoClearSearchValue
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

            {/* select labels */}
            <Select
              showSearch
              allowClear={true}
              style={{ width: 300, marginTop: "1em" }}
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
              {labels}
            </Select>

            {/* preview */}
            {preview}
          </div>
        </Modal>
      </div>
    );
  }
}
