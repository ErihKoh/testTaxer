import React from "react";
import s from "./TextArea.module.css";

const TextArea = ({ data }) => {
  return data === "" ? (
    <div className={s.textArea}> data from file</div>
  ) : (
    <ul className={s.textArea}>
      <li>{data}</li>
    </ul>
  );
};

export default TextArea;
