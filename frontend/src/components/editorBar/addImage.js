import {Button, Modal, Form, Input} from "antd";
import React from 'react';

const AddImage = Form.create({name: 'form_in_modal'})(
	class extends React.Component {
		onCreate = () => {
			const {form, hideImageModel,addPara} = this.props;

			form.validateFields((err, values) => {
				if (err) {
					return;
				}
				let url = values['url'].replace("https://drive.google.com/open","https://drive.google.com/uc");

				url = '<img src="' + url + '"/>';

				addPara(url);

				form.resetFields();
				hideImageModel();

			});
		};

		render() {
			const {visible, hideImageModel, form} = this.props;
			const {getFieldDecorator} = form;

			return (
				<Modal
					visible={visible}
					title={"Input URL"}
					footer={[
						<Button key="back" onClick={hideImageModel}>
							Cancel
						</Button>,
						<Button key="submit" type="primary" onClick={() => this.onCreate()}>
							OK
						</Button>,
					]}
				>
					<Form layout="vertical">
						<Form.Item label="URL">
							{getFieldDecorator('url',{
								initialValue:""
							})(<Input/>)}
						</Form.Item>
					</Form>
				</Modal>
			);

		}


	});


export default AddImage;