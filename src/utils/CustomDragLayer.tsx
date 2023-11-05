import { CSSProperties } from "react";
import { XYCoord, useDragLayer } from "react-dnd";
import { DragTypes } from "./types/dndTypes";

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
        {itemType === DragTypes.IMAGECARD && (
          <img
            style={{
              border: "2px solid #C2C2C2",
              borderRadius: "10px",
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
  const x =
    (initialCursorOffset as XYCoord)?.x + (currentOffset.x - initialOffset.x);
  const y =
    (initialCursorOffset as XYCoord)?.y + (currentOffset.y - initialOffset.y);

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

export default CustomDragLayer;
