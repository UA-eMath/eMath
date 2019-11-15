import React from "react";
import {connect} from 'react-redux';
import {
	loadPage,
	loadPageError,
	openNewWindow,
	paraOnChange,

} from '../../actions'
import {Input, message, Icon} from 'antd';
import _ from "lodash";
import contentProcessor from './../splitView/pageCreator/pageRenderer/index'
import {Scrollbars} from 'react-custom-scrollbars';
import EditorToolBar from './editorBar'

//this.props.data
const mapStateToProps = state => {
	return {
		data: state.paras.paras,
		status: state.paras.status
	}
};

const mapDispatchToProps = dispatch => ({
	loadPage: (id) => dispatch(loadPage(id)),
	loadPageError: (error) => dispatch(loadPageError(error)),
	onWindowOpen: (pageId) =>
		dispatch(openNewWindow(pageId)),
	paraOnChange: (para, id) => dispatch(paraOnChange(para, id))
});


const {TextArea} = Input;


class ParaEditor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			uploading: true,
			sideAlign: true,
		}
	}

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

	switchView = () =>{
		this.setState(prevState=>({
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

						<Scrollbars
							style={{
								width: '83vw',
								height: "90vh",
								paddingBottom: '20px',
								margin:'10px',
							}}
						>
							{_.map(this.props.data, (item, i) => {
								let defaultValue;
								if (Array.isArray(item)) {
									defaultValue = item.map(obj => {
										return obj.content
									});
								} else {
									defaultValue = item.content
								}

								const suffix = (this.state.uploading === true) ? (<Icon type="sync" spin/>)
									: (
										<span/>);
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
											suffix={
												suffix
											}
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