import { customNodeIdGeneration } from "./customNodeIdGeneration";

export function convertToNodesEdges(nodesEdges) {
  const nodes = [];

  //  here we have to maintain a mapping for all the nodes old ids and new ids
  // because the input field contains the old ids, even we create new ids, they cannot be used to
  // map the edges

  const idMapping = {};

  //   here we are creating the nodes for incomming data
  nodesEdges.map((node, i) => {
    const newId = customNodeIdGeneration(node.type, nodes);
    idMapping[node.id] = newId;
    nodes.push({
      id: newId,
      position: { x: 0, y: i * 100 },
      data: {
        type: node.type,
        meta: {
          // where it is connected to
          inputs: node.inputs,
          formData: convertToFormData(node.type, node.params.columns),
        },
      },
      type: "baseNode",
    });
  });

  const edges = convertToEdges(nodesEdges, idMapping);
  return { nodes, edges };
}

function convertToFormData(nodeType, columnsData) {
  let formData = {};
  switch (nodeType) {
    case "input":
      columnsData.map((column) => {
        if (column.name != undefined) formData["name"] = column.name;
        if (column.description != undefined)
          formData["description"] = column.description;
        if (column.type != undefined) formData["type"] = column.type;
        if (column.module != undefined) formData["module"] = column.module;
        if (column.emission_source != undefined)
          formData["emission_source"] = column.emission_source;
        if (column.origin_correlation_id != undefined)
          formData["origin_correlation_id"] = column.origin_correlation_id;
        if (column.owning_business_unit != undefined)
          formData["owning_business_unit"] = column.owning_business_unit;
      });
      return formData;
    case "report":
      columnsData.map((column) => {
        if (column.name === "report_value_column" && column.column != undefined)
          formData["report_value_column"] = column.column;
        if (column.name === "report_qty_column" && column.column != undefined)
          formData["report_qty_column"] = column.column;
        if (column.name === "factor_mappings" && column.column != undefined)
          formData["factor_mappings"] = column.column;
        if (column.name === "factor_library" && column.column != undefined)
          formData["factor_library"] = column.column;
      });
      return formData;
    case "report-gas":
      columnsData.map((column) => {
        if (column.name === "report_value_column" && column.column != undefined)
          formData["report_value_column"] = column.column;
        if (column.name === "report_qty_column" && column.column != undefined)
          formData["report_qty_column"] = column.column;
        if (column.name === "factor_mappings" && column.column != undefined)
          formData["factor_mappings"] = column.column;
        if (column.name === "factor_library" && column.column != undefined)
          formData["factor_library"] = column.column;
      });
      return formData;
    case "estimation":
      columnsData.map((column) => {
        if (column.name === "factor_library" && column.column != undefined)
          formData["factor_library"] = column.column;
        if (column.name === "estimation_factor" && column.column != undefined)
          formData["estimation_factor"] = column.column;
        if (
          column.name === "estimation_value_column" &&
          column.column != undefined
        )
          formData["estimation_value_column"] = column.column;
        if (
          column.name === "estimation_unit_column" &&
          column.column != undefined
        )
          formData["estimation_unit_column"] = column.column;
        if (column.name === "output_value_column" && column.column != undefined)
          formData["output_value_column"] = column.column;
        if (column.name === "output_unit_column" && column.column != undefined)
          formData["output_unit_column"] = column.column;
      });
      return formData;
    default:
      return formData;
  }
}

function convertToEdges(nodesEdges, idMapping) {
  let edges = [];
  nodesEdges.map((node) => {
    if (node.type === "input") {
      return;
    } else {
      const newSource = idMapping[node.inputs];
      const newTarget = idMapping[node.id];
      edges.push({
        source: newSource,
        target: newTarget,
        id: `edge-${newSource}-${newTarget}`,
      });
    }
  });

  return edges;
}
