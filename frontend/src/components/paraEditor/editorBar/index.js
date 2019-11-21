import React from "react";
import {Button, Icon, Switch, Tooltip} from 'antd';

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
					<Tooltip placement="bottom" title={"Caption"}>
						<Button>
							Cap
						</Button>
					</Tooltip>

					<Tooltip placement="bottom" title={"Bold"}>
						<Button>
							<Icon type="bold"/>
						</Button>
					</Tooltip>

					<Tooltip placement="bottom" title={"Italic"}>
						<Button>
							<Icon type="italic"/>
						</Button>
					</Tooltip>

					<Tooltip placement="bottom" title={"Link"}>
						<Button>
							<Icon type="link"/>
						</Button>
					</Tooltip>

					<Tooltip placement="bottom" title={"Image"}>
						<Button>
							<Icon type="file-image"/>
						</Button>
					</Tooltip>

					<Tooltip placement="bottom" title={"Numbered List"}>
						<Button>
							<Icon type="ordered-list"/>
						</Button>
					</Tooltip>

					<Tooltip placement="bottom" title={"Bulleted List"}>
						<Button>
							<Icon type="unordered-list"/>
						</Button>
					</Tooltip>

					<Tooltip placement="bottom" title={"Table"}>
						<Button>
							<Icon type="table"/>
						</Button>
					</Tooltip>

				</ButtonGroup>

				<ButtonGroup className={"float-right"}>
					<Tooltip placement="bottom" title={"Add content block"}>
						<Button style={{
							width: '100px'
						}}>
							<Icon type="plus"/>
						</Button>
					</Tooltip>
				</ButtonGroup>

				<br/>

				<ButtonGroup style={{marginTop: "10px"}}>
					<Switch checkedChildren="LR"
					        unCheckedChildren="TB"
					        defaultChecked
					        onChange={this.props.switchView}
					/>
				</ButtonGroup>

			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorToolBar)





