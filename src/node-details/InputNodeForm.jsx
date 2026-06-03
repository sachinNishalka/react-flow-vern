import { useEdges, useReactFlow } from "@xyflow/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function InputNodeForm({ nodeId }) {
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
    setValue("name", formData?.name);
    setValue("description", formData?.description);
    setValue("type", formData?.type);
    setValue("module", formData?.module);
    setValue("emission_source", formData?.emission_source);
    setValue("origin_correlation_id", formData?.origin_correlation_id);
    setValue("owning_business_unit", formData?.owning_business_unit);
  }, [nodes]);

  return (
    <form className="flex flex-col gap-2 p-4" onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <input
        className="border"
        type="text"
        name="name"
        defaultValue="test"
        {...register("name")}
      />
      <label>description</label>
      <input className="border" type="text" {...register("description")} />
      <label>type</label>
      <input type="text" className="border " {...register("type")} />
      <label>module</label>
      <input type="text" className="border " {...register("module")} />
      <label>emission source</label>
      <input
        type="text"
        className="border "
        name="emissionSouce"
        {...register("emission_source")}
      ></input>
      <label>origin correlation id</label>
      <input
        type="text"
        className="border "
        {...register("origin_correlation_id")}
      ></input>
      <label>owning business unit</label>
      <input
        type="text"
        className="border "
        {...register("owning_business_unit")}
      ></input>
      <button className="border px-3 py-2 hover:bg-green-300" type="submit">
        Submit
      </button>
    </form>
  );
}
