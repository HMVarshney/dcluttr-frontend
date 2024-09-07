import { createContext, useContext, useReducer } from "react";
import { dynamicDashboardReducer, initialState } from "./DynamicDashboardReducer";

export const DynamicDashboardContext = createContext();

export const DynamicDashboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dynamicDashboardReducer, initialState);

  const contextValue = { state, dispatch };

  return <DynamicDashboardContext.Provider value={contextValue}>{children}</DynamicDashboardContext.Provider>;
};

export const useDynamicDashboardContext = () => useContext(DynamicDashboardContext);
