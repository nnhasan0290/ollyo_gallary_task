import { CSSProperties } from "react";
import { XYCoord, useDragLayer } from "react-dnd";

const CustomDragLayer = () => {
  const {
    itemType,
    isDragging,
    item,
    initialCursorOffset,
    initialOffset,
    currentOffset,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialCursorOffset: monitor.getInitialClientOffset(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging) {
    return null;
  }

  return (
    <div className="draglayer" style={layerStyles}>
      <div
        style={{
          ...getDragLayerStyles(
            initialCursorOffset,
            initialOffset,
            currentOffset
          ),
        }}
      >
        {itemType === "IMAGE" && (
          <img
            style={{
              border: "1px solid gray",
              borderRadius: "5px",
              backgroundColor: "white",
            }}
            width={item.ref.current.clientWidth}
            height={item.ref.current.clientHeight}
            src={item?.image}
            alt=""
          />
        )}
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
  initialCursorOffset: XYCoord | null,
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }

  // let { x, y } = currentOffset;
  const x = initialCursorOffset?.x + (currentOffset.x - initialOffset.x);
  const y = initialCursorOffset?.y + (currentOffset.y - initialOffset.y);

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

export default CustomDragLayer;
