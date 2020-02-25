import React from "react";
import {Button, Icon, Dropdown, Menu, } from "antd";
import AddIndex from "./addIndex";

export default class ParaControl extends React.Component {
	state = {
		visible: false,
		title: '',
	};

	showModal = (title) => {
		this.setState({
			visible: true,
			title: title
		})
	};

	toggleModal = () => {
		this.setState(prevState => ({visible: !prevState.visible}));
	};

	render() {
		const {visible, title} = this.state;

		const menu = <Menu>
			<Menu.Item key="1" onClick={() => {
				this.showModal('Glossary')
			}}>Glossary</Menu.Item>

			<Menu.Item key="2" onClick={() => {
				this.showModal('Symbol Index')
			}}>Symbol Index</Menu.Item>

			<Menu.Item key="3" onClick={() => {
				this.showModal('Author Index')
			}}>Author Index</Menu.Item>
		</Menu>;


		return (
			<div style={{
				height: "100%",
			}}>
				<div>
					<Button>
						<Icon type="up"/>
					</Button>
				</div>

				<div>
					<Button type={"danger"} onClick={() => this.props.delete(this.props.id)}>
						<Icon type="delete"/>
					</Button>
				</div>

				<Dropdown overlay={menu}>
					<Button>
						<Icon type="link" />
					</Button>
				</Dropdown>
				<AddIndex
						title={title}
						visible={visible}
						id={this.props.id}
						toggleModal={this.toggleModal}
				/>


				<div>
					<Button>
						<Icon type="down"/>
					</Button>
				</div>

			</div>
		)

	}

}