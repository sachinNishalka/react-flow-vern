import { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useReactFlow,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import BaseNode from "./nodes/BaseNode";

import { convertToNodesEdges } from "./helpers/convertNodesEdges";

import sampleData from "./helpers/sampleData.json";
import { exportJson } from "./helpers/exportJson";
import { createPortal } from "react-dom";
import { useDnD } from "./context/DnDProvider";
import Sidebar from "./components/Sidebar";
import { customNodeIdGeneration } from "./helpers/customNodeIdGeneration";

// defining node types here

const nodeTypes = {
  baseNode: BaseNode,
};

// defined here to prevent re - rendering
// eslint-disable-next-line react-refresh/only-export-components
// export const initialNodes = [
//   {
//     // this is the id, which differentiate the nodes, same type nodes with different ids
//     id: "input-node",
//     position: { x: 0, y: 0 },
//     // this is the type which gets data from the registry and this is type of the node which will pass to the json
//     data: { type: "input" },
//     type: "baseNode",
//   },
//   {
//     id: "output-node",
//     position: { x: 0, y: 500 },
//     data: { type: "output" },
//     type: "baseNode",
//   },
//   {
//     id: "report-node",
//     position: { x: 0, y: 200 },
//     data: { type: "report" },
//     type: "baseNode",
//   },
//   {
//     id: "report-gas-node",
//     position: { x: 0, y: 300 },
//     data: { type: "report-gas" },
//     type: "baseNode",
//   },
//   {
//     id: "estimation-node",
//     position: { x: 0, y: 400 },
//     data: { type: "estimation" },
//     type: "baseNode",
//   },
//   {
//     id: "select-node",
//     position: { x: 0, y: 400 },
//     data: { type: "select" },
//     type: "baseNode",
//   },
// ];

// const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];

export default function App() {
  // for sample data
  const { nodes: sampledataNodes, edges: sampledataEdges } =
    convertToNodesEdges(sampleData);

  // for nodes and edges to the react flow
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // basic react flow functions
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

  // for left code bar
  const [jsonOutput, setJsonOutput] = useState({});

  // for the model
  const [openModel, setOpenModel] = useState(false);

  // for the text area
  const [textAreaValue, setTextAreaValue] = useState("");

  // for the json output
  useEffect(() => {
    setJsonOutput(exportJson(nodes));
  }, [nodes]);

  // button for converting to nodes
  function handleConvertToNodes() {
    const extractedNodes = JSON.parse(textAreaValue);
    const { nodes, edges } = convertToNodesEdges(extractedNodes.nodes);
    setNodes(nodes);
    setEdges(edges);
    setOpenModel(false);
  }

  // for the drag and drop , to indetify the nodes
  const [type] = useDnD();
  const { screenToFlowPosition } = useReactFlow();

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      // check if the dropped element is valid
      if (!type) {
        return;
      }

      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: customNodeIdGeneration(type, nodes),
        type: "baseNode",
        position,
        data: { type },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type],
  );

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.setData("text/plain", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="h-screen w-screen bg-black text-white absolute">
      {openModel &&
        createPortal(
          <div className="fixed  inset-0 h-full w-full flex justify-center items-center bg-black/50">
            <div className="bg-white w-[500px] h-[500px] flex items-center justify-center flex-col">
              <label>Paste the JSON here</label>
              <textarea
                className="w-[400px] h-[400px] border"
                value={JSON.stringify(jsonOutput, null, 2)}
                onChange={(e) => setTextAreaValue(e.target.value)}
              />
              <div className="flex gap-2 items-end justify-end w-full p-4">
                <button
                  className="border px-3 py-2 hover:bg-green-300"
                  onClick={handleConvertToNodes}
                >
                  Ok
                </button>
                <button
                  className="border px-3 py-2 hover:bg-red-300"
                  onClick={() => setOpenModel(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
      <div className="grid grid-rows-[64px_1fr] h-screen w-full">
        <div>
          <button
            className="border px-3 py-2"
            onClick={() => console.log(convertToNodesEdges(sampleData))}
          >
            Convert TO JSON
          </button>
          <button
            className="border px-3 py-2"
            onClick={() => setOpenModel(true)}
          >
            Convert TO Nodes
          </button>
        </div>
        <div className="grid grid-cols-[350px_1fr_200px] h-full">
          <div className="bg-slate-800 p-8 overflow-hidden relative">
            <pre className="text-xs whitespace-pre-wrap  overflow-y-scroll absolute inset-0 p-4">
              {JSON.stringify(jsonOutput, null, 2)}
            </pre>
          </div>
          <div className="">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              onDrop={onDrop}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              fitView
            >
              <Background></Background>
            </ReactFlow>
          </div>
          <div className=" bg-slate-500">
            <Sidebar></Sidebar>
          </div>
        </div>
      </div>
    </div>
  );
}
