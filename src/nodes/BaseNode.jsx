import { useEffect, useState } from "react";
import { nodesRegistry } from "../nodesRegistry";
import {
  Handle,
  useEdges,
  useOnSelectionChange,
  useReactFlow,
} from "@xyflow/react";

export default function BaseNode({ data, id }) {
  const [expand, setExpand] = useState(false);
  const { getNodes, setNodes, updateNodeData } = useReactFlow();

  const registryData = nodesRegistry[data.type];

  const Form = registryData?.form;

  // this is to update the input (soruce field) for the nodes that does not have any form
  const edges = useEdges();

  const connection = edges.find((edge) => edge.target === id);

  useEffect(() => {
    if (!Form) {
      updateNodeData(id, {
        meta: {
          inputs: connection?.source || "source",
        },
      });
    }
  }, [edges]);

  function handleRemove() {
    const nodes = getNodes();
    setNodes(nodes.filter((node) => node.id !== id));
  }

  return (
    <div className="border px-2 py-1">
      <div className="flex justify-between items-center gap-2">
        <div>{registryData.title}</div>
        {Form && (
          <button
            onClick={() => setExpand(!expand)}
            className="border px-2 py-1s hover:bg-gray-200 hover:text-gray-800"
          >
            {expand ? "Collapse" : "Expand"}
          </button>
        )}
        <button
          onClick={handleRemove}
          className="border px-2 py-1s hover:bg-red-200 hover:text-gray-800"
        >
          Remove
        </button>
      </div>
      {expand && Form && (
        <div>
          <Form nodeId={id} nodeType={data.type} />
        </div>
      )}
      {registryData.source && registryData.target && (
        <>
          <Handle
            type="target"
            position="top"
            isConnectable
            isConnectableEnd
          ></Handle>
          <Handle
            type="source"
            position="bottom"
            isConnectable
            isConnectableStart
          ></Handle>
        </>
      )}
      {registryData.source && (
        <>
          <Handle
            type="source"
            position="bottom"
            isConnectable
            isConnectableStart
          ></Handle>
        </>
      )}
      {registryData.target && (
        <>
          <Handle
            type="target"
            position="top"
            isConnectable
            isConnectableStart
          ></Handle>
        </>
      )}
    </div>
  );
}
