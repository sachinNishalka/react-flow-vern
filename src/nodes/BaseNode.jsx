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
  const { updateNodeData } = useReactFlow();

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

  return (
    <div className="border">
      <div className="flex justify-between items-center gap-2">
        <div>{registryData.title}</div>
        {Form && <button onClick={() => setExpand(!expand)}>Expand</button>}
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
