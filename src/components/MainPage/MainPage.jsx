import React, { useEffect, useState } from "react";
import DropArea from "../DropArea";
import TextArea from "../TextArea";
import ListCertificates from "../ListCertificates";
import asn1Parser from "../../helpers/asn1-parser";
import setStorage from "../../helpers/set-local-storage";
import getStorage from "../../helpers/get-local-storage";

import s from "./MainPage.module.css";

function MainPage() {
  const [drag, setDrag] = useState(false);
  const [listFiles, setListFiles] = useState([]);
  const [renderData, setRenderData] = useState({});
  const [isDropArea, setIsDropArea] = useState(false);

  useEffect(() => {
    const arrStor = getStorage();
    setListFiles(arrStor);
  }, []);

  const onClickButtonHandler = () => {
    setIsDropArea((isDropArea) => !isDropArea);
  };

  const onClickDataHandler = (e) => {
    const nameCert = e.target.dataset.name;
    setRenderData(listFiles.find((i) => i.idName === nameCert));
    console.log(renderData);
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
    const reader = new FileReader();
    reader.readAsBinaryString(files[0]);
    reader.onload = () => {
      let result = asn1Parser(reader.result, files[0].name);

      listFiles.some((i) => i.idName === result.idName) ||
        setListFiles((listFiles) => [...listFiles, result]);

      setStorage(files[0].name, result);
    };
    setDrag(false);
  };
  return (
    <div className={s.container}>
      <div className={s.containerCrtf}>
        {isDropArea ? (
          <TextArea data={renderData} />
        ) : (
          <DropArea
            drag={drag}
            onDropHandler={onDropHandler}
            dragLeaveHandler={dragLeaveHandler}
            dragStartHandler={dragStartHandler}
          />
        )}
        <ListCertificates names={listFiles} onClick={onClickDataHandler} />
      </div>
      <button onClick={onClickButtonHandler} className={s.button}>
        {isDropArea ? "add" : "cancel"}
      </button>
    </div>
  );
}

export default MainPage;
