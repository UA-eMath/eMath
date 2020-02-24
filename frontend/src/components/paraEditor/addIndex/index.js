import {Button, Form, Input, Modal, message} from "antd";
import React from 'react';
import updateBook from "../../../requests/updateBook";

const AddIndex = Form.create({name: 'form_in_modal'})(
	class extends React.Component {
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
			const {title, visible, toggleModal, form} = this.props;
			const {getFieldDecorator} = form;

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
						<Form.Item>
							{getFieldDecorator('path', {
								initialValue: ''
							})(<Input/>)}
						</Form.Item>
					</Form>
				</Modal>
			)
		}
	}
);

export default AddIndex;