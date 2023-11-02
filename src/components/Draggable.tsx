import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import CustomDragLayer from "./CustomDragLayer";

const DraggableImg = ({ item, index }: any) => {
  const ref = useRef(null);

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "IMAGE",
    item: { ...item, ref: ref },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      opacity: 1,
    }),
  }));
  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <>
      <div
        ref={drag}
        className={`gallary__item ${index === 1 && "gallary__item__featured"}`}
      >
        <img
          className={`${isDragging && "isDragging"}`}
          style={{
            cursor: "move",
          }}
          src={item.image}
          alt=""
          ref={ref}
        />
      </div>
    </>
  );
};

export default DraggableImg;
