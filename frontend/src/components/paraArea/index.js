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
    const {
      id,
      bookID,
      para,
      sideAlign,
      setFocusArea,
      removeFocusArea,
      deletePara,
    } = this.props;
    const hasSublevel = Array.isArray(para);
    const paraContent = hasSublevel ? para : para.content.data;

    return (
      <div>
        {hasSublevel ? (
          <SubLevel
            children={para}
            alignment={sideAlign}
            deletePara={deletePara}
            setFocusArea={setFocusArea}
            removeFocusArea={removeFocusArea}
            id={id}
            bookID={bookID}
          />
        ) : (
          <>
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
                    removeFocusArea={removeFocusArea}
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
                    removeFocusArea={removeFocusArea}
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
          </>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(ParaArea);
