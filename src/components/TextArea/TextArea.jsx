import React from "react";
import s from "./TextArea.module.css";

const TextArea = ({ commonName, issuerCN, validFrom, validTill }) => {
  return (
    <ul className={s.textArea}>
      <li>{commonName}</li>
      <li>{issuerCN}</li>
      <li>{validFrom}</li>
      <li>{validTill}</li>
    </ul>
  );
};

export default TextArea;
