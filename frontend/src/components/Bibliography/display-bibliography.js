import React, { useEffect, useState } from "react";
import { Typography } from "antd";

import { EachCitation } from "./each-citation";
import { AddNewCitation } from "./add-citation";
import { getBibliography } from "../../requests/bibliography";
import TopNav from "../topNav";

const { Title } = Typography;

export const Bibliography = () => {
  const [bibliography, setBibliography] = useState([]);

  useEffect(() => {
    getBibliography().then((bb) => {
      const _bibliography = bb.data;
      if (_bibliography.length !== bibliography.length) {
        setBibliography(_bibliography);
      }
    });
  }, [bibliography]);

  const displayBibliography = () => {
    return bibliography.map((bb, index) => (
      <EachCitation index={index} bibliography={bibliography} />
    ));
  };

  return (
    <div>
      <TopNav />
      <Title level={2} style={{ textAlign: "center" }}>
        Bibliography
      </Title>
      <div style={{ margin: "10px" }}>
        {bibliography.length === 0 ? <p>No citation</p> : displayBibliography()}
      </div>
      <AddNewCitation bibliography={bibliography} />
    </div>
  );
};