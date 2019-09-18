import React from 'react';
import PropTypes from 'prop-types';
import Controls from './Controls';
import styles from './styles/windows10';

export default class TitleBar extends React.Component {
	static propTypes = {
		title: PropTypes.node,
		controls: PropTypes.bool,
		onCloseClick: PropTypes.func,
		onMinimizeClick: PropTypes.func,
        onPinClick:PropTypes.func,
	};

	render() {
		const {
			style,
			controls,
			title,
			hidden,
			...props
		} = this.props;

		delete props.onCloseClick;
		delete props.onMinimizeClick;
		delete props.onPinClick;

		let componentStyle = {...styles.titleBar, ...style};
		let titleStyle = styles.title;

		componentStyle = {
			...componentStyle,
			visibility: !hidden ? 'visible' : 'hidden',
			display: !hidden ? 'flex' : 'none'
		};

		const controlsComponent = !controls || <Controls {...this.props} />;
		const titleComponent = !title || (
			<div style={titleStyle}>{this.props.title}</div>
		);

		return (
			<div ref="element" style={componentStyle} {...props}>
				{titleComponent}
				{controlsComponent}
			</div>
		);
	}
}
