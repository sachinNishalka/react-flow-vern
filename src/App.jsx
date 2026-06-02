import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useOnSelectionChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import BaseNode from "./nodes/BaseNode";
import { exportJson } from "./helpers/exportJson";
import { convertToNodesEdges } from "./helpers/convertNodesEdges";

// defining node types here

const nodeTypes = {
  baseNode: BaseNode,
};

// defined here to prevent re - rendering
// eslint-disable-next-line react-refresh/only-export-components
export const initialNodes = [
  {
    // this is the id, which differentiate the nodes, same type nodes with different ids
    id: "input-node",
    position: { x: 0, y: 0 },
    // this is the type which gets data from the registry and this is type of the node which will pass to the json
    data: { type: "input" },
    type: "baseNode",
  },
  {
    id: "output-node",
    position: { x: 0, y: 100 },
    data: { type: "output" },
    type: "baseNode",
  },
  {
    id: "report-node",
    position: { x: 0, y: 200 },
    data: { type: "report" },
    type: "baseNode",
  },
  {
    id: "report-gas-node",
    position: { x: 0, y: 300 },
    data: { type: "reportGas" },
    type: "baseNode",
  },
  {
    id: "estimation-node",
    position: { x: 0, y: 400 },
    data: { type: "estimation" },
    type: "baseNode",
  },
];

// const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <button
        className="border px-3 py-2"
        onClick={() => convertToNodesEdges()}
      >
        Export JSON
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      />
    </div>
  );
}
