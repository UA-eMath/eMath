import React from "react";
import {connect} from 'react-redux';
import {
	loadPage,
	loadPageError,
	openNewWindow,

} from '../../../actions'
import {Input} from 'antd';
import _ from "lodash";
import contentProcessor from './../../splitView/pageCreator/pageRenderer/index'
import {Scrollbars} from 'react-custom-scrollbars';


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
});


const {TextArea} = Input;


class Editor extends React.Component {
	constructor(props) {
		super(props)

	}

	render() {
		return (
			<div style={{
				overflowY: 'scroll',
			}}>
				{(this.props.status === null) ? (
					<div style={{display: 'flex', justifyContent: 'center', marginTop: '35%'}}>
						<p style={{fontSize: '25px'}}> Double click a page to edit.</p>
					</div>) : (
					<div style={{margin: '10px 10px'}}>
						{_.map(this.props.data, item => {
							return (
								<div
									key={item.id}>
									<TextArea

										defaultValue={JSON.stringify(item.content)}
										autosize={{minRows: 2, maxRows: 6}}
										style={{margin: '10px 0px'}}
									/>

									<div style={{background: "#FFFBE6"}}>
										{contentProcessor(item, this.props.onWindowOpen)}
									</div>
								</div>

							)
						})}
					</div>
				)}

			</div>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)