import { GlobalContext } from "../utils/Context";
import { ReducerActionKind } from "../utils/types/contextTypes";
import CustomCheckMark from "./ui/CustomCheckMark/CustomCheckMark";

const GallaryHead = () => {
  const {
    state: { data: globalData }, dispatch
  } = GlobalContext();
  const selectedData = globalData.filter((item) => item.selected === true);

  return (
    <div className="gallary__head">
      {!selectedData.length ? (
        <h2>Gallary</h2>
      ) : (
        <>
          <div className="gallary__head--left">
            <CustomCheckMark checked={true} />
            <p> {selectedData?.length} files selected</p>
          </div>
          <p className="gallary__head--right" onClick={() => {
            dispatch({type: ReducerActionKind.DELETEITEM})
          }}>Delete Files</p>
        </>
      )}
    </div>
  );
};

export default GallaryHead;
