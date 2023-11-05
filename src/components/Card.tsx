import { useEffect, useState } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { CardProps } from "../utils/types/dndTypes";
import { useImageDnd } from "../hooks/useImageDnD";
import CustomCheckMark from "./ui/CustomCheckMark/CustomCheckMark";
import { GlobalContext } from "../utils/Context";
import { ReducerActionKind } from "../utils/types/contextTypes";

export const Card = ({ id, image, index, selected }: CardProps) => {
  const { dispatch } = GlobalContext();
  const [isHovered, setHovered] = useState(true);
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
      onDragEnd={() => setHovered(true)}
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

      <div
        className={`gallary__item__checkbox ${
          selected ? "showBackground" : "showOnlyOnHover"
        } ${!selected && !isHovered && "hideCheckbox"} ${
          isDragging && "hideCheckbox"
        }`}
      >
        <CustomCheckMark
          id={id}
          checked={selected}
          onChange={() => {
            dispatch({ type: ReducerActionKind.SELECTITEM, payload: { id } });
          }}
        />
      </div>
    </div>
  );
};
