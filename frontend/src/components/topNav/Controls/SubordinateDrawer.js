import React from "react";
import { Icon, Drawer, Button, Badge, Tooltip } from "antd";
import { closeSubs, openSubWindow } from "../../../actions";
import { connect } from "react-redux";

const styles = {
  Icon: {
    fontSize: "25px",
    color: "lightGrey",
  },
  DivPos: {
    float: "left",
  },
};

const mapStateToProps = (state) => {
  return { subs: state.subordinates.subs };
};

const mapDispatchToProps = (dispatch) => ({
  openSubWindow: (id, content, isPage) =>
    dispatch(openSubWindow(id, content, isPage)),
  closeSubs: (id) => dispatch(closeSubs(id)),
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
              theme="filled"
            />
          </Badge>
        </Tooltip>

        <Drawer
          title="Minimized Windows"
          placement="left"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          width={300}
          style={{ fontSize: "25px", marginTop: "53px" }}
        >
          {this.props.subs.map((el) => {
            return (
              <div key={el.i} style={{ marginBottom: "5px" }}>
                <Button
                  size={"large"}
                  style={{
                    display: "inline-block",
                    width: "200px",
                    overflow: "hidden",
                  }}
                  onClick={() => {
                    this.props.openSubWindow(el.i, el.content, el.isPage);
                  }}
                >
                  {el.title}
                </Button>

                <Button
                  type={"danger"}
                  className={"mr-auto"}
                  size={"large"}
                  style={{ display: "inline-block" }}
                  onClick={() => {
                    this.props.closeSubs(el.i);
                  }}
                >
                  X
                </Button>
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
