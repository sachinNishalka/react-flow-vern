import React from "react";
import { useDnD } from "../context/DnDProvider";

export default function Sidebar() {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="p-4">
      <div className="description mb-2">
        You can drag these nodes to the pane on the left.
      </div>
      <div
        className=" input border px-3 py-2 mb-2"
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        Input Node
      </div>
      <div
        className=" border px-3 py-2 mb-2"
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
      >
        Output Node
      </div>
      <div
        className=" border px-3 py-2 mb-2"
        onDragStart={(event) => onDragStart(event, "report")}
        draggable
      >
        Report Node
      </div>
      <div
        className=" border px-3 py-2 mb-2"
        onDragStart={(event) => onDragStart(event, "report-gas")}
        draggable
      >
        Report Gas Node
      </div>
      <div
        className=" border px-3 py-2 mb-2"
        onDragStart={(event) => onDragStart(event, "estimation")}
        draggable
      >
        Estimation Node
      </div>
      <div
        className=" border px-3 py-2 mb-2"
        onDragStart={(event) => onDragStart(event, "select")}
        draggable
      >
        Select Node
      </div>
    </aside>
  );
}
