import React from 'react'
import {Menu, Dropdown } from 'antd';
import postLevel from '../../../requests/postLevel';
import updateLevel from '../../../requests/updateLevel';
import LevelForm from './levelForm';

export default class EditingModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			modifyState: '',
			loading: false,
		};
	}

	showModal = (state) => {
		this.setState({
			visible: true,
			modifyState: state,
		});
	};

	handleCancel = () => {
		this.setState({visible: false});
	};

	saveFormRef = formRef => {
		this.formRef = formRef;
	};

	handleCreate = () => {
		const {form} = this.formRef.props;

		this.setState({loading: true});

		form.validateFields((err, values) => {
			if (err) {
				return;
			}

			if(values.tocTitle === '' && values.title !== ''){
				values.tocTitle = values.title;
			}

			let request_body;

			if (this.state.modifyState === 'New') {
				//create new level under selected parent level
				request_body = JSON.stringify({...values, parent: this.props.parent.id});
				postLevel(request_body).then(data => {
					if (!data || data.status !== 200) {
						console.error("Submit failed", data);
					}
					else {
						this.props.updateTree();
					}
				})
			} else {
				//modify selected parent Level
				request_body = JSON.stringify({...values});
				updateLevel(request_body,this.props.parent.id).then(data =>{
					if(!data || data.status !== 200){
						console.error("Update error",data);
					}
					else {
						console.log(request_body);
						console.log(data);
						this.props.updateTree();
					}
				})
			}

			form.resetFields();
			this.setState({
				visible: false,
				modifyState: '',
				loading:false
			});
		});
	};

	render() {
		const menu = this.props.parent.isPage ? (
			<Menu>
				<Menu.Item key="1" onClick={() => {
					this.showModal('Edit')
				}}>Edit</Menu.Item>
				<Menu.Item key="2">Remove</Menu.Item>
			</Menu>
		) : (
			<Menu>
				<Menu.Item key="1" onClick={() => {
					this.showModal('New')
				}}>New...</Menu.Item>
				<Menu.Item key="2" onClick={() => {
					this.showModal('Edit')
				}}>Edit</Menu.Item>
				<Menu.Item key="3">Remove</Menu.Item>
			</Menu>
		);

		return (
			<div>
				<Dropdown overlay={menu} trigger={['contextMenu']}>
					<span style={{userSelect: 'none'}}>{this.props.title}</span>
				</Dropdown>
				<LevelForm
					wrappedComponentRef={this.saveFormRef}
					visible={this.state.visible}
					onCancel={this.handleCancel}
					onCreate={this.handleCreate}
					modifyState={this.state.modifyState}
					parent={this.props.parent}
					loading={this.state.loading}
				/>

			</div>
		);
	}
};