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
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/ext-language_tools";
import { addCompleter } from "ace-builds/src-noconflict/ext-language_tools";

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
      highlightedText: "",
    };
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handleLabelModalVisiblility =
      this.handleLabelModalVisiblility.bind(this);
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

  handleLinkClick(event, highlightedText) {
    this.setState({
      isClick: event,
      isModalVisible: !this.state.isModalVisible,
      highlightedText: highlightedText,
    });
  }

  updateLinkLabel(labelID) {
    this.insertAtCursor(
      this.state.isClick,
      `<iLink id="${labelID}">${this.state.highlightedText}</iLink> `,
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
      const focusedTextarea = this.refs.ace.editor;
      focusedTextarea.session.replace(
        focusedTextarea.selection.getRange(),
        tag
      );
      const value = focusedTextarea.getValue();
      if (value !== undefined) {
        this.props.paraOnChange(value, this.props.id);
      }
    }
  };

  iLinkTextChange = (value) => {
    this.setState({
      highlightedText: value,
    });
  };

  render() {
    const { bookID } = this.props;
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
            useWorker: false,
          }}
        />

        <SelectLabelModal
          visible={this.state.isModalVisible}
          handleLabelModalVisiblility={this.handleLabelModalVisiblility}
          updateLinkLabel={this.updateLinkLabel}
          bookID={bookID}
          highlightedText={this.state.highlightedText}
          iLinkTextChange={this.iLinkTextChange}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputBox);
