import React from "react";
import paraRenderer from "../../pageRenderer";
import {connect} from "react-redux";
import {openNewWindow} from "../../actions";

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
		let dataArray = this.props.data.flat(Infinity);

		let target_para = dataArray[dataArray.findIndex(el => el.id === id)];

		return (
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
		)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(DisplayArea);