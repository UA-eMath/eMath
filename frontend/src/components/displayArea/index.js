import React from "react";
import paraRenderer from "../../pageRenderer";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  return {
    para: state.paras.paras[ownProps.id],
  };
};

class DisplayArea extends React.Component {
  render() {
    return (
      <div className="displayDiv">
        {/*TODO: need to handle open window activity*/}
        {paraRenderer(this.props.para)}
      </div>
    );
  }
}

export default connect(mapStateToProps)(DisplayArea);
