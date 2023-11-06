import {
  InitialState,
  ReducerAction,
  ReducerActionKind,
} from "../types/contextTypes";

export const Reducer = (state: InitialState, action: ReducerAction) => {
  switch (action.type) {
    // moving function for every card
    case ReducerActionKind.MOVEITEM:
      const { dragIndex, hoverIndex } = action.payload;
      let copyData = [...state.data];

      // setting previous position for animation
      const resetPos = copyData.map((item, i) => {
        if (
          (i >= hoverIndex && i <= dragIndex) ||
          (i <= hoverIndex && i >= dragIndex)
        ) {
          return { ...item, previousPos: i };
        }

        return item;
      });
      copyData = [...resetPos];

      //dragged item
      const dragged__item = copyData.splice(dragIndex, 1);
      //resetting
      copyData.splice(hoverIndex, 0, dragged__item[0]);

      return { ...state, data: copyData };

    case ReducerActionKind.SELECTITEM:
      // checked cards
      const newData = state.data.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, selected: !item.selected };
        } else {
          return item;
        }
      });
      return { ...state, data: newData };

    case ReducerActionKind.DELETEITEM:
      //unchecked cards
      const unSelectedData = state.data.filter(
        (item) => item.selected === false
      );
      return { ...state, data: unSelectedData };

    default:
      break;
  }
  return state;
};
