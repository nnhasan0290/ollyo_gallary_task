import type { Identifier, XYCoord } from "dnd-core";
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

// import { ItemTypes } from './ItemTypes'

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};

export interface CardProps {
  id: any;
  text: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const Card = ({ id, image, index, moveCard }: any) => {
  
  const ref = useRef<any>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "IMAGE",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref?.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref?.current?.getBoundingClientRect();

      // Get vertical middle
      const hoveredY = hoverBoundingRect.bottom - hoverBoundingRect.top;

      const hoveredX = hoverBoundingRect.right - hoverBoundingRect.left;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const draggedY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      const draggedX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      //   return;
      // }

      // Dragging upwards
      if (
        dragIndex > hoverIndex &&
        (draggedY < hoveredY || draggedX < hoveredX)
      ) {
        // Time to actually perform the action

        moveCard(dragIndex, hoverIndex);
      } else if (
        dragIndex < hoverIndex &&
        (ref.current.clientHeight + clientOffset.y > hoverBoundingRect.top ||
          ref.current.clientWidth + clientOffset.x > hoverBoundingRect.left)
      ) {
        moveCard(dragIndex, hoverIndex);
      } else {
        return;
      }

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: "IMAGE",
    item: () => {
      return { id, index, ref, image };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  useEffect(() => {
    dragPreview(getEmptyImage());
  }, []);
  return (
    <div
      ref={ref}
      className={`${index === 0 && "gallary__item__featured"} gallary__item `}
      data-handler-id={handlerId}
    >
      <img style={{ opacity }} src={image} alt="" />
    </div>
  );





  
};
