import React from "react";
import {Button, Icon, Switch} from 'antd';

import {connect} from 'react-redux';
import {
	loadPage,
	loadPageError,
} from '../../../actions'


const mapStateToProps = state => {
	return {
		data: state.paras.data,
		status: state.paras.status
	}
};

const mapDispatchToProps = dispatch => ({
	loadPage: (id) => dispatch(loadPage(id)),
	loadPageError: (error) => dispatch(loadPageError(error))
});

const ButtonGroup = Button.Group;

class EditorToolBar extends React.Component {
	constructor(props) {
		super(props);


	}

	render() {
		return (
			<div style={{
				background: '#F3F3F3',
				padding: '10px 10px 10px'
			}}>
				<ButtonGroup>
					<Button>
						Cap
					</Button>

					<Button>
						<Icon type="bold"/>
					</Button>

					<Button>
						<Icon type="italic"/>
					</Button>
					<Button>
						<Icon type="link"/>
					</Button>
					<Button>
						<Icon type="file-image"/>
					</Button>
					<Button>
						<Icon type="ordered-list"/>
					</Button>
					<Button>
						<Icon type="unordered-list"/>
					</Button>

					<Button>
						<Icon type="table"/>
					</Button>

				</ButtonGroup>

				<ButtonGroup className={"float-right"}>
					<Button style={{
						width: '100px'
					}}>
						<Icon type="plus"/>
					</Button>
				</ButtonGroup>

				<br/>

				<ButtonGroup style={{marginTop: "10px"}}>
					<Switch checkedChildren="LR"
					        unCheckedChildren="TB"
					        defaultChecked
					        onChange={this.props.switchView}
					/>
				</ButtonGroup>

				{/*<ButtonGroup>*/}
				{/*</ButtonGroup>*/}
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorToolBar)





