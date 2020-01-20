import React from "react";
import _ from "lodash"
import {Col, Input, Modal, Row} from "antd";
import InputBox from "../../InputBox";
import DisplayArea from "../../displayArea";
import ParaControl from "../../paraControl";
import removeLevel from "../../../requests/removeLevel";

const {TextArea} = Input;
const {confirm} = Modal;

class SubLevel extends React.Component {
	constructor(props) {
		super(props);
	}

	deleteLevel = (id) => {
		confirm({
			title: 'Are you sure delete this Level?',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk: () => {
				removeLevel(id).then(data => {
					if (data.status !== 204) {
						console.error("Delete error", data);
					} else {
						console.log(data);
						this.props.fetchPage(this.props.id, this.props.title);
					}
				})
			},
			onCancel() {
			},
		});

	};

	render() {
		const {children, alignment, deletePara,} = this.props;

		let left_title = children[0].para_parent.tocTitle;
		let right_title = children[0].para_parent.title;

		let boxHeader;
		if (left_title || right_title) {
			boxHeader =
				<div
					style={{
						background: 'linear-gradient(#fdf5e8,#EAE7DC)',
						borderRadius: '2px 2px 0 0',
						padding: "2px 4px 2px 4px",
						marginBottom: "5px",
					}}>
				<span style={{
					marginLeft: "10px"
				}}>
					<b>{left_title}</b>
				</span>
					<span
						style={{
							float: "right",
							fontWeight: "bold",
							marginRight: "80px"
						}}>
					{right_title}
				</span>
				</div>
		}

		let content = _.map(children, item => {
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
							<InputBox id={item.id}
							          boxValue={item.content.data}
							          setFocusArea={this.props.setFocusArea}/>
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
							             delete={deletePara}/>
						</Col>
					</Row>
				)
			} else {
				return (
					<Row
						key={item.id}
					>
						<Col span={21}
						     style={{
							     margin: "10px"
						     }}
						>
							{boxHeader}
							<InputBox id={item.id}
							          boxValue={item.content.data}
							          setFocusArea={this.props.setFocusArea}/>

							<DisplayArea id={item.id}/>

						</Col>

						<Col span={1}
						     style={{
							     margin: "10px"
						     }}
						>
							<ParaControl id={item.id}
							             delete={this.deletePara}/>
						</Col>

					</Row>
				)
			}

		});

		let subLevelControl = <ParaControl id={children[0].para_parent.id}
		                                   delete={this.deleteLevel}/>;


		return (

			<div style={{
				background: '#fdf5e8',
				borderRadius: '2px',
				boxShadow: '0 0 0 1px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.35)',
				marginBottom: '10px',
				paddingBottom: "30px",
			}}>
				<Row>
					<Col span={15}>
						{boxHeader}
					</Col>
					<Col span={7}>
						{subLevelControl}
					</Col>
				</Row>
				<Row>
					{content}
				</Row>


			</div>
	)
	}
	}

	export default SubLevel;