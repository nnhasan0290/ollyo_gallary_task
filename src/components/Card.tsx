import { useEffect, useState } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { CardProps } from "../utils/types/dndTypes";
import { useImageDnd } from "../hooks/useImageDnD";

export const Card = ({ id, image, index }: CardProps) => {
  const [isHovered, setHovered] = useState(true);
  const { ref, isDragging, dragPreview, handlerId } = useImageDnd(
    id,
    index,
    image,
    setHovered
  );

  const opacity = isDragging ? 0 : 1;

  useEffect(() => {
    dragPreview(getEmptyImage());
  }, [dragPreview]);
  console.log(index);

  return (
    <div
      ref={ref}
      className={`${index === 0 && "gallary__item__featured"} gallary__item `}
      data-handler-id={handlerId}
      onDragLeave={() => {
        setHovered(false);
      }}
      onMouseOver={(e) => {
        if (e.buttons !== 1) {
          setHovered(true);
        } else {
          setHovered(false);
        }
      }}
    >
      <img
        className="gallary__item__img"
        style={{ opacity }}
        src={image}
        alt=""
      />
      <div
        style={{ backgroundColor: !isHovered ? "transparent" : "" }}
        className={`gallary__item__overlay`}
      ></div>
      <div className="gallary__item__checkbox">
        <input type="checkbox" name="" id="" />
      </div>
    </div>
  );
};
