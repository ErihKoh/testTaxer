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
  const [listData, setListData] = useState([]);
  const [listName, setListName] = useState([]);
  const [isDropArea, setIsDropArea] = useState(false);

  useEffect(() => {
    listData.map((i) =>
      setListName((listName) => new Set([...listName, i.name]))
    );
  }, [listData]);

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
    const reader = new FileReader();
    setListData((listData) => [...listData, ...e.dataTransfer.files]);

    listData.map((i) => {
      reader.readAsDataURL(i);
      reader.onload = (e) => {
        // let result = asn1Parser(reader.result);
        console.log(reader.result);
      };
    });

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
