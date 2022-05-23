import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Tooltip } from "antd";
import { getBibliography } from "../../requests/bibliography";
import paraRenderer from "../../pageRenderer";

export default function Cite(props) {
  const [citation, setCitation] = useState({});

  useEffect(() => {
    getBibliography({ bbID: props.id }).then((bb) => {
      if (bb !== undefined) {
        const _citation = bb.data;
        if (!_.isEqual(_citation, citation)) {
          setCitation(_citation);
        }
      }
    });
  }, [citation, props.id]);

  return (
    <Tooltip
      title={
        paraRenderer(citation.displayContent, true) ?? "Loading citation..."
      }
    >
      <span style={{ color: "#1890ff" }}>{props.children}</span>
    </Tooltip>
  );
}
