import { useEdges, useNodesState } from "@xyflow/react";
import { useForm } from "react-hook-form";
import { initialNodes } from "../App";

export default function ReportGasNodeForm({ nodeId, nodeType }) {
  const { register, handleSubmit } = useForm();
  const [setNodes] = useNodesState(initialNodes);

  const edges = useEdges();

  const connection = edges.find((edge) => edge.target === nodeId);

  const onSubmit = (data) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id == nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              meta: {
                type: nodeType,
                inputs: connection?.source || "source",
                formData: data,
              },
            },
          };
        }
        return node;
      }),
    );
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <label>Report Value Column</label>
      <input
        type="text"
        defaultValue="test"
        {...register("report_value_column")}
      />
      <label>Report Qty Column</label>
      <input type="text" {...register("report_qty_column")} />

      <button type="submit">Submit</button>
    </form>
  );
}
