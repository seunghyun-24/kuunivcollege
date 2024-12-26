import { Node, Edge, Position } from "@xyflow/react";
import { MarkerType } from "@xyflow/react";

const nodeWidth = 150;

export const getLayoutedNodesAndEdges = (
  nodes: Node[],
  edges: Edge[],
  direction: "TB" | "LR" = "TB"
): { nodes: Node[]; edges: Edge[]; columnPositions: number[] } => {
  const nodeGapX = direction === "LR" ? 200 : 150;
  const nodeGapY = direction === "TB" ? 100 : 50;

  const layoutedNodes = nodes.map((node, index) => {
    const x =
      node.position.x !== undefined ? node.position.x : index * nodeGapX;
    const y =
      node.position.y !== undefined ? node.position.y : index * nodeGapY;

    return {
      ...node,
      position: { x, y },
      sourcePosition: direction === "TB" ? Position.Bottom : Position.Right,
      targetPosition: direction === "TB" ? Position.Top : Position.Left,
    };
  });

  const layoutedEdges = edges.map((edge) => {
    const sourceNode = layoutedNodes.find((n) => n.id === edge.source);
    const targetNode = layoutedNodes.find((n) => n.id === edge.target);

    if (!sourceNode || !targetNode) return edge;

    const sourceX = sourceNode.position.x + nodeWidth / 2;
    const sourceY = sourceNode.position.y;
    const targetX = targetNode.position.x - nodeWidth / 2;
    const targetY = targetNode.position.y;

    const midX = sourceX + (targetX - sourceX) * 0.5;
    // const midY = sourceY + (targetY - sourceY) * 0.5;
    const points = [
      { x: sourceX, y: sourceY },
      { x: midX, y: sourceY },
      { x: midX, y: targetY },
      { x: targetX, y: targetY },
    ];

    return {
      ...edge,
      data: { points },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
      },
    };
  });

  const allX = layoutedNodes.map((node) => node.position.x);
  const columnPos = new Set<number>(allX);
  const columnPositions = Array.from(columnPos).sort((a, b) => a - b);

  return { nodes: layoutedNodes, edges: layoutedEdges, columnPositions };
};
