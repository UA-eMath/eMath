import React from "react";
import { Table, Input, Popconfirm, Form, Button, Icon, Divider } from "antd";
import {
  postCitation,
  putCitation,
  removeCitation,
} from "../../requests/bibliography";

const { TextArea } = Input;

const EditableContext = React.createContext();

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  renderCell = ({ getFieldDecorator }) => {
    const { editing, dataIndex, title, record, index, children, ...restProps } =
      this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(<TextArea autosize />)}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: props.data, editingKey: "", addingNew: false };
    this.columns = [
      {
        title: "Index",
        dataIndex: "index",
        width: "4%",
        editable: true,
      },
      {
        title: "Key",
        dataIndex: "key",
        width: "10%",
        editable: true,
      },
      {
        title: "BibTex",
        dataIndex: "content",
        width: "40%",
        editable: true,
      },
      {
        title: "Display Content",
        dataIndex: "displayContent",
        width: "40%",
        editable: true,
      },
      {
        title: "Action",
        dataIndex: "action",
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {(form) => (
                  <Icon
                    type="save"
                    style={{ color: "#0085F9", marginRight: 8 }}
                    onClick={() => this.save(form, record.key)}
                  />
                )}
              </EditableContext.Consumer>
              <Divider type="vertical" />
              <Popconfirm
                title="Sure to cancel?"
                onConfirm={() => this.cancel(record.key)}
              >
                <Icon type="close-square" />
              </Popconfirm>
            </span>
          ) : (
            <span>
              <Icon
                type="edit"
                style={{ color: "#0085F9" }}
                disabled={editingKey !== ""}
                onClick={() => this.edit(record.key)}
              />
              <Divider type="vertical" />
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.delete(record.id)}
              >
                <Icon type="delete" style={{ color: "#ED5C57" }} />
              </Popconfirm>
            </span>
          );
        },
      },
    ];
  }

  isEditing = (record) => record.key === this.state.editingKey;

  cancel = () => {
    if (this.state.addingNew) {
      const newData = this.state.data.filter(
        (bb) => bb.key !== this.state.editingKey
      );
      this.setState({ addingNew: false, data: newData });
    }
    this.setState({ editingKey: "" });
  };

  delete = (bbID) => {
    removeCitation({ bbID: bbID });
    const newData = this.state.data.filter((bb) => bb.id !== bbID);
    this.setState({ data: newData });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex((item) => key === item.key);
      if (this.state.addingNew) {
        const request_body = JSON.stringify(row);
        postCitation(request_body).then((newCitation) => {
          newData[newData.length - 1] = newCitation.data;
          this.setState({ data: newData, editingKey: "", addingNew: false });
        });
      } else {
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          this.setState({ data: newData, editingKey: "" });
          putCitation(newData[index]);
        } else {
          newData.push(row);
          this.setState({ data: newData, editingKey: "" });
          putCitation(row);
        }
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  handleAdd = (form) => {
    this.setState({ addingNew: true });
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      row.index = newData.length;
      row.key = "";
      newData.push(row);
      this.setState({ data: newData, editingKey: "", addingNew: true });
    });
  };

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <EditableContext.Consumer>
          {(form) => (
            <Button
              onClick={() => this.handleAdd(form)}
              type="primary"
              style={{ marginBottom: 16 }}
            >
              Add a citation
            </Button>
          )}
        </EditableContext.Consumer>

        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
        />
      </EditableContext.Provider>
    );
  }
}

export const EditableFormTable = Form.create()(EditableTable);
