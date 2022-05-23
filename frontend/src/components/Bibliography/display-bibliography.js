import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import { EditableFormTable } from "./editableTable";
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
    const data = [];
    bibliography.map((bb, index) => {
      return data.push({
        ...bb,
        index: index,
      });
    });
    return <EditableFormTable data={data} />;
  };

  return (
    <div>
      <TopNav />
      <Title level={2} style={{ textAlign: "center" }}>
        Literature Database
      </Title>
      <div style={{ margin: "10px" }}>
        {bibliography.length === 0 ? <p>No citation</p> : displayBibliography()}
      </div>
    </div>
  );
};