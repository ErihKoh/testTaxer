import React from "react";
import s from "./TextArea.module.css";

const TextArea = ({ data }) => {
  return data.hasOwnProperty("commonName") ? (
    <div className={s.textArea}>
      <ul>
        <li>Common Name: {data.commonName}</li>
        <li>Issuer CN: {data.issuerCN}</li>
        <li>validFrom: {data.validFrom}</li>
        <li>validTill: {data.validTill}</li>
      </ul>
    </div>
  ) : (
    <div className={s.textArea}></div>
  );
};

export default TextArea;
