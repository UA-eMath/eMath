import React from 'react'
import {Menu, Dropdown} from 'antd';
import postLevel from '../../../requests/postLevel';
import updateLevel from '../../../requests/updateLevel';
import removeLevel from '../../../requests/removeLevel';
import LevelForm from './levelForm';

import {connect} from "react-redux";
import {
	fetchPage,
} from '../../../actions'


const mapStateToProps = state => {
	return {
		data: state.paras.data,
		status: state.paras.status
	}
};

const mapDispatchToProps = dispatch => ({
	fetchPage: (id, title) => dispatch(fetchPage(id, title)),
});

class EditingModal extends React.Component {

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

			if (values.tocTitle === '' && values.title !== '') {
				values.tocTitle = values.title;
			}
			// values.isPage = (values.isPage === "true");

			let request_body;

			if (this.state.modifyState === 'New') {
				//create new level under selected parent level
				request_body = JSON.stringify({...values, parent: this.props.parent.id});
				postLevel(request_body).then(data => {
					if (!data || data.status !== 200) {
						console.error("Submit failed", data);
					} else {
						this.props.updateTree();
					}
				})
			} else {
				//modify selected parent Level
				request_body = JSON.stringify({...values});
				updateLevel(request_body, this.props.parent.id).then(data => {
					if (!data || data.status !== 200) {
						console.error("Update error", data);
					} else {
						this.props.updateTree();
					}
				})
			}

			form.resetFields();
			this.setState({
				visible: false,
				modifyState: '',
				loading: false
			});
		});
	};

	handleDelete = () => {
		const {form} = this.formRef.props;
		this.setState({loading: true});

		removeLevel(this.props.parent.id).then(data => {
			if (data.status !== 204) {
				console.error("Delete error", data);
			} else {
				this.props.updateTree();
			}
		});

		form.resetFields();
		this.setState({
			visible: false,
			modifyState: '',
			loading: false
		});
	};

	render() {
		const menu = this.props.parent.isPage ? (
			<Menu>
				<Menu.Item key="1" onClick={() => {
					this.showModal('Edit')
				}}>Edit</Menu.Item>
				<Menu.Item key="2" onClick={() => {
					this.showModal('Remove')
				}}>Remove</Menu.Item>
				<Menu.Item key="3" onClick={() => {
					console.log("copy linkable tag")
				}}>Get linkable tag</Menu.Item>

			</Menu>
		) : (
			<Menu>
				<Menu.Item key="1" onClick={() => {
					this.showModal('New')
				}}>New...</Menu.Item>
				<Menu.Item key="2" onClick={() => {
					this.showModal('Edit')
				}}>Edit</Menu.Item>
				<Menu.Item key="3" onClick={() => {
					this.showModal('Remove')
				}}>Remove</Menu.Item>
			</Menu>
		);

		return (
			<span
				onDoubleClick={() => {
					if (this.props.parent.isPage) {
						this.props.fetchPage(this.props.parent.id, this.props.parent.title);
						this.props.changePaneSize(300);
					}
				}}>

				<Dropdown overlay={menu} trigger={['contextMenu']}>
					<span
						style={{userSelect: 'none'}}>{this.props.parent.id + this.props.parent.title + this.props.parent.position.toString()}</span>
				</Dropdown>
				<LevelForm
					wrappedComponentRef={this.saveFormRef}
					visible={this.state.visible}
					onCancel={this.handleCancel}
					onCreate={this.handleCreate}
					onDelete={this.handleDelete}
					modifyState={this.state.modifyState}
					parent={this.props.parent}
					loading={this.state.loading}
				/>

			</span>
		);
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(EditingModal)
