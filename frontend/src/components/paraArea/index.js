import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import InputBox from "../InputBox";
import DisplayArea from "../displayArea";
import ParaControl from "../paraControl";
import SubLevel from "../paraEditor/subLevel";

const mapStateToProps = (state, ownProps) => {
  return {
    para: state.paras.paras[ownProps.paraID],
  };
};

class ParaArea extends React.Component {
  render() {
    const { id, bookID, para, sideAlign, setFocusArea, deletePara } =
      this.props;

    const paraContent = para.content.data;

    return (
      <div>
        {Array.isArray(para) ? (
          <SubLevel
            key={para.id}
            children={para}
            alignment={this.state.sideAlign}
            deletePara={this.deletePara}
            setFocusArea={this.setFocusArea.bind(this)}
            id={this.props.id}
            bookID={bookID}
          />
        ) : (
          ""
        )}

        {sideAlign ? (
          <div
            className="paraWrapper"
            ref={(divElement) => {
              this.divElement = divElement;
            }}
          >
            <div className="inputDiv">
              <InputBox
                id={para.id}
                bookID={bookID}
                setFocusArea={setFocusArea}
                boxValue={paraContent}
              />
            </div>
            <DisplayArea id={para.id} />
            <ParaControl
              id={para.id}
              delete={deletePara}
              parentId={id}
              bookID={bookID}
              pageId={id}
            />
          </div>
        ) : (
          <Row>
            <Col
              span={21}
              style={{
                margin: "10px",
              }}
            >
              <InputBox
                id={para.id}
                bookID={bookID}
                setFocusArea={setFocusArea}
                boxValue={paraContent}
              />
              <DisplayArea id={para.id} />
            </Col>

            <Col
              span={1}
              style={{
                margin: "10px",
              }}
            >
              <ParaControl
                id={para.id}
                delete={deletePara}
                parentId={id}
                bookID={bookID}
                pageId={id}
              />
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(ParaArea);
