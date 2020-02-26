import {Button, Form, Input, Modal, message, TreeSelect} from "antd";
import React from 'react';
import updateBook from "../../../requests/updateBook";

const AddIndex = Form.create({name: 'form_in_modal'})(
	class extends React.Component {

		state = {
			selectedValue: null
		};

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
				parent:value
			});
		};

		onAdd = () => {
			const {title, form, id, toggleModal} = this.props;
			form.validateFields((err, values) => {
				if (err) {
					return;
				}

				let request_body;

				request_body = JSON.stringify({
					add: title,
					path: values["path"],
					referredId: id
				});

				updateBook(request_body, id).then(data => {
					if (!data || data.status !== 200) {
						if (data.status === 400) {
							message.error(data.data);
						}
						console.error("Update error", request_body, data);
					}
				});

				toggleModal();

			});
		};

		render() {
			const {title, visible, toggleModal, form, indexTree} = this.props;
			const {getFieldDecorator} = form;

			let itemSelection = <TreeSelect
				style={{width: '100%'}}
				dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
				treeData={indexTree}
				placeholder="Please select"
				treeDefaultExpandAll
				onChange={this.onChange}
			/>;

			return (
				<Modal
					visible={visible}
					title={"Enter " + title + " item"}
					onCancel={toggleModal}
					footer={[
						<Button key="back" onClick={toggleModal}>
							Cancel
						</Button>,
						<Button key="submit" type="primary" onClick={() => this.onAdd()}>
							Submit
						</Button>,
					]}
				>
					<Form layout="vertical">
						<Form.Item
							extra={"Use ! as separator to build a tree structure. e.g. : addition!matrices!associativity property"}>
							{getFieldDecorator('path', {
								initialValue: '',
							})(<Input/>)}
						</Form.Item>

						<Form.Item extra={"You could select parent of new item from existing tree."}>
							{getFieldDecorator('parent',{
								initialValue : ''
							})
							(itemSelection)
							}
						</Form.Item>

					</Form>
				</Modal>
			)
		}
	}
);

export default AddIndex;