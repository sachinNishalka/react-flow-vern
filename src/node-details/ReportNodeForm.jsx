import { useEdges, useReactFlow } from "@xyflow/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useGetFactorLibraries } from "./useGetFactorLibraries";
import CustomSelect from "../components/CustomSelect";
import { useGetEstimationFactors } from "./useGetEstimationFactors";

export default function ReportNodeForm({ nodeId }) {
  const [factorLibarary, setFactorLibrary] = useState(null);
  const [estimationFactor, setEstimationFactor] = useState(null);

  const [filteredEstimationFactors, setFilteredEstimationFactors] =
    useState(null);

  const { register, handleSubmit, setValue, getValues } = useForm();

  const { getNodes, updateNodeData } = useReactFlow();

  const nodes = getNodes();

  const edges = useEdges();

  const connection = edges.find((edge) => edge.target === nodeId);

  const onSubmit = (data) => {
    updateNodeData(nodeId, {
      meta: {
        inputs: connection?.source || "source",
        formData: {
          ...data,
          factor_library: factorLibarary,
          factor_mappings: estimationFactor,
        },
      },
    });
  };

  useEffect(() => {
    const node = nodes.find((node) => node.id === nodeId);
    const formData = node?.data?.meta?.formData;

    setValue(
      "report_value_column",
      getValues("report_value_column") || formData?.report_value_column,
    );

    setValue(
      "report_qty_column",
      getValues("report_qty_column") || formData?.report_qty_column,
    );

    setFactorLibrary(factorLibarary || formData?.factor_library);
    setEstimationFactor(estimationFactor || formData?.factor_mappings);

    console.log("factor Library" + factorLibarary);
    console.log("factor mappings" + estimationFactor);
  }, [nodes]);

  // filtering estimation factors according to the factor libraries

  useEffect(() => {
    if (factorLibarary != null) {
      let filteredFactors = estimationFactors?.filter(
        (estimationFactor) =>
          estimationFactor.factorLibraryId === factorLibarary.value,
      );
      setFilteredEstimationFactors(filteredFactors);
    }
  }, [factorLibarary]);

  const { data: factorLibraries, isLoading: isFactorLibrariesLoading } =
    useGetFactorLibraries();

  const { data: estimationFactors, isLoading: isEstimationFactorsLoading } =
    useGetEstimationFactors();

  if (isFactorLibrariesLoading) return <div>Loading...</div>;

  const optionsFactorLibraries = factorLibraries?.map((libarary) => ({
    value: libarary.id,
    label: libarary.name,
  }));

  const estimationFactorsOptions = estimationFactors?.map((factor) => ({
    value: factor.id,
    label: factor.name,
  }));

  const filteredEstimationFactorOPtions = filteredEstimationFactors?.map(
    (factor) => ({
      value: factor.id,
      label: factor.name,
    }),
  );

  console.log("factor library ", factorLibarary);
  return (
    <form
      className="flex flex-col gap-2 p-4"
      onSubmit={handleSubmit(onSubmit)}
      id="node-form-report"
    >
      <label>Factor Library</label>
      <CustomSelect
        options={optionsFactorLibraries}
        onItemChange={setFactorLibrary}
        value={factorLibarary}
      ></CustomSelect>

      <label>Report Value Column</label>
      <input
        className="border"
        type="text"
        defaultValue="test"
        {...register("report_value_column")}
      />
      <label>Report Qty Column</label>
      <input
        className="border"
        type="text"
        {...register("report_qty_column")}
      />

      <label>Factor Mappings</label>
      <CustomSelect
        options={filteredEstimationFactorOPtions || estimationFactorsOptions}
        isMulti={true}
        onItemChange={setEstimationFactor}
        value={estimationFactor}
      ></CustomSelect>

      <button className="border px-3 py-2 hover:bg-green-300" type="submit">
        Submit
      </button>
    </form>
  );
}
