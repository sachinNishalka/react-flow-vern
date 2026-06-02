import { createContext, useContext } from "react";

const ModelBuilderContext = createContext();

export default function ModelBuilderProvider({ children }) {
  return (
    <ModelBuilderContext.Provider value={{}}>
      {children}
    </ModelBuilderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useModelBuilder() {
  return useContext(ModelBuilderContext);
}
