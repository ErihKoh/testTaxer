import React, { useState } from "react";
import DropArea from "../DropArea";
import ListCertificates from "../ListCertificates";
import asn1Parser from "../../helpers/asn1-parser";
import useLocalStorage from "../../hooks/useLocalStorage";
import s from "./MainPage.module.css";

function MainPage() {
  const [drag, setDrag] = useState(false);
  const [listCrtf, setListCrtf] = useState([]);
  const [listName, setListName] = useState([]);

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
    setListCrtf((listCrtf) => [...listCrtf, ...e.dataTransfer.files]);
    // for (let i of e.dataTransfer.files.name) {
    //   const reader = new FileReader();
    //   reader.readAsBinaryString(i);
    //   reader.onload = () => {
    //     let result = asn1Parser(reader.result);
    //   console.log(result);
    //   };
    // }

    for (let i of listCrtf) {
      // setListName((listName) => [...listName, i]);
      console.log(i.name);
    }

    // console.log(listName);
    setDrag(false);
  };
  return (
    <div className={s.container}>
      <DropArea
        drag={drag}
        onDropHandler={onDropHandler}
        dragLeaveHandler={dragLeaveHandler}
        dragStartHandler={dragStartHandler}
      />
      <ListCertificates />
    </div>
  );
}

export default MainPage;
