import React from "react";
import {Input, message} from 'antd';
import {connect} from "react-redux";
import {paraOnChange} from "../../actions";

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
			boxValue: this.props.boxValue,
			boxId: this.props.id,
		};
		this.inputEl = React.createRef();
	}

	setContent = (e, id) => {
		//undefined => content block
		try {
			this.props.paraOnChange(e.target.value, id);
		} catch (err) {
			message.warning('There might be an error in your content!');
		}
	};

	handleKeyDown(event){
		console.log(this.inputEl.current);

		if(event.keyCode === 9){
			event.preventDefault();

		}
	}

	render() {

		let defaultValue = decodeURI(this.state.boxValue);

		return (
			<TextArea
				ref={this.inputEl}
				id={this.state.boxId}
				defaultValue={defaultValue}
				style={{
					height: "100%",
				}}
				className="userInput"
				onChange={(e) => this.setContent(e, this.state.boxId)}
				onKeyDown={this.handleKeyDown.bind(this)}
			/>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(InputBox);