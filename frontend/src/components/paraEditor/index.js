import React from 'react'
import {Button, Icon} from 'antd';
import EditorToolBar from './editorBar'
import Editor from './editor'
const ButtonGroup = Button.Group;


export default class ParaEditor extends React.Component {
	render() {
		return (
			<div>
				<EditorToolBar/>
				<Editor/>
			</div>
		)
	}

}

