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
import postLevel from "../../requests/postLevel";
import updateLevel from "../../requests/updateLevel";


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
			loading: false
		});
	};

	handleCancel = () => {
		this.setState({visible: false});
	};

	addSubLevel = () => {
		const {form} = this.formRef.props;

		this.setState({loading: true});

		form.validateFields((err, values) => {
			if (err) {
				return;
			}

			if (values.tocTitle === '' && values.title !== '') {
				values.tocTitle = values.title;
			}

			let request_body;


			//create new level under selected parent level
			request_body = JSON.stringify({...values, parent: this.props.parent});
			postLevel(request_body).then(data => {
				if (!data || data.status !== 200) {
					console.error("Submit failed", data);
				}
			});

			form.resetFields();
			this.setState({
				visible: false,
				loading: false
			});
		});
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
							onClick={() => this.showModal()}
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
							loading={this.state.loading}
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





