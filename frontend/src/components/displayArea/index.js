import React from "react";
import paraRenderer from "../../pageRenderer";
import {connect} from "react-redux";

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
				}}>
				{/*TODO: need to handle open window activity*/}
				{paraRenderer(target_para)}
			</div>
		)
	}
}

export default connect(mapStateToProps)(DisplayArea);