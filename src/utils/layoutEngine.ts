import { Node, Edge, Position } from "@xyflow/react";
import { MarkerType } from "@xyflow/react";

const nodeWidth = 150;
// const nodeHeight = 50;

export const getLayoutedNodesAndEdges = (
  nodes: Node[],
  edges: Edge[],
  direction: "TB" | "LR" = "TB"
): { nodes: Node[]; edges: Edge[]; columnPositions: number[] } => {
  // 기본 간격 설정
  const nodeGapX = direction === "LR" ? 200 : 150;
  const nodeGapY = direction === "TB" ? 100 : 50;

  // 사용자 정의 레이아웃 노드 배치
  const layoutedNodes = nodes.map((node, index) => {
    // 간단한 열 기반 배치 (X: 열 간격, Y: 행 간격)
    const row = Math.floor(index / 3); // 3개씩 한 줄로 배치 (가변적으로 변경 가능)
    const column = index % 3;

    const x = column * nodeGapX; // 열 기준 X 좌표
    const y = row * nodeGapY; // 행 기준 Y 좌표

    return {
      ...node,
      position: { x, y },
      sourcePosition: direction === "TB" ? Position.Top : Position.Left,
      targetPosition: direction === "TB" ? Position.Bottom : Position.Right,
    };
  });

  // 간단한 Edge 계산 (직선 또는 꺾인 선 경로)
  const layoutedEdges = edges.map((edge) => {
    const sourceNode = layoutedNodes.find((n) => n.id === edge.source);
    const targetNode = layoutedNodes.find((n) => n.id === edge.target);

    if (!sourceNode || !targetNode) return edge;

    const points = [
      { x: sourceNode.position.x + nodeWidth / 2, y: sourceNode.position.y },
      { x: targetNode.position.x - nodeWidth / 2, y: targetNode.position.y },
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

  // 열 위치 계산
  const columnPositions = layoutedNodes.map((node) => node.position.x);
  const uniqueColumnPositions = Array.from(new Set(columnPositions)).sort(
    (a, b) => a - b
  );

  return {
    nodes: layoutedNodes,
    edges: layoutedEdges,
    columnPositions: uniqueColumnPositions,
  };
};
