import { ReactNode, createContext, useContext, useReducer } from "react";
import { ContextInitial } from "../types/contextTypes";
import assets from "../../assets";
import { Reducer } from "./reducerFunction";

const AppContext = createContext<ContextInitial | null>(null);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(Reducer, assets);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {" "}
      {children}{" "}
    </AppContext.Provider>
  );
};

export default ContextProvider;

export const GlobalContext = () => useContext(AppContext) as ContextInitial;
