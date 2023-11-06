import { Card } from "./Card";
import GallaryHead from "./ui/GallaryHead";
import { GlobalContext } from "../utils/context/Context";

export const Container = () => {
  //states
  const {
    state: { data: globalData },
  } = GlobalContext();

  return (
    <>
      <div className="gallary">
        {/* heading code goes here */}
        <GallaryHead />
        <div className="gallary__main">
          {globalData.map((card, i) => (
            <Card
              key={card.id}
              index={i}
              id={card.id}
              image={card.image}
              selected={card.selected}
              prevPos={card.previousPos}
            />
          ))}
        </div>
      </div>
    </>
  );
};
