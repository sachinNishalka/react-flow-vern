import { useEdges, useNodesState } from "@xyflow/react";
import { useForm } from "react-hook-form";
import { initialNodes } from "../App";

export default function InputNodeForm({ nodeId, nodeType }) {
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
      <label>Name</label>
      <input
        type="text"
        name="name"
        defaultValue="test"
        {...register("name")}
      />
      <label>description</label>
      <input type="text" name="description" {...register("description")} />
      <label>type</label>
      <input type="text" name="type" {...register("type")} />
      <label>module</label>
      <input type="text" name="module" {...register("module")} />
      <label>emission source</label>
      <input
        type="text"
        name="emissionSouce"
        {...register("emissionSouce")}
      ></input>
      <label>origin correlation id</label>
      <input
        type="text"
        name="originCorrelationId"
        {...register("originCorrelationId")}
      ></input>
      <label>owning business unit</label>
      <input
        type="text"
        name="owningBusinessUnit"
        {...register("owningBusinessUnit")}
      ></input>
      <button type="submit">Submit</button>
    </form>
  );
}
