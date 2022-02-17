import React from "react";
import "shortid";
import shortid from "shortid";
import s from "./ListCertificates.module.css";

const ListCertificates = ({ names }) => {
  return (
    <>
      <ul className={s.container}>
        {names.length !== 0 ? (
          names.map((i) => <li key={i}>{i}</li>)
        ) : (
          <h5>don't have certificates</h5>
        )}
      </ul>
    </>
  );
};

export default ListCertificates;
