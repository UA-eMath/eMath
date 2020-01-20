import React from "react";
import {connect} from 'react-redux';
import {
	loadPage,
	loadPageError,
	openNewWindow,
	paraOnChange,
	popQueue,
	fetchPage,
} from '../../actions'
import {Input, message, Button, Icon, Tooltip, Row, Col, Modal} from 'antd';
import _ from "lodash";
import {Scrollbars} from 'react-custom-scrollbars';
import EditorToolBar from '../editorBar'
import postPara from "../../requests/postPara";
import updatePara from "../../requests/updatePara";
import removePara from "../../requests/removePara";
import "./style/index.css";
import InputBox from "../InputBox";
import DisplayArea from "../displayArea";
import ParaControl from "../paraControl";
import SubLevel from "./subLevel";

//this.props.data
const mapStateToProps = state => {
	return {
		data: state.paras.paras,
		status: state.paras.status,
		uploadingQueue: state.paras.uploadingQueue,
		title: state.paras.title,
		id: state.paras.id,
	}
};

const mapDispatchToProps = dispatch => ({
	fetchPage: (id, title) => dispatch(fetchPage(id, title)),
	loadPage: (id) => dispatch(loadPage(id)),
	loadPageError: (error) => dispatch(loadPageError(error)),
	onWindowOpen: (pageId) =>
		dispatch(openNewWindow(pageId)),
	paraOnChange: (para, id) => dispatch(paraOnChange(para, id)),
	popQueue: (id) => dispatch(popQueue(id)),
});


const {TextArea} = Input;
const {confirm} = Modal;


class ParaEditor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			uploading: false,
			sideAlign: true,
			intervalId: null,
			focusedArea: null,
		};

		this.uploadingData = this.uploadingData.bind(this);
	}

	//save para periodically
	async componentDidMount() {
		const id = setInterval(this.uploadingData, 10000);
		this.setState({
			intervalId: id,
		})
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId)
	}

	componentDidCatch(error, errorInfo) {
		//  log the error
		console.log(error, errorInfo);
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return {hasError: true};
	}

	async uploadingData() {
		if (!_.isEmpty(this.props.uploadingQueue)) {
			try {
				this.setState({
					uploading: true
				});

				for (let key in this.props.uploadingQueue) {
					if (!this.props.uploadingQueue.hasOwnProperty(key)) continue;

					if (this.props.uploadingQueue[key]) {
						if (this.props.uploadingQueue[key].status === "update") {

							let request_body = JSON.stringify({
								"content": this.props.uploadingQueue[key]["content"],
							}, key);

							//TODO open auto save
							await updatePara(request_body, key).then(data => {
								if (!data || data.status !== 200) {
									if (data.status === 400) {
										message.error(data.data);
									}
									console.error("Update Para error", request_body, data);

								}
							});
							this.props.popQueue(key);
						}
					}

				}
				this.setState({
					uploading: false
				})
			} catch (error) {
				console.log(error);
			}
		}
	};

	setFocusArea = (boxId) => {
		this.setState({
			focusedArea: boxId,
		})
	};

	switchView = () => {
		this.setState(prevState => ({
			sideAlign: !prevState.sideAlign
		}))
	};

	getItemById(id) {
		let flatState = this.props.data.flat(Infinity);
		return flatState[flatState.findIndex(i => i.id === id)];
	}

	addPara = () => {
		//this.props.id
		let request_body;
		let position = null;
		let parentId = this.props.id;
		if (this.state.focusedArea !== null) {
			//behind on focused area
			let focusedPara = this.getItemById(this.state.focusedArea);
			console.log(focusedPara);
			if (typeof focusedPara !== "undefined") {
				//the position para want to be put
				position = focusedPara.position + 1;
				//check if inside a sub level
				if (parentId !== focusedPara.para_parent.id) {
					parentId = focusedPara.para_parent.id
				}
			}
		}

		request_body = JSON.stringify({
			"content": {
				"data": ""
			},
			"position": position,
			"para_parent": parentId
		});

		console.log(request_body);

		postPara(request_body).then(data => {
			if (!data || data.status !== 200) {
				console.error("Failed to add para", data);
			} else {
				console.log(data);
				this.props.fetchPage(this.props.id, this.props.title);
			}
		})
	};

	deletePara = (id) => {
		confirm({
			title: 'Are you sure delete this paragraph?',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk: () => {
				removePara(id).then(data => {
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
		return (
			<div>
				{(this.props.status === null) ? (
					<div style={{display: 'flex', justifyContent: 'center', marginTop: '35%', background: '#FFF933'}}>
						<p style={{fontSize: '25px'}}> Double click a page to edit.</p>
					</div>) : (

					<div>

						<EditorToolBar
							uploadingData={this.uploadingData}
							addPara={this.addPara}
							switchView={this.switchView}
							uploading={this.state.loading}
							parent={this.props.id}
							parentTitle={this.props.title}
							focusedArea = {this.state.focusedArea}
						/>

						<h3 align={"center"}>
							{this.props.title}
						</h3>
						<Scrollbars
							style={{
								width: '83vw',
								height: "80vh",
								paddingBottom: '20px',
								margin: '10px',
							}}
						>
							{_.map(this.props.data, (item, i) => {
								if (Array.isArray(item)) {
									return <SubLevel
										key={i}
										children={item}
										alignment={this.state.sideAlign}
										deletePara={this.deletePara}
										setFocusArea={this.setFocusArea}
										id={this.props.id}
									/>
								}

								if (this.state.sideAlign) {
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
												          setFocusArea={this.setFocusArea}
												          boxValue={item.content.data}/>
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
												             delete={this.deletePara}/>
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
												<InputBox id={item.id}
												          boxValue={item.content.data}
												          setFocusArea={this.setFocusArea}
												/>

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
							})}

						</Scrollbars>

					</div>
				)}

			</div>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(ParaEditor)