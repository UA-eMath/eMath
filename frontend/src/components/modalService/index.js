import React from "react";
import {Button, Modal} from "antd";

//TODO a generic Modal
class ModalService extends React.Component {
	state = {
		visible: false,
		loading: false,
	};

	toggleModal = () => {
		this.setState(prevState => ({visible: !prevState.visible}));
	};

	render() {
		const {title, okText, onOK,} = this.props;
		const {visible,loading} = this.state;
		const ToggleButton = this.props.toggleButton;

		return (
			<React.Fragment>
				<ToggleButton onClick = {this.toggleModal}/>
				<Modal
					visible={visible}
					title={title}
					footer={[
						<Button key="back" onClick={this.toggleModal}>
							Cancel
						</Button>,
						<Button key="submit" type="primary" onClick={onOK} loading={loading}>
							{okText}
						</Button>,
					]}
				>
					{this.props.children}
				</Modal>

			</React.Fragment>
		)
	}
}


export default ModalService