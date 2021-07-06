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
          top: "-30px",
        }}
      >
        <Tooltip placement="top" title={"Caption"}>
          <Button
            onMouseDown={(e) => props.selectedTextInsertion(e, "Caption")}
          >
            Cap
          </Button>
        </Tooltip>

        <Tooltip placement="top" title={"Bold"}>
          <Button onMouseDown={(e) => props.selectedTextInsertion(e, "b")}>
            <Icon type="bold" />
          </Button>
        </Tooltip>

        <Tooltip placement="top" title={"Italic"}>
          <Button onMouseDown={(e) => props.selectedTextInsertion(e, "i")}>
            <Icon type="italic" />
          </Button>
        </Tooltip>

        <Tooltip placement="top" title={"Inline math"}>
          <Button onMouseDown={(e) => props.selectedTextInsertion(e, "math")}>
            iMath
          </Button>
        </Tooltip>

        <Tooltip placement="top" title={"Display math"}>
          <Button onMouseDown={(e) => props.selectedTextInsertion(e, "Math")}>
            dMath
          </Button>
        </Tooltip>

        <Tooltip placement="top" title={"Insert link"}>
          <Button
            onMouseDown={(e) => {
              const highlightedText = window.getSelection().toString();
              props.handleLinkClick(e, highlightedText);
            }}
          >
            <Icon type="link" />
          </Button>
        </Tooltip>

        <Tooltip placement="top" title={"Numbered list"}>
          <Button
            onMouseDown={(e) =>
              props.tagInsertion(e, "<ol>\n\t<li></li>\n</ol> ", 9)
            }
          >
            <Icon type="ordered-list" />
          </Button>
        </Tooltip>

        <Tooltip placement="top" title={"Bulleted list"}>
          <Button
            onMouseDown={(e) =>
              props.tagInsertion(e, "<ul>\n\t<li></li>\n</ul> ", 9)
            }
          >
            <Icon type="unordered-list" />
          </Button>
        </Tooltip>

        <Tooltip placement="top" title={"Insert table"}>
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

        <Tooltip placement="top" title={"Insert image"}>
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
