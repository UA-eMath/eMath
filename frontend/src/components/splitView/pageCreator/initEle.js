import React from "react";
import styles from "../styles/style";
import { NextButton } from "../styles/nextButton";
import { PreButton } from "../styles/preButton";
import _ from "lodash";
import getPage from "../../../requests/getPage";
import paraRenderer from "../../../pageRenderer";
import { setReadCache } from "../../../utils/setReadCache";

export default function initElement(el) {
  return (
    <div
      className="InitElement"
      key={el.i}
      data-grid={el}
      style={{ ...styles.window }}
    >
      <div style={{ ...styles.titleBar }}>
        <PreButton
          onClick={() => {
            getPrePage(this.props.id, this.props.pageNum, (prePageData) => {
              if (prePageData) {
                let num = this.props.pageNum - 1;
                this.props.onSetPage(
                  prePageData.flat(Infinity)[0].para_parent.id,
                  prePageData.flat(Infinity)[0].para_parent.title,
                  prePageData,
                  num
                );
                setReadCache(this.props.match.params.id, this.props.id);
              }
            });
          }}
        />

        <span style={{ ...styles.title }}>{this.props.pageTitle}</span>

        <NextButton
          className="ml-auto"
          onClick={() => {
            getNextPage(this.props.id, this.props.pageNum, (nextPageData) => {
              let num = this.props.pageNum + 1;
              if (nextPageData) {
                this.props.onSetPage(
                  nextPageData.flat(Infinity)[0].para_parent.id,
                  nextPageData.flat(Infinity)[0].para_parent.title,
                  nextPageData,
                  num
                );
                setReadCache(this.props.match.params.id, this.props.id);
              }
            });
          }}
        />
      </div>

      <div
        style={{
          background: "#F7F7EE",
          borderRadius: "2px",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.1), 0 1px 10px rgba(0,0,0,0.35)",
          margin: "1em .9em",
          padding: ".5em 1.25em .5em",
        }}
      >
        {_.map(this.props.paraText, (para) => {
          return paraRenderer(para);
        })}
      </div>
    </div>
  );
}

async function getNextPage(id, pageNum, setData) {
  await getPage({ root: id, page: pageNum + 1 }).then((nextPage) => {
    if (!nextPage || nextPage.status !== 200) {
      console.error("No more pages", nextPage);
    } else if (nextPage.data.length === 0) {
      return [""];
    } else {
      setData(nextPage.data);
    }
  });
}

async function getPrePage(id, pageNum, setData) {
  if (pageNum - 1 <= 0) {
    return null;
  }
  await getPage({ root: id, page: pageNum - 1 }).then((prePage) => {
    if (!prePage || prePage.status !== 200) {
      console.error("Fail to get pre page", prePage);
    } else if (prePage.data.length === 0) {
      return [""];
    } else {
      setData(prePage.data);
    }
  });
}
