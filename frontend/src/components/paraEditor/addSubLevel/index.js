import React from 'react'
import {Form, Button, Modal, Input, Checkbox, Icon} from "antd";

const AddSubLevel = Form.create({name: 'form_in_modal'})(
	class extends React.Component {

		render() {
			const {visible, onCancel, onCreate, form, loading} = this.props;
			const {getFieldDecorator} = form;

			return (
				<Modal
					visible={visible}
					title={"Add sub-level"}
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
								initialValue: '',
							})(<Input/>)}
						</Form.Item>

						<Form.Item label="Table of content Title" extra="Leave it empty if same as title">
							{getFieldDecorator('tocTitle', {
								initialValue: '',
							})(<Input/>)}
						</Form.Item>

					</Form>
				</Modal>
			);
		}
	},
);

export default AddSubLevel;