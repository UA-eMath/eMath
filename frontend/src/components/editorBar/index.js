import React from "react";
import {Button, Checkbox, Form, Icon, Input, Modal, Switch, Tooltip} from 'antd';
import {HotKeys} from "react-hotkeys";

import {connect} from 'react-redux';
import {
	loadPage,
	loadPageError,
} from '../../actions'
import AddSubLevel from "../paraEditor/addSubLevel";
import LevelForm from "../levelEditor/editingModal/levelForm";


const mapStateToProps = state => {
	return {
		data: state.paras.data,
		status: state.paras.status
	}
};

const mapDispatchToProps = dispatch => ({
	loadPage: (id) => dispatch(loadPage(id)),
	loadPageError: (error) => dispatch(loadPageError(error))
});

const ButtonGroup = Button.Group;

class EditorToolBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
		}
	}

	showModal = (state) => {
		this.setState({
			visible: true,
		});
	};

	handleCancel = () => {
		this.setState({visible: false});
	};

	addSubLevel = () => {


	};

	saveFormRef = formRef => {
		this.formRef = formRef;
	};


	render() {

		return (
			<div style={{
				background: '#F3F3F3',
				padding: '10px 10px 10px'
			}}>
				<ButtonGroup>

					<Tooltip placement="bottom" title={"Image"}>
						<Button>
							<Icon type="file-image"/>
						</Button>
					</Tooltip>


					<Tooltip placement="bottom" title={"Add one paragraph"}>
						<Button
							onClick={() => this.props.addPara()}
							style={{
								width: '100px'
							}}>
							Add Para
						</Button>
					</Tooltip>

					<Tooltip placement="bottom" title={"Add content block"}>
						<Button
							onClick={() => this.addSubLevel()}
							style={{
								width: '100px'
							}}>
							Add Level
						</Button>


						<AddSubLevel
							wrappedComponentRef={this.saveFormRef}
							visible={this.state.visible}
							onCancel={this.handleCancel}
							onCreate={this.addSubLevel}
							onDelete={this.handleDelete}
							//loading={this.state.loading}
						/>

					</Tooltip>

					<Switch
						checkedChildren="LR"
						unCheckedChildren="TB"
						defaultChecked
						onChange={this.props.switchView}
					/>

					<div style={{backgroud: "white"}}>
						<Tooltip placement="bottom" title={"Save"}>
							<Button type="primary"
							        icon="upload"
							        loading={this.props.uploading}
							        onClick={() => this.props.uploadingData()}/>
						</Tooltip>
					</div>


				</ButtonGroup>

			</div>

		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorToolBar)





