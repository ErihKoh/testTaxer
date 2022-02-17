import React from "react";
import s from "./DropArea.module.css";

const DropArea = ({
  onDropHandler,
  dragStartHandler,
  dragLeaveHandler,
  drag,
}) => {
  return (
    <>
      {drag ? (
        <div
          className={s.dropArea}
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          onDrop={(e) => onDropHandler(e)}
        >
          Отпустите файл
        </div>
      ) : (
        <div
          className={s.emptyDropArea}
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
        >
          Перетащите файл сюда
        </div>
      )}
    </>
  );
};

export default DropArea;
