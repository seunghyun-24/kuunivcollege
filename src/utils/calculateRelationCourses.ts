import { Edge } from "@xyflow/react";

export const findConnectedNodesAndEdges = (
  startNodeId: string,
  edges: Edge[]
) => {
  const visitedNodes = new Set<string>();
  const connectedEdges = new Set<string>();
  const stack = [startNodeId];

  while (stack.length > 0) {
    const currentNodeId = stack.pop()!;
    if (!visitedNodes.has(currentNodeId)) {
      visitedNodes.add(currentNodeId);

      edges.forEach((edge) => {
        if (edge.source === currentNodeId && !visitedNodes.has(edge.target)) {
          stack.push(edge.target);
          connectedEdges.add(edge.id);
        }
      });
    }
  }

  const traversePreRequisites = (nodeId: string) => {
    edges.forEach((edge) => {
      if (edge.target === nodeId && !visitedNodes.has(edge.source)) {
        visitedNodes.add(edge.source);
        connectedEdges.add(edge.id);
        traversePreRequisites(edge.source);
      }
    });
  };

  traversePreRequisites(startNodeId);

  return { nodes: visitedNodes, edges: connectedEdges };
};
