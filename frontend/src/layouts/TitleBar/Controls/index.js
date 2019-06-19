import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Close from './Close';
import Minimize from './Minimize';

const styles = {
  controls: {
    WebkitUserSelect: 'none',
    userSelect: 'none',
    cursor: 'default',
    display: 'flex',
    height: '32px'
  }
};

class Controls extends Component {
  static propTypes = {
    onCloseClick: PropTypes.func,
    onMinimizeClick: PropTypes.func,
    onMaximizeClick: PropTypes.func
  };

  render() {
    return (
      <div style={styles.controls}>
        <Minimize onClick={this.props.onMinimizeClick} ref="minimize" />
        <Close onClick={this.props.onCloseClick} ref="close" />
      </div>
    );
  }
}

export default Controls;