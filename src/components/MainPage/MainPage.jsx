import React, { useEffect, useState } from "react";
import DropArea from "../DropArea";
import TextArea from "../TextArea";
import ListCertificates from "../ListCertificates";
// import ButtonAdd from "../ButtonAdd";
import asn1Parser from "../../helpers/asn1-parser";
import useLocalStorage from "../../hooks/useLocalStorage";
import s from "./MainPage.module.css";

function MainPage() {
  const [drag, setDrag] = useState(false);
  const [listData, setListData] = useState([]);
  const [listName, setListName] = useState(
    () =>
      Object.keys(localStorage).filter(
        (i) => i != "editorHasEmittedBundle" && i != "editorLastConnected"
      ) ?? []
  );
  const [isDropArea, setIsDropArea] = useState(false);

  useEffect(() => {
    listData.map((i) => {
      setListName((listName) => new Set([...listName, i.name]));
    });
  }, [listData]);

  useEffect(() => {
    listData.map(
      (i) => {
        const reader = new FileReader();
        reader.readAsBinaryString(i);
        reader.onload = () => {
          let result = asn1Parser(reader.result);
          window.localStorage.setItem(i.name, JSON.stringify(result));
        };
      },
      [listData]
    );
  });

  const onClickHandler = () => {
    setIsDropArea((isDropArea) => !isDropArea);
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
          <TextArea />
        ) : (
          <DropArea
            drag={drag}
            onDropHandler={onDropHandler}
            dragLeaveHandler={dragLeaveHandler}
            dragStartHandler={dragStartHandler}
          />
        )}
        <ListCertificates names={[...listName]} />
      </div>
      <button onClick={onClickHandler} className={s.button}>
        {isDropArea ? "add" : "cancel"}
      </button>
    </div>
  );
}

export default MainPage;
