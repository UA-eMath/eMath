import {Button, DatePicker, Form, Input, message, Modal} from "antd";
import get from "lodash/get";
import React from 'react';
import updateLevel from "../../requests/updateLevel";
import updateBook from "../../requests/updateBook";
import removeBook from "../../requests/removeBook";
import moment from "moment";

class BookSetting extends React.Component {

	onDelete = (bookId) => {
		Modal.confirm({
			title: 'Are you sure delete this Book?',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk: () => {
				removeBook(bookId).then(data => {
					if (data.status !== 200) {
						console.error("Delete error", data);
					} else {
						console.log(data);
					}
				});
			},

		});
	};

	onUpdate = (nodeId, bookId) => {

		this.props.form.validateFields((err, values) => {
			if (err) {
				console.error(err);
			}

			let node_request_body;
			let root_request_body;


			node_request_body = JSON.stringify({
				title: values["title"],
				tocTitle: values["tocTitle"],
			});


			updateLevel(node_request_body, nodeId).then(data => {
				if (!data || data.status !== 200) {
					if (data.status === 400) {
						message.error(data.data);
					}
					console.error("Update error", node_request_body, data);
				}
			}).then(res => {
				root_request_body = JSON.stringify({
					...values,
					date: values['date'].format('YYYY-MM-DD'),
					title: values["html_title"],
				});
				console.log(root_request_body);
				updateBook(root_request_body, bookId).then(data => {
					if (!data || data.status !== 200) {
						if (data.status === 400) {
							console.log(data.data);
							message.error(data.data);
						}
						console.error("Update error", root_request_body, data);
					}
				});
			});

			message.success('Book information have been updated!');

		});
	};


	render() {
		const {getFieldDecorator} = this.props.form;
		const {book} = this.props;

		return (
			<Form layout="vertical" onSubmit={this.handleSubmit}>
				<Form.Item label="Title">
					{getFieldDecorator('title', {
						rules: [{required: true, message: 'Please input the title of collection!'}],
						initialValue: get(book, "title"),
					})(<Input/>)}
				</Form.Item>

				<Form.Item label="Table of content Title" extra="Leave it empty if same as title">
					{getFieldDecorator('tocTitle', {
						initialValue: get(book, "tocTitle"),
					})(<Input/>)}
				</Form.Item>

				<Form.Item label="HTML Title" extra="Leave it empty if same as title">
					{getFieldDecorator('html_title', {
						initialValue: get(book, ["root", "html_title"]),
					})(<Input/>)}
				</Form.Item>

				<Form.Item label="Date">
					{getFieldDecorator('date', {
						rules: [{type: 'object'}],
						initialValue: moment(get(book, ["root", "date"]))
					})(<DatePicker/>)}
				</Form.Item>

				<Form.Item>
					<Button key="submit" type="primary" onClick={() => this.onUpdate(book.id, book.root.id)}>
						Submit
					</Button>
				</Form.Item>
				
				<Form.Item>
					<Button type="danger" onClick={() => this.onDelete(book.id, book.root.id)}>Danger</Button>
				</Form.Item>


			</Form>
		)
	}
}

export default Form.create({name: 'validate_other'})(BookSetting);
