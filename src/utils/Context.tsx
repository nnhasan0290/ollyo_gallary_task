
import { ReactNode, createContext, useContext, useReducer } from "react";
import {
  ContextInitial,
  InitialState,
  ReducerAction,
} from "./types/contextTypes";
import assets from "../assets";

const reducer = (state: InitialState, action: ReducerAction) => {
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