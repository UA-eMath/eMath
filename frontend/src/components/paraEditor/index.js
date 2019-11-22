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
import contentProcessor from './../splitView/pageCreator/pageRenderer/index'
import {Scrollbars} from 'react-custom-scrollbars';
import EditorToolBar from './editorBar'
import postPara from "../../requests/postPara";
import updatePara from "../../requests/updatePara";
import removePara from "../../requests/removePara";
import MathJax from "../mathDisplay";
import MathJaxConfig from "../../constants/MathJax_config";


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
		};

		this.uploadingData = this.uploadingData.bind(this);
	}

	//save para periodically
	async componentDidMount() {
		setInterval(this.uploadingData, 10000)
	}

	async uploadingData() {
		if (!_.isEmpty(this.props.uploadingQueue)) {
			try {
				this.setState({
					uploading: true
				});
				console.log(this.props.uploadingQueue);

				for (let key in this.props.uploadingQueue) {
					if (!this.props.uploadingQueue.hasOwnProperty(key)) continue;

					if (this.props.uploadingQueue[key]) {
						if (this.props.uploadingQueue[key].status === "update") {

							let request_body = JSON.stringify({
								"content": this.props.uploadingQueue[key]["content"],
								"caption": this.props.uploadingQueue[key]["caption"],
							}, key);

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

	setContent = (e, id) => {
		// console.log(e.target.value);
		// console.log(id);
		try {
			JSON.parse(e.target.value);
			this.props.paraOnChange(e.target.value, id);
		} catch (err) {
			message.warning('There might be an error in your content!');
		}
	};

	switchView = () => {
		this.setState(prevState => ({
			sideAlign: !prevState.sideAlign
		}))
	};

	addPara = () => {
		//this.props.id
		let request_body;
		request_body = JSON.stringify({
			"content": {
				"data": {
					"content": "",
					"textAlign": "",
				},
				"type": "text"
			},

			"caption": "",
			"para_parent": this.props.id
		});

		postPara(request_body).then(data => {
			if (!data || data.status !== 200) {
				console.error("Failed to add para", data);
			}
			else {
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
					}
					else {
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

						<EditorToolBar switchView={this.switchView}/>
						<div style={{backgroud: "white"}}>
							{<Button type="primary" icon="upload" loading={this.state.uploading}
							         onClick={() => this.uploadingData()}/>}
						</div>
						<h3 align={"center"}>
							{this.props.title}
						</h3>
						<Scrollbars
							style={{
								width: '83vw',
								height: "80vh",
								paddingBottom: '20px',
								margin: '10px',
								"textAlign": "center",
							}}
						>
							{_.map(this.props.data, (item, i) => {
								let defaultValue;
								if (Array.isArray(item)) {
									defaultValue = item.map(obj => {
										return obj.content.data.content
									});
								} else {
									defaultValue = item.content.data.content
								}

								let textArea =
									<TextArea
										defaultValue={JSON.stringify(defaultValue)}
										// autosize={this.state.sideAlign}

										style={{
											fontSize: "15px",
											marginBottom: "10px",
											height: "100%",
										}}
										onChange={(e) => this.setContent(e, item.id)}
									/>;

								let displayArea =
									<MathJax.Provider
										{...MathJaxConfig}
										onError={(MathJax, error) => {
											console.warn(error);
											console.log("Encountered a MathJax error, re-attempting a typeset!");
											MathJax.Hub.Queue(
												MathJax.Hub.Typeset()
											);
										}}
									>
										<div
											style={{
												background: "#FFFBE6",
												display: "block",
												marginBottom: "10px",
												height: "100%",
											}}>
											{contentProcessor(this.props.data[i], this.props.onWindowOpen)}
										</div>
									</MathJax.Provider>;

								let controlArea =
									<div style={{
										background: "white",
										height: "100%",
									}}>
										<Button>
											<Icon type="up"/>
										</Button>

										<Button type={"danger"} onClick={() => this.deletePara(item.id)}>
											<Icon type="delete"/>
										</Button>

										<Button>
											<Icon type="down"/>
										</Button>
									</div>;

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
												{textArea}
											</Col>

											<Col span={10} style={{
												margin: "10px",
											}}>
												{displayArea}
											</Col>

											<Col span={1} style={{
												margin: "10px",
											}}>
												{controlArea}
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
												{textArea}
												{displayArea}

											</Col>

											<Col span={1}
											     style={{
												     margin: "10px"
											     }}
											>
												{controlArea}
											</Col>

										</Row>
									)
								}
							})}

							<Tooltip placement="bottom" title={"Add one para"}>
								<Button onClick={this.addPara} size={"large"} style={{width: "30vw"}}>
									<Icon type="plus"/>
								</Button>
							</Tooltip>

						</Scrollbars>

					</div>
				)}

			</div>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(ParaEditor)