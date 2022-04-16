import React, { useEffect, useState } from "react";
import { EachCitation } from "./each-citation";
import { AddNewCitation } from "./add-citation";
import { getBibliography } from "../../requests/bibliography";

export const Bibliography = () => {
  const [bibliography, setBibliography] = useState([]);

  useEffect(() => {
    getBibliography().then((bb) => {
      const _bibliography = bb.data;
      if (_bibliography.length !== bibliography.length) {
        setBibliography(bb.data);
      }
    });
  }, [bibliography]);

  const displayBibliography = () => {
    const list = bibliography.map((bb, index) => {
      console.log(bibliography[index]);

      return <EachCitation index={index} bibliography={bibliography} />;
    });
    return list;
  };

  return (
    <div>
      Bibliography
      {bibliography.length === 0 ? <p>No citation</p> : displayBibliography()}
      <AddNewCitation bibliography={bibliography} />
    </div>
  );
};

// Janelidze, Zurab (2008) Closedness properties of internal relations V: Linear Mal’tsev conditions
// @Article{ZJanelidze_V2008, author = {Janelidze, Zurab}, title = {{Closedness properties of internal relations V: Linear Mal’tsev conditions}}, journal = {Algebra universalis}, year = {2008}, volume = {58}, number = {1}, pages = {105}, month = feb, abstract  = {.As J. W. Snow showed, every linear Mal’tsev condition on a variety $${\mathcal{V}}$$ of universal algebras, is equivalent to a relational condition on $${\mathcal{V}}$$. Using slightly different relational reformulations of linear Mal’tsev conditions, we develop a purely categorical approach to these conditions.}, date = {2008-02-01}, doi = {10.1007/s00012-008-2044-6}, publisher = {Springer}, url = {http://dx.doi.org/10.1007/s00012-008-2044-6},}
