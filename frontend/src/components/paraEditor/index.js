import React from "react";
import { connect } from "react-redux";
import { loadPage, popQueue, fetchPage } from "../../actions";
import { message, Modal } from "antd";
import _ from "lodash";
import { Scrollbars } from "react-custom-scrollbars";
import EditorToolBar from "../editorBar";
import postPara from "../../requests/postPara";
import updatePara from "../../requests/updatePara";
import removePara from "../../requests/removePara";
import "./style/index.css";
import paraRenderer from "../../pageRenderer";
import ParaArea from "../paraArea";

const mapStateToProps = (state) => {
  return {
    idsLevel: state.paras.idsLevel,
    paras: state.paras.paras,
    status: state.page.status,
    uploadingQueue: state.uploadingQueue.uploadingQueue,
    title: state.page.title,
    id: state.page.id,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchPage: (id, title) => dispatch(fetchPage(id, title)),
  loadPage: (id) => dispatch(loadPage(id)),
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

  addPara = (data = "") => {
    //this.props.id
    let request_body;
    let position = null;
    let parentId = this.props.id;
    if (this.state.focusedArea !== null) {
      //behind on focused area
      let focusedPara = this.props.paras[this.state.focusedArea];
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
          <div
            style={{
              textAlign: "center",
              height: "100%",
              fontSize: "25px",
              marginTop: 300,
            }}
          >
            Double click a page to edit.
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
                marginTop: 24,
              }}
            >
              {paraRenderer(this.props.title, true)}
            </h3>

            <Scrollbars
              style={{
                width: "100%",
                height: this.props.windowHeight - 200,
                margin: "10px",
              }}
              autoHide
            >
              <div style={{ margin: 16 }}>
                {_.map(this.props.idsLevel, (id, i) => {
                  return (
                    <ParaArea
                      key={id}
                      paraID={id}
                      bookID={bookID}
                      id={this.props.id}
                      sideAlign={this.state.sideAlign}
                      setFocusArea={this.setFocusArea}
                      deletePara={this.deletePara}
                    />
                  );
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
