import React from "react";
import { message } from "antd";
import { connect } from "react-redux";
import { paraOnChange } from "../../actions";
import ParaToolBar from "../paraToolBar";
import dataSource from "./dataSource";
import "./index.css";
import SelectLabelModal from "../paraToolBar/selectLabelModal";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/snippets/html";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/ext-language_tools";
import { addCompleter } from "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-min-noconflict/ext-searchbox";

const mapDispatchToProps = (dispatch) => ({
  paraOnChange: (para, id) => dispatch(paraOnChange(para, id)),
});

const mapStateToProps = (state) => {
  return {
    data: state.paras.paras,
    status: state.paras.status,
  };
};

class InputBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showParaToolBar: false,
      isModalVisible: false,
      isClick: null,
      borderStyle: "",
    };
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handleLabelModalVisiblility = this.handleLabelModalVisiblility.bind(
      this
    );
    this.updateLinkLabel = this.updateLinkLabel.bind(this);
  }

  componentDidMount() {
    // ace editor
    addCompleter({
      getCompletions: function (editor, session, pos, prefix, callback) {
        callback(null, dataSource);
      },
    });
  }

  handleLabelModalVisiblility() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  handleLinkClick(event) {
    this.setState({
      isClick: event,
      isModalVisible: !this.state.isModalVisible,
    });
  }

  updateLinkLabel(labelID) {
    this.insertAtCursor(
      this.state.isClick,
      `<iLink id="${labelID}"></iLink> `,
      13
    );
  }

  setContent = (newValue) => {
    if (newValue !== this.props.boxValue) {
      try {
        this.props.paraOnChange(newValue, this.props.id);
      } catch (err) {
        console.log(err);
        message.warning("There might be an error in your content!");
      }
    }
  };

  showToolBar() {
    this.props.setFocusArea(this.props.id);
    this.setState({
      showParaToolBar: true,
      borderStyle: "2px solid deepskyblue",
    });
  }

  hideToolBar() {
    this.setState({
      showParaToolBar: false,
      borderStyle: "",
    });
  }

  insertAtCursor = (event, tag, length) => {
    if (typeof event != "undefined") {
      // event.preventDefault();
      let focusedTextarea = this.refs.ace.editor;
      const position = focusedTextarea.selection.getCursor();
      focusedTextarea.session.insert(position, tag);
      let value = focusedTextarea.getValue();
      if (value !== undefined) {
        this.props.paraOnChange(value, this.props.id);
      }
    }
  };

  render() {
    let inputAreaContainerStyle = {};
    if (this.props.TBview) {
      inputAreaContainerStyle = {
        height: "200px",
        width: "100%",
        border: this.state.borderStyle,
      };
    } else {
      inputAreaContainerStyle = {
        width: "100%",
        border: this.state.borderStyle,
      };
    }
    return (
      <div>
        {this.state.showParaToolBar ? (
          <ParaToolBar
            showToolBar={this.showToolBar}
            tagInsertion={this.insertAtCursor}
            handleLinkClick={this.handleLinkClick}
            linkID={this.state.linkID}
          />
        ) : null}
        <AceEditor
          ref="ace"
          mode="html"
          theme="solarized_light"
          style={inputAreaContainerStyle}
          maxLines={Infinity}
          minLines={5}
          wrapEnabled={true}
          value={decodeURI(this.props.boxValue)}
          fontSize={14}
          showGutter={false}
          highlightActiveLine={true}
          onFocus={this.showToolBar.bind(this)}
          onBlur={() => this.hideToolBar()}
          onChange={(value) => this.setContent(value, this.props.id)}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            tabSize: 2,
          }}
        />

        <SelectLabelModal
          visible={this.state.isModalVisible}
          handleLabelModalVisiblility={this.handleLabelModalVisiblility}
          updateLinkLabel={this.updateLinkLabel}
          bookID={1} // TODO
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputBox);
