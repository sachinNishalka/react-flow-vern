import "@xyflow/react/dist/style.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CalculationModelBuilder from "./CalculationModelBuilder";
import { ReactFlowProvider } from "@xyflow/react";
import { DnDProvider } from "./context/DnDProvider";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactFlowProvider>
        <DnDProvider>
          <CalculationModelBuilder></CalculationModelBuilder>
        </DnDProvider>
      </ReactFlowProvider>
    </QueryClientProvider>
  );
}
