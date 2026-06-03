export function exportJson(nodes) {
  return convertNodesToJson(nodes);
}

function convertNodesToJson(nodes) {
  let data;

  const convertedNodes = nodes.map((node) => {
    try {
      return {
        id: node.id,
        type: node.data.type,
        inputs: node.data.meta.inputs,
        params: {
          columns: getColumnData(node.data.meta.formData, node.data.type),
        },
      };
    } catch (error) {
      console.log(error + " for node " + node);
    }
  });

  data = convertedNodes;

  return data;
}

function getColumnData(formData, nodeType) {
  switch (nodeType) {
    case "input":
      return [
        { name: formData.name },
        { description: formData.description },
        { type: formData.type },
        { module: formData.module },
        { emission_source: formData.emission_source },
        { origin_correlation_id: formData.origin_correlation_id },
        { owning_business_unit: formData.owning_business_unit },
      ];
    case "report":
      return [
        {
          name: "report_value_column",
          column: formData.report_value_column,
        },
        {
          name: "report_qty_column",
          column: formData.report_qty_column,
        },
        {
          name: "factor_mappings",
          column: formData.factor_mappings,
        },
      ];
    case "report-gas":
      return [
        {
          name: "report_value_column",
          column: formData.report_value_column,
        },
        {
          name: "report_qty_column",
          column: formData.report_qty_column,
        },
        {
          name: "factor_mappings",
          column: formData.factor_mappings,
        },
      ];
    case "estimation":
      return [
        {
          name: "factor_library",
          column: formData.factor_library,
        },
        {
          name: "estimation_factor",
          column: formData.estimation_factor,
        },
        {
          name: "estimation_value_column",
          column: formData.estimation_value_column,
        },
        {
          name: "estimation_unit_column",
          column: formData.estimation_unit_column,
        },
        {
          name: "output_value_column",
          column: formData.output_value_column,
        },
        {
          name: "output_unit_column",
          column: formData.output_unit_column,
        },
      ];
  }
}
