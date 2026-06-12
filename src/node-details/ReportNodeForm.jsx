import { useEdges, useReactFlow } from "@xyflow/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useGetFactorLibraries } from "./useGetFactorLibraries";
import CustomSelect from "../components/CustomSelect";
import { useGetEstimationFactors } from "./useGetEstimationFactors";
import { useGetFactorMappings } from "./useGetFactorMappings";

export default function ReportNodeForm({ nodeId }) {
  const [factorLibarary, setFactorLibrary] = useState(null);

  // TODO: should change to factor mappings
  // const [estimationFactor, setEstimationFactor] = useState(null);
  const [factorMappings, setFactorMappings] = useState();

  // TODO: should change to filterd factor mappings
  // const [filteredEstimationFactors, setFilteredEstimationFactors] =
  // useState(null);
  const [filteredFactorMappings, setFilteredFactorMappings] = useState(null);

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
          // TODO: shoudl change to factor mappings
          factor_mappings: factorMappings,
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

    // TODO: should change to factor mappings
    // setEstimationFactor(estimationFactor || formData?.factor_mappings);
    setFactorMappings(factorMappings || formData?.factor_mappings);

    console.log("factor Library" + factorLibarary);
    // TODO: should change to factor mappings
    // console.log("factor mappings" + estimationFactor);
  }, [nodes]);

  // filtering estimation factors according to the factor libraries

  const { data: factorLibraries, isLoading: isFactorLibrariesLoading } =
    useGetFactorLibraries();

  // TODO: should make a hook for facot mappings
  // const { data: estimationFactors, isLoading: isEstimationFactorsLoading } =
  //   useGetEstimationFactors();

  const { data: factorMappingsData, isLoadig: isLoadingFactorMappings } =
    useGetFactorMappings();

  useEffect(() => {
    if (factorLibarary != null) {
      let filteredFactors = factorMappingsData?.filter(
        (factorMapping) =>
          factorMapping.factorLibraryId === factorLibarary.value,
      );
      // TODO: this should be changed to factor mappings
      setFilteredFactorMappings(filteredFactors);
    }
  }, [factorLibarary]);

  if (isFactorLibrariesLoading && isLoadingFactorMappings)
    return <div>Loading...</div>;

  const optionsFactorLibraries = factorLibraries?.map((libarary) => ({
    value: libarary.id,
    label: libarary.name,
  }));

  // TODO: this should be changed to factor mappings
  const factorMappingOptions = factorMappingsData?.map((factor) => ({
    value: factor.id,
    label: factor.name,
  }));

  // TODO: this should be changed to factor mappings
  const filteredEstimationFactorOPtions = filteredFactorMappings?.map(
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
        options={filteredEstimationFactorOPtions || factorMappingOptions}
        isMulti={true}
        onItemChange={setFactorMappings}
        value={factorMappings}
      ></CustomSelect>

      <button className="border px-3 py-2 hover:bg-green-300" type="submit">
        Submit
      </button>
    </form>
  );
}
