import React from 'react'
import {Form,Button, Modal, Input, Checkbox} from "antd";

const LevelForm = Form.create({name: 'form_in_modal'})(
	class extends React.Component {
		render() {
			const {visible, onCancel, onCreate, form, parent, modifyState,loading} = this.props;
			const {getFieldDecorator} = form;
			let title;
			if (modifyState === "New"){
				title = "Create a new branch under " + parent.tocTitle
			} else if (modifyState === "Edit"){
				title = "Edit " + parent.tocTitle
			}

			return (
				<Modal
					visible={visible}
					title={title}
					okText="Create"
					onCancel={onCancel}
					onOk={onCreate}
					footer={[
						<Button key="back" onClick={onCancel}>
							Cancel
						</Button>,
						<Button key="submit" type="primary" onClick={onCreate} loading={loading}>
							Submit
						</Button>,
					]}
				>
					<Form layout="vertical">
						<Form.Item label="Title">
							{getFieldDecorator('title', {
								rules: [{required: true, message: 'Please input the title of collection!'}],
								initialValue: modifyState === "New" ? '' : parent.title,
							})(<Input/>)}
						</Form.Item>

						<Form.Item label="Table of content Title" extra="Leave it empty if same as title">
							{getFieldDecorator('tocTitle', {
								initialValue: modifyState === "New" ? '' : parent.tocTitle,
							})(<Input/>)}
						</Form.Item>

						<Form.Item extra={"You will not be able to create a new branch under a page."}>
							{getFieldDecorator('isPage', {
								valuePropName: 'checked',
								initialValue: modifyState === "New" ? false : parent.isPage,
							})(<Checkbox>It will be a page</Checkbox>)}
						</Form.Item>
					</Form>
				</Modal>
			);
		}
	},
);

export default LevelForm;