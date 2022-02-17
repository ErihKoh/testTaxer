import React, { useEffect, useState } from "react";
import DropArea from "../DropArea";
import ListCertificates from "../ListCertificates";
// import asn1Parser from "../../helpers/asn1-parser";
// import useLocalStorage from "../../hooks/useLocalStorage";
import s from "./MainPage.module.css";

function MainPage() {
  const [drag, setDrag] = useState(false);
  const [listData, setListData] = useState([]);
  const [listName, setListName] = useState([]);

  useEffect(() => {
    listData.map((i) => setListName(new Set([...listName, i.name])));
  }, [listData]);

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
    // for (let i of e.dataTransfer.files.name) {
    //   const reader = new FileReader();
    //   reader.readAsBinaryString(i);
    //   reader.onload = () => {
    //     let result = asn1Parser(reader.result);
    //   console.log(result);
    //   };
    // }

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
      <ListCertificates names={[...listName]} />
    </div>
  );
}

export default MainPage;
