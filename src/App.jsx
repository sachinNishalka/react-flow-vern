import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import BaseNode from "./nodes/BaseNode";

// defining node types here

const nodeTypes = {
  baseNode: BaseNode,
};

// defined here to prevent re - rendering
// eslint-disable-next-line react-refresh/only-export-components
export const initialNodes = [
  {
    id: "input-node",
    position: { x: 0, y: 0 },
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
