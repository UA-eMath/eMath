import React from "react";
import MathJax from "../mathDisplay";
import MathJaxConfig from "../../constants/MathJax_config";
import paraRenderer from "../../pageRenderer";
import {connect} from "react-redux";
import {openNewWindow, paraOnChange} from "../../actions";

const mapDispatchToProps = dispatch => ({
	onWindowOpen: (pageId) =>
		dispatch(openNewWindow(pageId)),
});

const mapStateToProps = state => {
	return {
		data: state.paras.paras,
	}
};
class DisplayArea extends React.Component {

	render() {
		let id = this.props.id;
		let dataArray = this.props.data;

		let target_para = dataArray[dataArray.findIndex(el => el.id === id)];

		return (
			<MathJax.Provider
				{...MathJaxConfig}
				onError={(MathJax, error) => {
					console.warn(error);
					console.log("Encountered a MathJax error, re-attempting a typeset!");
					MathJax.Hub.Queue(
						MathJax.Hub.Typeset()
					);
				}}
			>
				<div
					style={{
						background: "#FFFBE6",
						display: "block",
						height: "100%",
						padding: "10px",
					}}>
					{/*TODO: need to handle open window activity*/}
					{paraRenderer(target_para, this.props.onWindowOpen)}
				</div>
			</MathJax.Provider>
		)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(DisplayArea);