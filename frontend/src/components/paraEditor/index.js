import React from 'react'
import {Button, Icon} from 'antd';

const ButtonGroup = Button.Group;


export default class ParaEditor extends React.Component {
	render() {
		return (
			<div>
				<div style={{background: '#F3F3F3',
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

						{/*<Button>*/}
						{/**/}
						{/*</Button>*/}
						{/*<Button>*/}

						{/*</Button>*/}
					</ButtonGroup>
				</div>

			</div>
		)
	}


}

