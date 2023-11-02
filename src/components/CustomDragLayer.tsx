import { CSSProperties } from "react";
import { XYCoord, useDragLayer } from "react-dnd";

const CustomDragLayer = () => {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));

  if (!isDragging) {
    return null;
  }
  console.log(item);

  return (
    <div className="draglayer" style={layerStyles}>
      <div style={getDragLayerStyles(initialOffset, currentOffset)}>
        {
          itemType === "IMAGE" && (

            <img
            style={{border: "1px solid gray", borderRadius: "5px"}}
            width={item.ref.current.clientWidth}
            height={item.ref.current.clientHeight}
              src={item?.image}
              alt=""
            />
          )
        }
      </div>
    </div>
  );
};

const layerStyles: CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  // border: "10px solid red",
};

function getDragLayerStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }

  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

export default CustomDragLayer;
