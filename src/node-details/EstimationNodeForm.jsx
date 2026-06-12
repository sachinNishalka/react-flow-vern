import { useEdges, useReactFlow } from "@xyflow/react";
import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import CustomSelect from "../components/CustomSelect";
import { useGetFactorLibraries } from "./useGetFactorLibraries";
import { useGetFactorMappings } from "./useGetFactorMappings";
import { useGetEstimationFactors } from "./useGetEstimationFactors";

export default function EstimationNodeForm({ nodeId }) {
  const [factorLibarary, setFactorLibrary] = useState(null);
  const [estimationFactor, setEstimationFactor] = useState(null);
  const [filteredEstimationFactors, setFilteredEstimationFactors] =
    useState(null);

  const { register, handleSubmit, setValue } = useForm();
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
          estimation_factor: estimationFactor,
        },
      },
    });
  };

  useEffect(() => {
    const node = nodes.find((node) => node.id === nodeId);
    const formData = node?.data?.meta?.formData;

    setFactorLibrary(factorLibarary || formData?.factor_library);
    setEstimationFactor(estimationFactor || formData?.estimation_factor);
    setValue("estimation_factor", formData?.estimation_factor);
    setValue("estimation_value_column", formData?.estimation_value_column);
    setValue("estimation_unit_column", formData?.estimation_unit_column);
    setValue("output_value_column", formData?.output_value_column);
    setValue("output_unit_column", formData?.output_unit_column);
  }, [nodes]);

  const { data: factorLibraries, isLoading: isFactorLibrariesLoading } =
    useGetFactorLibraries();

  const { data: estimationFactors, isLoading: isEstimationFactorsLoading } =
    useGetEstimationFactors();

  useEffect(() => {
    if (factorLibarary != null) {
      let filteredFactors = estimationFactors?.filter(
        (factorLibrary) =>
          factorLibrary.factorLibraryId === factorLibarary.value,
      );
      // TODO: this should be changed to factor mappings
      setFilteredEstimationFactors(filteredFactors);
    }
  }, [factorLibarary]);

  if (isFactorLibrariesLoading && isEstimationFactorsLoading)
    return <div>Loading...</div>;

  const optionsFactorLibraries = factorLibraries?.map((libarary) => ({
    value: libarary.id,
    label: libarary.name,
  }));

  const estimationFactorOptions = estimationFactors?.map((factor) => ({
    value: factor.id,
    label: factor.name,
  }));

  const filteredEstimationFactorOPtions = filteredEstimationFactors?.map(
    (factor) => ({
      value: factor.id,
      label: factor.name,
    }),
  );

  return (
    <form className="flex flex-col gap-2 p-4" onSubmit={handleSubmit(onSubmit)}>
      <label>Factor Library</label>
      <CustomSelect
        options={optionsFactorLibraries}
        onItemChange={setFactorLibrary}
        value={factorLibarary}
      ></CustomSelect>

      <label>Estimation Factor</label>
      <CustomSelect
        options={filteredEstimationFactorOPtions || estimationFactorOptions}
        isMulti={true}
        onItemChange={setEstimationFactor}
        value={estimationFactor}
      ></CustomSelect>

      <label>Estimation Value Column</label>
      <input
        className="border"
        type="text"
        {...register("estimation_value_column")}
      />
      <label>Estimation Unit Column</label>
      <input
        className="border"
        type="text"
        {...register("estimation_unit_column")}
      />
      <label>Output Value Column</label>
      <input
        className="border"
        type="text"
        {...register("output_value_column")}
      />
      <label>Output Unit Column</label>
      <input
        className="border"
        type="text"
        {...register("output_unit_column")}
      />

      <button className="border px-3 py-2 hover:bg-green-300" type="submit">
        Submit
      </button>
    </form>
  );
}
