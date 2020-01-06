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
import paraRenderer from "../../pageRenderer";
import {Scrollbars} from 'react-custom-scrollbars';
import EditorToolBar from './editorBar'
import postPara from "../../requests/postPara";
import updatePara from "../../requests/updatePara";
import removePara from "../../requests/removePara";
import MathJax from "../mathDisplay";
import MathJaxConfig from "../../constants/MathJax_config";
import "./style/index.css";
import InputBox from "../InputBox";

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
		this.insertAtCursor = this.insertAtCursor.bind(this);

		this.inputArea = [];

		this.setTextInputRef = element => {
			this.inputArea.push(element);
		};
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


	setContent = (e, id) => {
		// console.log(e.target.selectionStart);
		// console.log(id);
		//undefined => content block
		try {
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
				"data": ""
			},
			"para_parent": this.props.id
		});

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

	insertAtCursor = (tag, length) => {
		let focusedTextarea = document.getElementById(this.state.focusArea);
		console.log(focusedTextarea.value, focusedTextarea.selectionStart, focusedTextarea.selectionEnd);

		if (focusedTextarea.value !== undefined) {
			let prefix = (focusedTextarea.value).substring(0, focusedTextarea.selectionStart);
			let suffix = (focusedTextarea.value).substring(focusedTextarea.selectionStart, focusedTextarea.value.length);

			let prePos = focusedTextarea.selectionStart;
			focusedTextarea.value = prefix + tag + suffix;

			focusedTextarea.selectionStart = prePos + length;
			focusedTextarea.selectionEnd = focusedTextarea.selectionStart;
		}
		console.log(focusedTextarea.value, focusedTextarea.selectionStart, focusedTextarea.selectionEnd);

	};

	render() {
		return (
			<div>
				{(this.props.status === null) ? (
					<div style={{display: 'flex', justifyContent: 'center', marginTop: '35%', background: '#FFF933'}}>
						<p style={{fontSize: '25px'}}> Double click a page to edit.</p>
					</div>) : (

					<div>

						<EditorToolBar switchView={this.switchView} tagInsertion={this.insertAtCursor}/>
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
							}}
						>
							{_.map(this.props.data, (item, i) => {
								let defaultValue;
								let textArea;

								//TODO unescape here
								defaultValue = decodeURI(item.content.data);
								textArea =
									<TextArea
										ref={this.setTextInputRef}
										id={item.id}
										defaultValue={defaultValue}
										style={{
											height: "100%",
										}}
										className="userInput"
										onFocus={() => {
											this.setState({focusArea: item.id})
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
												height: "100%",
												padding: "10px",
											}}>
											{/*TODO: need to handle open window activity*/}
											{paraRenderer(this.props.data[i], this.props.onWindowOpen)}
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
								<Button
									onClick={this.addPara}
									size={"large"}
									style={{
										width: "30vw",
										justifyContent: "center",
									}}
								>
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