import "./App.css";
import { Scene } from "./components/Scene";
import { Tooltip } from "react-tooltip";
import { createContext, useRef } from "react";

export const TooltipContext = createContext();

const TooltipProvider = ({ children }) => {
  const tooltipRef = useRef(null);
  return (
    <TooltipContext.Provider value={tooltipRef}>
      <Tooltip ref={tooltipRef} style={{ zIndex: 1 }} clickable />
      {children}
    </TooltipContext.Provider>
  );
};

function App() {
  return (
    <TooltipProvider>
      <Scene />
    </TooltipProvider>
  );
}

export default App;
