import { GlobalContext } from "../utils/Context";

const Gallary = () => {
  const {
    state: { data: items },
  } = GlobalContext();

  return (
    <div className="gallary">
      <div className="border-b py-4 gallary__head">
        <h2>Gallary</h2>
      </div>
      <div className="gallary__main gap-5 grid-cols-5 py-3">
        {items.map((item, index) => {
          return (
            <div key={index} className={` gallary__item`}>
              <img src={item.image} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallary;
