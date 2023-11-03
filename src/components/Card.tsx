import { useEffect, useState } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { CardProps } from "../utils/types/dndTypes";
import { useImageDnd } from "../hooks/useImageDnD";

export const Card = ({ id, image, index }: CardProps) => {
  const { ref, isDragging, dragPreview, handlerId } = useImageDnd(
    id,
    index,
    image
  );

  const opacity = isDragging ? 0 : 1;

  useEffect(() => {
    dragPreview(getEmptyImage());
  }, [dragPreview]);


  return (
    <div
      ref={ref}
      className={`${index === 0 && "gallary__item__featured"} gallary__item `}
      data-handler-id={handlerId}
    >
      <img className="gallary__item__img" style={{ opacity }} src={image} alt="" />

      {!isDragging && (
        <div className={`gallary__item__after`}>
          <input type="checkbox" name={`card_${id}`} id={id} />
        </div>
      )}
    </div>
  );
};
