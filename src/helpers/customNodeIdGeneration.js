export function customNodeIdGeneration(type, existingNodes) {
  // here we are taking node type and existing nodes collection
  // we are running the loop using existing nodes
  // if we find an existing node which has the same type
  // then we increment the id and return it
  // if we don't find any existing node with the same type
  // then we return the node type as id

  let counter = 1;
  let id;

  do {
    id = `${type}-node${counter > 1 ? `-${counter}` : ""}`;
    counter++;
  } while (existingNodes.some((node) => node.id === id));

  return id;
}
