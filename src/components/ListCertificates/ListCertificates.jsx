import React from "react";
import s from "./ListCertificates.module.css";

const ListCertificates = ({ names, onClick }) => {
  return (
    <>
      <ul className={s.container}>
        {names.length !== 0 ? (
          names
            .filter((i) => i)
            .map((i) => (
              <li
                key={i}
                data-name={i}
                onClick={onClick}
                className={s.certList}
              >
                {i}
              </li>
            ))
        ) : (
          <h5>don't have certificates</h5>
        )}
      </ul>
    </>
  );
};

export default ListCertificates;
