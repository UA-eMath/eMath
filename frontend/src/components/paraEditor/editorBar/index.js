import React from "react";
import {Button, Icon, Switch, Tooltip} from 'antd';
import {HotKeys} from "react-hotkeys";

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
							<Button onClick={() => this.props.tagInsertion('<b></b> ', 3)}>
								<Icon type="bold"/>
							</Button>
						</Tooltip>

						<Tooltip placement="bottom" title={"Italic"}>
							<Button onClick={() => this.props.tagInsertion('<i></i> ', 3)}>
								<Icon type="italic"/>
							</Button>
						</Tooltip>

						<Tooltip placement="bottom" title={"Inline Math"}>
							<Button onClick={() => this.props.tagInsertion('<Math inline></Math> ', 13)}>
								iMath
							</Button>
						</Tooltip>

						<Tooltip placement="bottom" title={"Display math"}>
							<Button onClick={() => this.props.tagInsertion('<Math></Math> ', 6)}>
								dMath
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
							<Button onClick={()=>this.props.tagInsertion('<ol>\n<li></li>\n</ol> ', 9)}>
								<Icon type="ordered-list"/>
							</Button>
						</Tooltip>

						<Tooltip placement="bottom" title={"Bulleted List"}>
							<Button onClick={()=>this.props.tagInsertion('<ul>\n<li></li>\n</ul> ', 9)}>
								<Icon type="unordered-list"/>
							</Button>
						</Tooltip>

						<Tooltip placement="bottom" title={"Table"}>
							<Button onClick={()=>this.props.tagInsertion('<table>\n\t<tr>\n\t<td></td>></tr>\n</table> ', 19)}>
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





