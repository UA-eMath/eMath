import React from "react";
import { connect } from "react-redux";
import {
  loadPage,
  loadPageError,
  paraOnChange,
  popQueue,
  fetchPage,
} from "../../actions";
import { message, Row, Col, Modal } from "antd";
import _ from "lodash";
import { Scrollbars } from "react-custom-scrollbars";
import EditorToolBar from "../editorBar";
import postPara from "../../requests/postPara";
import updatePara from "../../requests/updatePara";
import removePara from "../../requests/removePara";
import "./style/index.css";
import InputBox from "../InputBox";
import DisplayArea from "../displayArea";
import ParaControl from "../paraControl";
import SubLevel from "./subLevel";

const mapStateToProps = (state) => {
  return {
    data: state.paras.paras,
    status: state.paras.status,
    uploadingQueue: state.paras.uploadingQueue,
    title: state.paras.title,
    id: state.paras.id,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchPage: (id, title) => dispatch(fetchPage(id, title)),
  loadPage: (id) => dispatch(loadPage(id)),
  loadPageError: (error) => dispatch(loadPageError(error)),
  paraOnChange: (para, id) => dispatch(paraOnChange(para, id)),
  popQueue: (id) => dispatch(popQueue(id)),
});

const { confirm } = Modal;

class ParaEditor extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      uploading: false,
      sideAlign: true,
      intervalId: null,
      focusedArea: null,
    };

    this.uploadingData = this.uploadingData.bind(this);
  }

  //save para periodically
  async componentDidMount() {
    this._isMounted = true;
    const id = setInterval(this.uploadingData, 10000);
    if (this._isMounted) {
      this.setState({
        intervalId: id,
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.state.intervalId);
  }

  componentDidCatch(error, errorInfo) {
    //  log the error
    console.log(error, errorInfo);
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  async uploadingData() {
    if (!_.isEmpty(this.props.uploadingQueue)) {
      try {
        this.setState({
          uploading: true,
        });

        for (let key in this.props.uploadingQueue) {
          if (!this.props.uploadingQueue.hasOwnProperty(key)) continue;

          if (this.props.uploadingQueue[key]) {
            if (this.props.uploadingQueue[key].status === "update") {
              let request_body = JSON.stringify(
                {
                  content: this.props.uploadingQueue[key]["content"],
                },
                key
              );

              await updatePara(request_body, key).then((data) => {
                if (!data || data.status !== 200) {
                  if (data.status === 400) {
                    message.error(data.data);
                  }
                  console.error("Update Para error", request_body, data);
                }
              });
              this.props.popQueue(key);
            }
          }
        }
        this.setState({
          uploading: false,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  setFocusArea = (boxId) => {
    this.setState({
      focusedArea: boxId,
    });
  };

  switchView = () => {
    this.setState((prevState) => ({
      sideAlign: !prevState.sideAlign,
    }));
  };

  getItemById(id) {
    let flatState = this.props.data.flat(Infinity);
    return flatState[flatState.findIndex((i) => i.id === id)];
  }

  addPara = (data = "") => {
    //this.props.id
    let request_body;
    let position = null;
    let parentId = this.props.id;
    if (this.state.focusedArea !== null) {
      //behind on focused area
      let focusedPara = this.getItemById(this.state.focusedArea);
      if (typeof focusedPara !== "undefined") {
        //the position para want to be put
        position = focusedPara.position + 1;
        //check if inside a sub level
        if (parentId !== focusedPara.para_parent.id) {
          parentId = focusedPara.para_parent.id;
        }
      }
    }

    request_body = JSON.stringify({
      content: {
        data: data,
      },
      position: position,
      para_parent: parentId,
    });

    postPara(request_body).then((data) => {
      if (!data || data.status !== 200) {
        console.error("Failed to add para", data);
      } else {
        this.props.fetchPage(this.props.id, this.props.title);
      }
    });
  };

  deletePara = (id) => {
    confirm({
      title: "Are you sure delete this paragraph?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        removePara(id).then((data) => {
          if (data.status !== 200) {
            console.error("Delete error", data);
          } else {
            this.props.fetchPage(this.props.id, this.props.title);
          }
        });
      },
      onCancel() {},
    });
  };

  render() {
    const { bookID } = this.props;

    return (
      <div>
        {this.props.status === null ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p style={{ fontSize: "25px", lineHeight: "600px" }}>
              {" "}
              Double click a page to edit.
            </p>
          </div>
        ) : (
          <div>
            <EditorToolBar
              uploadingData={this.uploadingData}
              addPara={this.addPara}
              switchView={this.switchView}
              uploading={this.state.loading}
              parent={this.props.id}
              parentTitle={this.props.title}
              focusedArea={this.state.focusedArea}
            />

            <h3
              align={"center"}
              style={{
                margin: "10px",
              }}
            >
              {this.props.title}
            </h3>
            <Scrollbars
              style={{
                width: "100%",
                height: "80vh",
                paddingBottom: "100px",
                margin: "10px",
                marginTop: "20px",
              }}
            >
              <div style={{ margin: "35px 30px 0 0" }}>
                {_.map(this.props.data, (item, i) => {
                  if (Array.isArray(item)) {
                    return (
                      <SubLevel
                        key={i}
                        children={item}
                        alignment={this.state.sideAlign}
                        deletePara={this.deletePara}
                        setFocusArea={this.setFocusArea.bind(this)}
                        id={this.props.id}
                      />
                    );
                  }

                  if (this.state.sideAlign) {
                    return (
                      <div className="paraWrapper" key={item.id}>
                        <div className="inputDiv">
                          <InputBox
                            id={item.id}
                            setFocusArea={this.setFocusArea.bind(this)}
                            boxValue={item.content.data}
                          />
                        </div>
                        <div className="displayDiv">
                          <DisplayArea id={item.id} />
                        </div>
                        <div className="controlDiv">
                          <ParaControl
                            id={item.id}
                            delete={this.deletePara}
                            parentId={this.props.id}
                            bookID={bookID}
                          />
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <Row key={item.id}>
                        <Col
                          span={21}
                          style={{
                            margin: "10px",
                          }}
                        >
                          <InputBox
                            id={item.id}
                            boxValue={item.content.data}
                            setFocusArea={this.setFocusArea}
                          />

                          <DisplayArea id={item.id} />
                        </Col>

                        <Col
                          span={1}
                          style={{
                            margin: "10px",
                          }}
                        >
                          <ParaControl
                            id={item.id}
                            delete={this.deletePara}
                            parentId={this.props.id}
                            bookID={bookID}
                          />
                        </Col>
                      </Row>
                    );
                  }
                })}
              </div>
            </Scrollbars>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParaEditor);
