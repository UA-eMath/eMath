import React from "react";
import _ from "lodash"
import {Col, Radio, Row} from "antd";
import InputBox from "../../InputBox";
import DisplayArea from "../../displayArea";
import ParaControl from "../../paraControl";

class SubLevel extends React.Component {
	constructor(props) {
		super(props);
	}


	render() {
		const {children, alignment, deletePara, setContent,} = this.props;

		return (
			<React.Fragment>
				{_.map(children, item => {
					if (alignment) {
						return (
							<Row
								key={item.id}
								style={{
									display: "flex"
								}}
							>
								<Col span={11} style={{
									margin: "10px",
								}}>
									<InputBox id={item.id} boxValue={item.content.data}
									          setContent={() => this.setContent()}/>
								</Col>

								<Col span={10} style={{
									margin: "10px",
								}}>
									<DisplayArea id={item.id}/>
								</Col>

								<Col span={1} style={{
									margin: "10px",
								}}>
									<ParaControl id={item.id}
									             deletePara={this.deletePara}/>
								</Col>
							</Row>
						)
					} else {

					}


				})}

			</React.Fragment>


		)
	}

}


export default SubLevel;