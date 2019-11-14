import React from "react";
import {connect} from 'react-redux';
import {
	loadPage,
	loadPageError,
	openNewWindow,
	paraOnChange,

} from '../../../actions'
import {Input,message} from 'antd';
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
	paraOnChange:(para,id) => dispatch(paraOnChange(para,id))
});


const {TextArea} = Input;


class Editor extends React.Component {
	constructor(props) {
		super(props)

	}

	setContent = (e,id) =>{
		// console.log(e.target.value);
		// console.log(id);
		try{
			JSON.parse(e.target.value);
			this.props.paraOnChange(e.target.value,id);
		} catch (err) {
			message.warning('Fail to parse your content!');
		}
	};

	render() {
		return (
			<div>
				{(this.props.status === null) ? (
					<div style={{display: 'flex', justifyContent: 'center', marginTop: '30%', background:'#FFF933'}}>
						<p style={{fontSize: '25px'}}> Double click a page to edit.</p>
					</div>) : (
						<Scrollbars
							style={{ width: '80vw' ,height:"100vh",display: 'flex', justifyContent: 'center'}}>
					<div style={{margin: '10px 10px'}}>
						{_.map(this.props.data, (item,i) => {
							let defaultValue;
							if(Array.isArray(item)){
								defaultValue = item.map(obj=>{
									return obj.content
								});
							} else {
								defaultValue = item.content
							}
							return (
								<div key={item.id}>
									<TextArea
										defaultValue={JSON.stringify(defaultValue)}
										autosize={{minRows: 2, maxRows: 6}}
										style={{margin: '10px 0px'}}
										onChange={(e)=>this.setContent(e,item.id)}
									/>

									<div style={{padding: '10px 10px', background: "#FFFBE6"}}>
										{contentProcessor(this.props.data[i], this.props.onWindowOpen)}
									</div>
								</div>

							)
						})}
					</div>
						</Scrollbars>
				)}

			</div>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)