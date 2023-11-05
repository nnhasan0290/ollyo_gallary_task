import { useRef } from "react";
import { DragItem, DragTypes } from "../utils/types/dndTypes";
import type { Identifier, XYCoord } from "dnd-core";
import { useDrag, useDrop } from "react-dnd";
import { ReducerActionKind } from "../utils/types/contextTypes";
import { GlobalContext } from "../utils/Context";

export const useImageDnd = (id:any, index:number, image:string, setHovered:any) => {

    const { dispatch } = GlobalContext();

    const ref = useRef<any>(null);


    const [{ isDragging }, drag, dragPreview] = useDrag({
        type: DragTypes.IMAGECARD,
        item: () => {
          return { id, index, ref, image };
        },
        collect: (monitor: any) => ({
          isDragging: monitor.isDragging(),
        }),
     
      });




    const [{ handlerId, isOver }, drop] = useDrop<
      DragItem,
      void,
      { handlerId: Identifier | null, isOver:any }
    >({
      accept: DragTypes.IMAGECARD,
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
          isOver: monitor.isOver()
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
    
        if (
          dragIndex > hoverIndex &&
          (draggedY < hoveredY || draggedX < hoveredX)
        ) {
          // Time to actually perform the action
    
          dispatch({
            type: ReducerActionKind.MOVEITEM,
            payload: { dragIndex, hoverIndex },
          });
        } else if (
          dragIndex < hoverIndex &&
          (ref.current.clientHeight + (clientOffset as XYCoord).y >
            hoverBoundingRect.top ||
            ref.current.clientWidth + (clientOffset as XYCoord).x >
              hoverBoundingRect.left)
        ) {
          dispatch({
            type: ReducerActionKind.MOVEITEM,
            payload: { dragIndex, hoverIndex },
          });
        } else {
          return;
        }
    
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
    
        item.index = hoverIndex;
      },
      drop: () => {
        setHovered(true)
      }
    });
    

    
    drag(drop(ref));

    return {ref, isDragging, dragPreview, handlerId}
}
