import {Button, Modal, DatePicker, Form, Input} from "antd";

import React from 'react';
import postBook from "../../../requests/postBook";

const AddBook = Form.create({name: 'form_in_modal'})(
	class extends React.Component {

		onCreate = () => {
			const {form, setLoading, setVisible,fetchRoots} = this.props;

			setLoading(true);

			form.validateFields((err, values) => {
				if (err) {
					return;
				}

				let request_body;
				//create new book

				request_body = JSON.stringify({
					...values,
					date: values['date'].format('YYYY-MM-DD'),
					isPage: false,
				});

				postBook(request_body).then(data => {
					if (!data || data.status !== 200) {
						console.error("Submit failed", data);
					} else {
						return data.data.id;
					}
				}).then(()=>
					{fetchRoots();}
				);

				form.resetFields();
				setVisible(false);
				setLoading(false);

			});
		};

		render() {
			const {visible, onCancel, form, loading} = this.props;

			const {getFieldDecorator} = form;

			console.log(this.props);
			return (
				<Modal
					visible={visible}
					title={"Create a new book"}
					okText="Create"
					onCancel={onCancel}
					onOk={this.onCreate}
					footer={[
						<Button key="back" onClick={onCancel}>
							Cancel
						</Button>,
						<Button key="submit" type="primary" onClick={this.onCreate} loading={loading}>
							Submit
						</Button>,
					]}
				>
					<Form layout="vertical">
						<Form.Item label="Title">
							{getFieldDecorator('title', {
								rules: [{required: true, message: 'Please input the title of collection!'}],
							})(<Input/>)}
						</Form.Item>

						<Form.Item label="Table of content Title" extra="Leave it empty if same as title">
							{getFieldDecorator('tocTitle')(<Input/>)}
						</Form.Item>

						<Form.Item label="HTML Title" extra="Leave it empty if same as title">
							{getFieldDecorator('html_title')(<Input/>)}
						</Form.Item>

						<Form.Item label="Date">
							{getFieldDecorator('date', {
								rules: [{type: 'object'}],
							})(<DatePicker/>)}
						</Form.Item>

						//TODO add contributor

					</Form>
				</Modal>
			);

		}


	});


export default AddBook;