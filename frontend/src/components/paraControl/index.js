import React from "react";
import {Button, Icon} from "antd";


export default class ParaControl extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={{
				background: "white",
				height: "100%",
			}}>
				<Button>
					<Icon type="up"/>
				</Button>

				<Button type={"danger"} onClick={() => this.props.delete(this.props.id)}>
					<Icon type="delete"/>
				</Button>

				<Button>
					<Icon type="down"/>
				</Button>
			</div>
		)

	}

}