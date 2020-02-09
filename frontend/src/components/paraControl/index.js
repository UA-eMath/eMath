import React from "react";
import {Button, Icon} from "antd";


export default class ParaControl extends React.Component {

	render() {
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

				<div>
					<Button>
						<Icon type="down"/>
					</Button>
				</div>

			</div>
		)

	}

}