import { Card } from "./Card";
import GallaryHead from "./GallaryHead";
import { GlobalContext } from "../utils/Context";

export const Container = () => {
  const {
    state: { data: globalData },
  } = GlobalContext();

  return (
    <>
      <div className="gallary">
        <GallaryHead />
        <div className="gallary__main">
          {globalData.map((card, i) => (
            <Card key={card.id} index={i} id={card.id} image={card.image} selected={card.selected} />
          ))}
        </div>
      </div>
    </>
  );
};
