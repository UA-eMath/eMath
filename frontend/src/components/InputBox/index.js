import React, { createContext, useState } from "react";
import { Icon, message } from "antd";
import { connect } from "react-redux";
import { paraOnChange } from "../../actions";
import ParaToolBar from "../paraToolBar";
import dataSource from "./dataSource";
import ReactTextareaAutocomplete from "@webscopeio/react-textarea-autocomplete";
import "./index.css";
import SelectLabelModal from "../paraToolBar/selectLabelModal";

const Loading = ({ data }) => (
  <div>
    <Icon type="loading" />
  </div>
);

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
    };
    this.inputEl = React.createRef();
    this.textArea = React.createRef();

    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handleLabelModalVisiblility = this.handleLabelModalVisiblility.bind(
      this
    );
    this.updateLinkID = this.updateLinkID.bind(this);
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

  updateLinkID(newID) {
    this.insertAtCursor(
      this.state.isClick,
      `<iLink id="${newID}"></iLink> `,
      13
    );
  }

  setContent = (e) => {
    if (e.target.value !== this.props.boxValue) {
      try {
        this.props.paraOnChange(e.target.value, this.props.id);
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
    });
  }

  hideToolBar() {
    this.setState({
      showParaToolBar: false,
    });
  }

  handleKeyDown(event) {
    //insert tab
    if (event.keyCode === 9) {
      event.preventDefault();
      let selectionStart = event.target.selectionStart;
      let selectionEnd = event.target.selectionEnd;

      let value = decodeURI(this.props.boxValue);

      value =
        value.substring(0, selectionStart) +
        "\t" +
        value.substring(selectionEnd);

      this.props.paraOnChange(value, this.props.id);

      this.textArea.selectionStart = this.textArea.selectionEnd =
        selectionStart + 1;
    }
  }

  // inline tool bar
  onSelectionChange(event) {}

  insertAtCursor = (event, tag, length) => {
    if (typeof event != "undefined") {
      event.preventDefault();
      this.textArea.focus();
      let focusedTextarea = this.textArea;
      let value = decodeURI(this.props.boxValue);
      let selectionStart = focusedTextarea.selectionStart;
      let selectionEnd = focusedTextarea.selectionEnd;

      if (focusedTextarea.value !== undefined) {
        let prefix = value.substring(0, selectionStart);
        let suffix = value.substring(selectionEnd);

        value = prefix + tag + suffix;

        this.props.paraOnChange(value, this.props.id);

        this.setState({}, () => {
          this.textArea.selectionStart = this.textArea.selectionEnd =
            selectionStart + length;
        });
      }
    }
  };

  onItemSelected = (currentTrigger) => {
    let item = currentTrigger.item.char;
    let moveDistance = item.length - item.lastIndexOf("/") + 1;
    let pos = this.inputEl.getCaretPosition();
    this.inputEl.setCaretPosition(pos - moveDistance);
  };

  render() {
    let inputAreaContainerStyle = {};
    if (this.props.TBview) {
      inputAreaContainerStyle = {
        height: "200px",
        width: "100%",
      };
    } else {
      inputAreaContainerStyle = {
        width: "100%",
      };
    }

    return (
      <span style={{ overflow: "visible" }}>
        {this.state.showParaToolBar ? (
          <ParaToolBar
            showToolBar={this.showToolBar}
            tagInsertion={this.insertAtCursor}
            handleLinkClick={this.handleLinkClick}
            linkID={this.state.linkID}
          />
        ) : (
          <span />
        )}

        <ReactTextareaAutocomplete
          className="userInput"
          loadingComponent={Loading}
          value={decodeURI(this.props.boxValue)}
          style={{
            fontSize: "14px",
            lineHeight: "20px",
            padding: 5,
            position: "absolute",
            bottom: 0,
            resize: "none",
          }}
          ref={(rta) => {
            this.inputEl = rta;
          }}
          innerRef={(textarea) => {
            this.textArea = textarea;
          }}
          containerStyle={inputAreaContainerStyle}
          minChar={0}
          trigger={dataSource}
          movePopupAsYouType={true}
          onItemSelected={this.onItemSelected}
          onChange={(e) => this.setContent(e, this.props.id)}
          onKeyDown={this.handleKeyDown.bind(this)}
          onBlur={() => this.hideToolBar()}
          onFocus={this.showToolBar.bind(this)}
          //onSelect={this.onSelectionChange.bind(this)}
        />
        <SelectLabelModal
          visible={this.state.isModalVisible}
          handleLabelModalVisiblility={this.handleLabelModalVisiblility}
          updateLinkID={this.updateLinkID}
        />
      </span>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputBox);
