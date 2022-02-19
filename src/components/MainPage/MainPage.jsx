import React, { useEffect, useState } from "react";
import DropArea from "../DropArea";
import TextArea from "../TextArea";
import ListCertificates from "../ListCertificates";
import useLocalStorage from "../../hooks/useLocalStorage";
// import ButtonAdd from "../ButtonAdd";
import asn1Parser from "../../helpers/asn1-parser";
import setStorage from "../../helpers/set-local-storage";

import s from "./MainPage.module.css";

function MainPage() {
  const [drag, setDrag] = useState(false);
  const [certData, setCertData] = useState([]);
  const [listFiles, setListFiles] = useState(
    () => Object.values(localStorage) ?? []
  );
  const [renderData, setRenderData] = useState({});
  const [listName, setListName] = useState(
    () =>
      Object.keys(localStorage).filter(
        (i) => i !== "editorHasEmittedBundle" && i !== "editorLastConnected"
      ) ?? []
  );
  const [isDropArea, setIsDropArea] = useState(false);

  useEffect(() => {
    listFiles.map((i) => {
      setListName((listName) => new Set([...listName, i.name]));
      const reader = new FileReader();
      reader.readAsBinaryString(i);
      reader.onload = () => {
        let result = asn1Parser(reader.result, i.name);

        setStorage(i.name, result);
        let data = certData.filter((i) => i.idName !== result.idName);
        setCertData(data);
      };
    });
  }, [listFiles]);

  const onClickButtonHandler = () => {
    setIsDropArea((isDropArea) => !isDropArea);
  };

  const onClickDataHandler = (e) => {
    setRenderData(certData.filter((i) => i.idName === e.target.dataset.name));
    console.log(certData);
  };

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDropHandler = (e) => {
    e.preventDefault();
    let files = e.dataTransfer.files;
    setListFiles((listFiles) => [...listFiles, ...files]);

    setDrag(false);
  };
  return (
    <div className={s.container}>
      <div className={s.containerCrtf}>
        {isDropArea ? (
          <TextArea
            commonName={renderData.commonName}
            issuerCN={renderData.issuerCN}
            validFrom={renderData.validFrom}
            validTill={renderData.validTill}
          />
        ) : (
          <DropArea
            drag={drag}
            onDropHandler={onDropHandler}
            dragLeaveHandler={dragLeaveHandler}
            dragStartHandler={dragStartHandler}
          />
        )}
        <ListCertificates names={[...listName]} onClick={onClickDataHandler} />
      </div>
      <button onClick={onClickButtonHandler} className={s.button}>
        {isDropArea ? "add" : "cancel"}
      </button>
    </div>
  );
}

export default MainPage;
