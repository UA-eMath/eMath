import {Button, Form, Input, Modal, message, TreeSelect, Icon, List} from "antd";
import React from 'react';
import updateIndexTree from "../../../requests/updateIndexTree";
import {getIndexItems} from "../../../requests/getTree";
import removeIndexItem from "../../../requests/removeIndexItem";

const AddIndex = Form.create({name: 'form_in_modal'})(
	class extends React.Component {

		state = {
			selectedValue: null,
			indexItemList: []
		};


		componentDidUpdate(prevProps, prevState, snapshot) {
			if (prevProps.title !== this.props.title) {
				//get index item list
				getIndexItems(this.props.id, this.props.title).then(
					data => {
						if (!data || data.status !== 200) {
							console.error("FETCH_index_item_FAILED", data);
						} else {
							console.log(data.data);
							this.setState({indexItemList: data.data});
						}
					}
				);
			}
		}

		getPath = (value) => {
			const path = [];
			let current = this.props.valueMap[value];
			while (current) {
				path.unshift(current.title);
				current = current.parent;
			}
			return path;
		};

		onChange = value => {
			let path = this.getPath(value);
			this.props.form.setFieldsValue({
				path: path.join("!"),
				parent: value
			});
		};

		onAdd = () => {
			const {title, form, id, toggleModal} = this.props;
			form.validateFields((err, values) => {
				if (err) {
					return;
				}

				if (typeof this.state.indexItemList.find(ele=>ele === values["path"]) !=="undefined"){
					//already created
					return message.error( title + " item already exists.")
				}

				let request_body;

				request_body = JSON.stringify({
					add: title,
					path: values["path"],
					referredId: id
				});

				updateIndexTree(request_body, id).then(data => {
					if (!data || data.status !== 200) {
						if (data.status === 400) {
							message.error(data.data);
						}
						console.error("Update error", request_body, data);
					}
				}).then(res => {
					getIndexItems(this.props.id, this.props.title).then(
						data => {
							if (!data || data.status !== 200) {
								console.error("FETCH_index_item_FAILED", data);
							} else {
								console.log(data.data);
								this.setState({indexItemList: data.data});
							}
						}
					).then(res => {
						this.props.getNewIndexTree(this.props.title)
					});
				});
			});
		};

		removeIndexItem = (indexItem) => {
			removeIndexItem(this.props.id, this.props.title, indexItem).then(data => {
				if (!data || data.status !== 200) {
					if (data.status === 400) {
						message.error(data.data);
					}
					console.error("Update error", data);
				}
			}).then((res) => {
				getIndexItems(this.props.id, this.props.title).then(
					data => {
						if (!data || data.status !== 200) {
							console.error("FETCH_Glossary_FAILED", data);
						} else {
							console.log(data.data);
							this.setState({indexItemList: data.data});
						}
					}
				).then(res => {
					this.props.getNewIndexTree(this.props.title)
				});
			});
		};

		handleCancel = () => {
			this.props.toggleModal()
		};

		render() {
			const {title, visible, form, indexTree} = this.props;
			const {getFieldDecorator} = form;

			let itemSelection = <TreeSelect
				showSearch
				style={{width: '100%'}}
				dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
				treeData={indexTree}
				placeholder="Select parent of new item from existing tree."
				treeDefaultExpandAll
				onChange={this.onChange}
			/>;

			const layout = {
				labelCol: {span: 5},
				wrapperCol: {span: 19},
			};
			return (
				<Modal
					visible={visible}
					title={"Enter " + title + " item"}
					onCancel={this.handleCancel}
					footer={[
						<Button key="back" onClick={this.handleCancel}>
							Close
						</Button>,
					]}
				>
					<List
						bordered
						dataSource={this.state.indexItemList}
						renderItem={item => (
							<List.Item
								actions={[<Button
									type="danger"
									ghost
									onClick={() => this.removeIndexItem(item)}>-</Button>]}
							>
								{item}
							</List.Item>
						)}/>

					<Form {...layout}>
						<span style={{
							display: "table",
							marginTop: "50px",
							textAlign: "center",
							border: "1px solid grey",
							borderStyle: "dashed",
							width: "100%"
						}}>
							<span style={{
								display: "table-cell",
								verticalAlign: "middle",
								padding: "30px 10px 0px"
							}}>
								<Form.Item  label={"Index item:"}>
								{getFieldDecorator("path", {
									initialValue: '',
								})(<Input/>)}
							</Form.Item>

							<Form.Item  label="Select">
								{getFieldDecorator('parent', {})(itemSelection)}
							</Form.Item>

							</span>

							<span style={{
								display: "table-cell",
								verticalAlign: "middle"
							}}>
								<Button onClick={this.onAdd}>Valid</Button>
							</span>

						</span>


					</Form>
				</Modal>
			)
		}
	}
);

export default AddIndex;








