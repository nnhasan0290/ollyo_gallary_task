import { useEffect, useState } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { CardProps } from "../utils/types/dndTypes";
import { useImageDnd } from "../hooks/useImageDnD";
import CustomCheckMark from "./ui/CustomCheckMark/CustomCheckMark";
import { GlobalContext } from "../utils/context/Context";
import { ReducerActionKind } from "../utils/types/contextTypes";
import useAnimation from "../hooks/useAnimation";

export const Card = ({ id, image, index, selected, prevPos }: CardProps) => {
  const { dispatch } = GlobalContext();
  const [isHovered, setHovered] = useState(true);
  const { ref, isDragging, dragPreview, handlerId } = useImageDnd(
    id,
    index,
    image
  );

  const opacity = isDragging ? 0 : 1;

  const { styles: animationStyle } = useAnimation(prevPos, index);

  useEffect(() => {
    dragPreview(getEmptyImage());
  }, [dragPreview]);

  return (
    <div
      style={{ zIndex: !isDragging ? index : 100 }}
      className={`${index === 0 && "gallary__item__featured"} gallary__item `}
    >
      <div
        style={{
          ...animationStyle,
          width: "100%",
          height: "100%",
        }}
        ref={ref}
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
    </div>
  );
};
