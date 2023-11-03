import { ReactNode, createContext, useContext, useReducer } from "react";
import {
  ContextInitial,
  InitialState,
  ReducerAction,
  ReducerActionKind,
} from "./types/contextTypes";
import assets from "../assets";

const reducer = (state: InitialState, action: ReducerAction) => {
  switch (action.type) {
    case ReducerActionKind.MOVEITEM:
      const { dragIndex, hoverIndex } = action.payload;
      const copyData = [...state.data];

      const dragged__item = copyData.splice(dragIndex, 1);
      copyData.splice(hoverIndex, 0, dragged__item[0]);
      
      return { ...state, data: copyData };

    default:
      break;
  }
  return state;
};

const AppContext = createContext<ContextInitial>({
  state: assets,
  dispatch: null,
});

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, assets);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {" "}
      {children}{" "}
    </AppContext.Provider>
  );
};

export default ContextProvider;

export const GlobalContext = () => useContext(AppContext) as ContextInitial;
