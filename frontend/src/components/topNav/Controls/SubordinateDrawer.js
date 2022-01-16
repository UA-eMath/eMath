import React from "react";
import { Icon, Drawer, Button, Badge, Tooltip, Row, Col } from "antd";
import _ from "lodash";
import { connect } from "react-redux";
import { closeSubs, openSubWindow, minimizeWindow } from "../../../actions";
import paraRenderer from "../../../pageRenderer";

const styles = {
  Icon: {
    fontSize: "25px",
    color: "#44A0D1",
  },
  DivPos: {
    float: "left",
  },
};

const mapStateToProps = (state) => {
  return { subs: state.subordinates.subs, items: state.windows.items };
};

const mapDispatchToProps = (dispatch) => ({
  openSubWindow: (id, content, isPage) =>
    dispatch(openSubWindow(id, content, isPage)),
  closeSubs: (id) => dispatch(closeSubs(id)),
  minimizeWindow: (id, title, content, isPage) =>
    dispatch(minimizeWindow(id, title, content, isPage)),
});

class SubordinateDrawer extends React.Component {
  state = {
    visible: false,
  };

  render() {
    return (
      <div style={styles.DivPos}>
        <Tooltip title="Minimized Windows">
          <Badge
            count={this.props.subs.length}
            overflowCount={10}
            style={{
              color: "#999",
              backgroundColor: "#fff",
              boxShadow: "0 0 0 1px #d9d9d9 inset",
            }}
          >
            <Icon
              type="container"
              onClick={this.showSubordinateDrawer}
              style={styles.Icon}
            />
          </Badge>
        </Tooltip>

        <Drawer
          title="Minimized Windows"
          placement="left"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          width={"25%"}
          style={{ fontSize: "25px", marginTop: "76px" }}
        >
          {this.props.subs.map((el) => {
            return (
              <div key={el.i} style={{ marginBottom: "5px" }}>
                <Row type="flex" justify="center">
                  <Col span={20}>
                    <Button
                      style={{
                        whiteSpace: "normal",
                        width: "100%",
                      }}
                      onClick={() => {
                        const currentWindow = _.last(this.props.items);
                        this.props.minimizeWindow(
                          currentWindow.i,
                          currentWindow.title,
                          currentWindow.content,
                          currentWindow.isPage
                        );
                        this.props.openSubWindow(el.i, el.content, el.isPage);
                      }}
                    >
                      {_.isString(el.title)
                        ? paraRenderer(el.title, true)
                        : el.title}
                    </Button>
                  </Col>
                  <Col span={4}>
                    <Button
                      type={"danger"}
                      onClick={() => {
                        this.props.closeSubs(el.i);
                      }}
                    >
                      <Icon type="close" />
                    </Button>
                  </Col>
                </Row>
              </div>
            );
          })}
        </Drawer>
      </div>
    );
  }

  showSubordinateDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubordinateDrawer);
