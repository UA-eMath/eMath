import {Button, Modal, DatePicker, Form, Input, message} from "antd";

import React from 'react';
import updateLevel from "../../../requests/updateLevel";
import updateBook from "../../../requests/updateBook";

const BookSetting = Form.create({name: 'form_in_modal'})(
	class extends React.Component {

		onUpdate = (nodeId,bookId) => {
			const {form, setLoading, setVisible} = this.props;

			setLoading(true);

			form.validateFields((err, values) => {
				if (err) {
					return;
				}

				let node_request_body;
				let root_request_body;
				//create new book

				node_request_body = JSON.stringify({
					title: values["title"],
					tocTitle: values["tocTitle"],
				});

				root_request_body = JSON.stringify({
					title: values["html_title"],
					date: values['date'].format('YYYY-MM-DD'),
				});


				updateLevel(node_request_body, nodeId).then(data => {
					if (!data || data.status !== 200) {
						if (data.status === 400) {
							message.error(data.data);
						}
						console.error("Update error", node_request_body, data);
					}
				});

				updateBook(root_request_body, bookId).then(data => {
					if (!data || data.status !== 200) {
						if (data.status === 400) {
							message.error(data.data);
						}
						console.error("Update error", root_request_body, data);
					}
				});


				form.resetFields();
				setVisible(false);
				setLoading(false);

			});
		};

		render() {
			const {visible, onCancel, form, loading, book} = this.props;

			const {getFieldDecorator} = form;

			console.log(this.props);
			return (
				<Modal
					visible={visible}
					title={"Edit book info"}
					okText="Create"
					onCancel={onCancel}
					onOk={()=>this.onUpdate(book.id,book.root.id)}
					footer={[
						<Button key="back" onClick={onCancel}>
							Cancel
						</Button>,
						<Button key="submit" type="primary" onClick={()=>this.onUpdate(book.id,book.root.id)} loading={loading}>
							Submit
						</Button>,
					]}
				>
					<Form layout="vertical">
						<Form.Item label="Title">
							{getFieldDecorator('title', {
								rules: [{required: true, message: 'Please input the title of collection!'}],
								initialValue: book.title,
							})(<Input/>)}
						</Form.Item>

						<Form.Item label="Table of content Title" extra="Leave it empty if same as title">
							{getFieldDecorator('tocTitle', {
								initialValue: book.tocTitle,
							})(<Input/>)}
						</Form.Item>

						<Form.Item label="HTML Title" extra="Leave it empty if same as title">
							{getFieldDecorator('html_title', {
								initialValue: book.root.html_title,
							})(<Input/>)}
						</Form.Item>

						<Form.Item label="Date">
							{getFieldDecorator('date', {
								rules: [{type: 'object'}],
								// initialValue: moment(book.root.date)
							})(<DatePicker/>)}
						</Form.Item>

						//TODO add contributor

					</Form>
				</Modal>
			);

		}


	});


export default BookSetting;