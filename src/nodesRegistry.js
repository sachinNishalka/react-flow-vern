import EstimationNodeForm from "./node-details/EstimationNodeForm";
import InputNodeForm from "./node-details/InputNodeForm";
import ReportGasNodeForm from "./node-details/ReportGasNodeForm";
import ReportNodeForm from "./node-details/ReportNodeForm";

// this contains each nodes configurations, and forms to render
export const nodesRegistry = {
  input: {
    title: "Input Node",
    form: InputNodeForm,
    source: true,
    target: false,
  },
  output: {
    title: "Output Node",
    source: false,
    target: true,
  },
  report: {
    title: "Report Node",
    form: ReportNodeForm,
    source: true,
    target: true,
  },
  "report-gas": {
    title: "Report Report Gas Node",
    form: ReportGasNodeForm,
    source: true,
    target: true,
  },
  estimation: {
    title: "Estimation Node",
    form: EstimationNodeForm,
    source: true,
    target: true,
  },
  select: {
    title: "Select Node",

    source: true,
    target: true,
  },
};
