
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
    case ReducerActionKind.UPDATEITEM:
      const {dragIndex, hoverIndex} = action.payload;
      console.log(dragIndex, hoverIndex);
      const copyData = [...state.data];
   
      break;
  
    default:
      break;
  }
  return state;
};

const AppContext = createContext<ContextInitial>({state: assets, dispatch: null});

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