import React from "react";
import { Button, Icon, Tooltip } from "antd";

const ButtonGroup = Button.Group;

class ParaToolBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const props = this.props;
    return (
      <ButtonGroup
        style={{
          position: "absolute",
          top: "-35px",
        }}
      >
        <Tooltip placement="top" title={"Caption"}>
          <Button
            onMouseDown={(e) =>
              props.tagInsertion(e, "<caption></caption> ", 9)
            }
          >
            Cap
          </Button>
        </Tooltip>

        <Tooltip placement="top" title={"Bold"}>
          <Button onMouseDown={(e) => props.tagInsertion(e, "<b></b> ", 3)}>
            <Icon type="bold" />
          </Button>
        </Tooltip>

        <Tooltip placement="top" title={"Italic"}>
          <Button onMouseDown={(e) => props.tagInsertion(e, "<i></i> ", 3)}>
            <Icon type="italic" />
          </Button>
        </Tooltip>

        <Tooltip placement="top" title={"Inline Math"}>
          <Button
            onMouseDown={(e) =>
              props.tagInsertion(e, '<Math inline="true"></Math> ', 20)
            }
          >
            iMath
          </Button>
        </Tooltip>

        <Tooltip placement="top" title={"Display math"}>
          <Button
            onMouseDown={(e) => props.tagInsertion(e, "<Math></Math> ", 6)}
          >
            dMath
          </Button>
        </Tooltip>

        <Tooltip placement="top" title={"Link"}>
          <Button
            onMouseDown={(e) => {
              props.handleLinkClick(e);
            }}
          >
            <Icon type="link" />
          </Button>
        </Tooltip>

        <Tooltip placement="top" title={"Numbered List"}>
          <Button
            onMouseDown={(e) =>
              props.tagInsertion(e, "<ol>\n\t<li></li>\n</ol> ", 9)
            }
          >
            <Icon type="ordered-list" />
          </Button>
        </Tooltip>

        <Tooltip placement="top" title={"Bulleted List"}>
          <Button
            onMouseDown={(e) =>
              props.tagInsertion(e, "<ul>\n\t<li></li>\n</ul> ", 9)
            }
          >
            <Icon type="unordered-list" />
          </Button>
        </Tooltip>

        <Tooltip placement="top" title={"Table"}>
          <Button
            onMouseDown={(e) =>
              props.tagInsertion(
                e,
                "<table>\n\t<tr>\n\t<td></td></tr>\n</table> ",
                19
              )
            }
          >
            <Icon type="table" />
          </Button>
        </Tooltip>

        <Tooltip placement="top" title={"Image"}>
          <Button
            onMouseDown={(e) => props.tagInsertion(e, '<img src=""/> \n', 10)}
          >
            <Icon type="file-image" />
          </Button>
        </Tooltip>
      </ButtonGroup>
    );
  }
}

export default ParaToolBar;
