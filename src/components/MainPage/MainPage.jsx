import React, { useEffect, useState } from "react";
import DropArea from "../DropArea";
import TextArea from "../TextArea";
import ListCertificates from "../ListCertificates";
// import ButtonAdd from "../ButtonAdd";
import asn1Parser from "../../helpers/asn1-parser";
// import useLocalStorage from "../../hooks/useLocalStorage";
import s from "./MainPage.module.css";

function MainPage() {
  const [drag, setDrag] = useState(false);
  const [certData, setCertData] = useState("");
  const [listData, setListData] = useState([]);
  const [listName, setListName] = useState(
    () =>
      Object.keys(localStorage).filter(
        (i) => i !== "editorHasEmittedBundle" && i !== "editorLastConnected"
      ) ?? []
  );
  const [isDropArea, setIsDropArea] = useState(false);

  useEffect(() => {
    listData.map((i) =>
      setListName((listName) => new Set([...listName, i.name]))
    );
  }, [listData]);

  useEffect(() => {
    listData.map(
      (i) => {
        const reader = new FileReader();
        reader.readAsBinaryString(i);
        return (reader.onload = () => {
          window.localStorage.setItem(
            i.name,
            JSON.stringify(asn1Parser(reader.result))
          );
        });
      },
      [listData]
    );
  });

  const onClickButtonHandler = () => {
    setIsDropArea((isDropArea) => !isDropArea);
  };

  const onClickDataHandler = (e) => {
    setCertData(e.target.dataset.name);
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

    setListData((listData) => [...listData, ...e.dataTransfer.files]);

    setDrag(false);
  };
  return (
    <div className={s.container}>
      <div className={s.containerCrtf}>
        {isDropArea ? (
          <TextArea data={certData} />
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
