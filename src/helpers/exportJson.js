export function exportJson(nodes) {
  const sampleDat = [
    {
      id: "input-node",
      position: {
        x: -335.5748373101952,
        y: 0,
      },
      data: {
        type: "input",
        meta: {
          inputs: "source",
          formData: {
            name: "test",
            description: "test",
            type: "test",
            module: "test",
            emission_source: "test",
            origin_correlation_id: "test",
            owning_business_unit: "test",
          },
        },
      },
      type: "baseNode",
      measured: {
        width: 142,
        height: 25,
      },
      selected: false,
      dragging: false,
    },
    {
      id: "output-node",
      position: {
        x: -285.79175704989154,
        y: 367.35357917570497,
      },
      data: {
        type: "output",
        meta: {
          inputs: "estimation-node",
        },
      },
      type: "baseNode",
      measured: {
        width: 95,
        height: 25,
      },
      selected: true,
      dragging: false,
    },
    {
      id: "report-node",
      position: {
        x: -335.5748373101952,
        y: 117.02819956616054,
      },
      data: {
        type: "report",
        meta: {
          inputs: "input-node",
          formData: {
            report_value_column: "test",
            report_qty_column: "test",
            factor_mappings: "test",
          },
        },
      },
      type: "baseNode",
      measured: {
        width: 152,
        height: 25,
      },
      selected: false,
      dragging: false,
    },
    {
      id: "report-gas-node",
      position: {
        x: -375.2169197396963,
        y: 207.80911062906722,
      },
      data: {
        type: "reportGas",
        meta: {
          inputs: "report-node",
          formData: {
            report_value_column: "test",
            report_qty_column: "test",
          },
        },
      },
      type: "baseNode",
      measured: {
        width: 233,
        height: 25,
      },
      selected: false,
      dragging: false,
    },
    {
      id: "estimation-node",
      position: {
        x: -323.59002169197396,
        y: 289.3709327548807,
      },
      data: {
        type: "estimation",
        meta: {
          inputs: "report-gas-node",
          formData: {
            factor_library: "test",
            estimation_factor: "test",
            estimation_value_column: "test",
            estimation_unit_column: "test",
            output_value_column: "test",
            output_unit_column: "test",
          },
        },
      },
      type: "baseNode",
      measured: {
        width: 178,
        height: 25,
      },
      selected: false,
      dragging: false,
    },
  ];

  // console.log(nodes);
  console.log(convertNodesToJson(nodes));
}

function convertNodesToJson(nodes) {
  let data = {};

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
    case "reportGas":
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
