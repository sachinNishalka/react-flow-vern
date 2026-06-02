import { customNodeIdGeneration } from "./customNodeIdGeneration";

const sampleIncomingData = [
  {
    id: "input-node",
    type: "input",
    inputs: "source",
    params: {
      columns: [
        {
          name: "test name",
        },
        {
          description: "test description",
        },
        {
          type: "some type",
        },
        {
          module: "some module",
        },
        {
          emission_source: "some emission source",
        },
        {
          origin_correlation_id: "some origin correlaiton id",
        },
        {
          owning_business_unit: "some owning business unit",
        },
      ],
    },
  },
  {
    id: "output-node",
    type: "output",
    inputs: "estimation-node",
    params: {},
  },
  {
    id: "report-node",
    type: "report",
    inputs: "input-node",
    params: {
      columns: [
        {
          name: "report_value_column",
          column: "some report value",
        },
        {
          name: "report_qty_column",
          column: "some qty column",
        },
        {
          name: "factor_mappings",
          column: "some factor mapping",
        },
      ],
    },
  },
  {
    id: "report-gas-node",
    type: "reportGas",
    inputs: "source",
    params: {
      columns: [
        {
          name: "report_value_column",
          column: "some report value",
        },
        {
          name: "report_qty_column",
          column: "some report qty",
        },
        {
          name: "factor_mappings",
        },
      ],
    },
  },
  {
    id: "estimation-node",
    type: "estimation",
    inputs: "source",
    params: {
      columns: [
        {
          name: "factor_library",
          column: "some factor library",
        },
        {
          name: "estimation_factor",
          column: "some estimation factor",
        },
        {
          name: "estimation_value_column",
          column: "some estimation column",
        },
        {
          name: "estimation_unit_column",
          column: "some unit column",
        },
        {
          name: "output_value_column",
          column: "some output value",
        },
        {
          name: "output_unit_column",
          column: "some output unit column",
        },
      ],
    },
  },
];

export function convertToNodesEdges(nodesEdges) {
  const nodes = [];
  const convertedDataObj = {
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
  };

  //   here we are creating the nodes for incomming data
  sampleIncomingData.map((node, i) => {
    nodes.push({
      id: customNodeIdGeneration(node.type, nodes),
      position: { x: 0, y: i * 100 },
      data: {
        type: node.type,
        meta: {
          // where it is connected to
          inputs: node.inputs,
          formData: convertToFormData(node.type, node.params.columns),
        },
      },
    });
  });

  console.log(nodes);
}

function getNodesMetaData(nodeObj) {}

function convertToFormData(nodeType, columnsData) {}
