import { useEdges, useNodesState, useReactFlow } from "@xyflow/react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function ReportNodeForm({ nodeId, nodeType }) {
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
    setValue("report_value_column", formData?.report_value_column);
    setValue("report_qty_column", formData?.report_qty_column);
    setValue("factor_mappings", formData?.factor_mappings);
  }, [nodes]);

  return (
    <form className="flex flex-col gap-2 p-4" onSubmit={handleSubmit(onSubmit)}>
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
      <input className="border" type="text" {...register("factor_mappings")} />

      <button className="border px-3 py-2 hover:bg-green-300" type="submit">
        Submit
      </button>
    </form>
  );
}
