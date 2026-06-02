import { useState } from "react";
import { nodesRegistry } from "../nodesRegistry";
import { Handle } from "@xyflow/react";

export default function BaseNode({ data, id }) {
  const [expand, setExpand] = useState(false);

  const registryData = nodesRegistry[data.type];

  const Form = registryData?.form;

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
