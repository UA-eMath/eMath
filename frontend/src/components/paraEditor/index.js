import React from "react";
import {connect} from 'react-redux';
import {
	loadPage,
	loadPageError,
	openNewWindow,
	paraOnChange,
	popQueue,

} from '../../actions'
import {Input, message, Icon} from 'antd';
import _ from "lodash";
import contentProcessor from './../splitView/pageCreator/pageRenderer/index'
import {Scrollbars} from 'react-custom-scrollbars';
import EditorToolBar from './editorBar'
import postPara from "../../requests/postPara";
import updatePara from "../../requests/updatePara";


//this.props.data
const mapStateToProps = state => {
	return {
		data: state.paras.paras,
		status: state.paras.status,
		uploadingQueue: state.paras.uploadingQueue,
	}
};

const mapDispatchToProps = dispatch => ({
	loadPage: (id) => dispatch(loadPage(id)),
	loadPageError: (error) => dispatch(loadPageError(error)),
	onWindowOpen: (pageId) =>
		dispatch(openNewWindow(pageId)),
	paraOnChange: (para, id) => dispatch(paraOnChange(para, id)),
	popQueue: (id) => dispatch(popQueue(id)),

});


const {TextArea} = Input;


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
							{<span> Loading indicator: </span>}
							{this.state.uploading === true ? <Icon type="sync" spin/> : <Icon type="check"/>}
						</div>
						<Scrollbars
							style={{
								width: '83vw',
								height: "90vh",
								paddingBottom: '20px',
								margin: '10px',
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

								return (
									<div
										key={item.id}
										style={{
											display: this.state.sideAlign ? 'flex' : 'block'
										}}
									>

										<TextArea
											defaultValue={JSON.stringify(defaultValue)}
											style={{
												width: this.state.sideAlign ? '40vw' : '80vw',
												margin: '10px'
											}}
											onChange={(e) => this.setContent(e, item.id)}
										/>

										<div
											style={{
												width: this.state.sideAlign ? '40vw' : '80vw',
												margin: '10px',
												padding: '10px',
												background: "#FFFBE6",
											}}>
											{contentProcessor(this.props.data[i], this.props.onWindowOpen)}
										</div>
									</div>

								)
							})}
						</Scrollbars>

					</div>
				)}

			</div>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(ParaEditor)