import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { GlobalContext } from "../utils/Context";
import DraggableImg from "./Draggable";

const Gallary = () => {
  const {
    state: { data: items },
  } = GlobalContext();

  return (
    <div className="gallary">
      <div className="border-b py-4 gallary__head">
        <h2>Gallary</h2>
      </div>

      <div className="gallary__main ">
        {items.map((item, index) => {
          return <DraggableImg key={item.id} item={item} index={index} />;
        })}
      </div>
    </div>
  );
};

export default Gallary;
