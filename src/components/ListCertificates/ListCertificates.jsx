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
                key={i.idName}
                data-name={i.idName}
                className={s.certList}
                onClick={onClick}
              >
                {i.idName}
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
