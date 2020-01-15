import React from "react";
import {AutoComplete, Input, message} from 'antd';
import {connect} from "react-redux";
import {paraOnChange} from "../../actions";
import dataSource from "./dataSource";
import ParaToolBar from "../paraToolBar";

const {TextArea} = Input;


const mapDispatchToProps = dispatch => ({
	paraOnChange: (para, id) => dispatch(paraOnChange(para, id)),
});

const mapStateToProps = state => {
	return {
		data: state.paras.paras,
		status: state.paras.status,
	}
};

class InputBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			boxValue: decodeURI(this.props.boxValue),
			boxId: this.props.id,
			showParaToolBar: false,
		};
		this.inputEl = React.createRef();
	}

	setContent = (e, id) => {
		//undefined => content block
		try {
			this.setState({
				boxValue: e.target.value,
			});

			this.props.paraOnChange(e.target.value, id);
		} catch (err) {
			message.warning('There might be an error in your content!');
		}
	};

	showToolBar() {
		this.setState({
			showParaToolBar: true
		});
	}

	hideToolBar() {
		this.setState({
			showParaToolBar: false
		});
	}

	handleKeyDown(event) {
		if (event.keyCode === 9) {
			event.preventDefault();
			let selectionStart = event.target.selectionStart;
			let selectionEnd = event.target.selectionEnd;

			let value = this.state.boxValue;
			console.log(value);

			value = value.substring(0, selectionStart) + "\t" + value.substring(selectionEnd);

			this.setState({
				boxValue: value,
			}, () => {
				this.inputEl.resizableTextArea.textArea.selectionStart =
					this.inputEl.resizableTextArea.textArea.selectionEnd = selectionStart + 1
			});

		}
	}

	// inline tool bar
	onSelectionChange(event) {
		console.log(event.target)
	}

	insertAtCursor = (event, tag, length) => {
		event.preventDefault();
		this.inputEl.resizableTextArea.textArea.focus();
		let focusedTextarea = this.inputEl.resizableTextArea.textArea;
		let value = this.state.boxValue;
		let selectionStart = focusedTextarea.selectionStart;
		let selectionEnd = focusedTextarea.selectionEnd;

		if (focusedTextarea.value !== undefined) {
			let prefix = value.substring(0, selectionStart);
			let suffix = value.substring(selectionEnd);

			value = prefix + tag + suffix;

			this.setState({
				boxValue: value,
			}, () => {
				this.inputEl.resizableTextArea.textArea.selectionStart =
					this.inputEl.resizableTextArea.textArea.selectionEnd = selectionStart + length;
			});
		}
	};

	render() {
		return (
			<span >
				{this.state.showParaToolBar ?
					<ParaToolBar showToolBar={this.showToolBar} tagInsertion={this.insertAtCursor}/> : <span/>}

				<TextArea
					ref={el => this.inputEl = el}
					id={this.state.boxId}
					value={this.state.boxValue}
					style={{
						height: "100%",
					}}
					className="userInput"
					onChange={(e) => this.setContent(e, this.state.boxId)}
					onKeyDown={this.handleKeyDown.bind(this)}
					onBlur={() => this.hideToolBar()}
			        onFocus={this.showToolBar.bind(this)}
					onSelect={this.onSelectionChange.bind(this)}
				/>
			</span>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(InputBox);