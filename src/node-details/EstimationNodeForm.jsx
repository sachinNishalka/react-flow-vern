import { useEdges, useReactFlow } from "@xyflow/react";
import { useForm } from "react-hook-form";

import { useEffect } from "react";

export default function EstimationNodeForm({ nodeId }) {
  const { register, handleSubmit, setValue } = useForm();
  const { getNodes, updateNodeData } = useReactFlow();

  const nodes = getNodes();

  const edges = useEdges();

  const connection = edges.find((edge) => edge.target === nodeId);

  const onSubmit = (data) => {
    updateNodeData(nodeId, {
      meta: {
        inputs: connection?.source || "source",
        formData: data,
      },
    });
  };

  useEffect(() => {
    const node = nodes.find((node) => node.id === nodeId);
    const formData = node?.data?.meta?.formData;
    setValue("factor_library", formData?.factor_library);
    setValue("estimation_factor", formData?.estimation_factor);
    setValue("estimation_value_column", formData?.estimation_value_column);
    setValue("estimation_unit_column", formData?.estimation_unit_column);
    setValue("output_value_column", formData?.output_value_column);
    setValue("output_unit_column", formData?.output_unit_column);
  }, [nodes]);

  return (
    <form className="flex flex-col gap-2 p-4" onSubmit={handleSubmit(onSubmit)}>
      <label>Factor Library</label>
      <input
        className="border"
        type="text"
        defaultValue="test"
        {...register("factor_library")}
      />
      <label>Estimation Factor</label>
      <input
        className="border"
        type="text"
        {...register("estimation_factor")}
      />
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
