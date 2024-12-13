import dagre from "dagre";
import { Node, Edge, Position } from "react-flow-renderer";
import { MarkerType } from "@xyflow/react";

const nodeWidth = 150;
const nodeHeight = 50;

export const getLayoutedNodesAndEdges = (
  nodes: Node[],
  edges: Edge[],
  direction: "TB" | "LR" = "TB"
): { nodes: Node[]; edges: Edge[]; columnPositions: number[] } => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setGraph({
    rankdir: direction,
    nodesep: 30,
    edgesep: 30,
    ranksep: 60,
  });
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    // const nodeWithPosition = dagreGraph.node(node.id);
    // dagre에서 계산된 y 좌표를 사용하고 x 좌표는 사용자 제공 값 유지
    const fixedX = node.position.x; // 기존 사용자 제공 x 값 유지
    // const computedY = nodeWithPosition.y; // dagre에서 계산된 y 값
    const fixedY = node.position.y;

    return {
      ...node,
      position: { x: fixedX, y: fixedY },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    };
  });

  const layoutedEdges = edges.map((edge) => {
    const sourceNode = layoutedNodes.find((n) => n.id === edge.source);
    const targetNode = layoutedNodes.find((n) => n.id === edge.target);

    if (!sourceNode || !targetNode) return edge;

    // 출발점과 도착점을 사용자 계산 값으로 설정
    const sourceX = sourceNode.position.x + nodeWidth / 2;
    const sourceY = sourceNode.position.y;

    const targetX = targetNode.position.x - nodeWidth / 2;
    const targetY = targetNode.position.y;

    // 꺾이는 지점 계산
    const midX = sourceX + (targetX - sourceX) * 0.2; // X축 20% 지점
    const midY = sourceY + (targetY - sourceY) * 0.5; // Y축 중간 지점
    const points = [
      { x: sourceX, y: sourceY }, // 시작점
      { x: midX, y: sourceY }, // 꺾이는 지점
      { x: midX, y: midY }, // 꺾이는 지점
      { x: targetX, y: targetY }, // 도착점
    ];

    // const offset = 50; // 꺾이는 위치 오프셋
    // const midX = sourceX + offset;
    // const points = [
    //   { x: sourceX, y: sourceY }, // 시작점
    //   { x: midX, y: sourceY }, // 첫 번째 꺾이는 지점
    //   { x: midX, y: targetY }, // 두 번째 꺾이는 지점
    //   { x: targetX, y: targetY }, // 도착점
    // ];

    return {
      ...edge,
      data: { points }, // 경로 데이터 저장
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
      },
    };
  });

  const allX = nodes.map((node) => node.position.x - 300);
  const columnPos = new Set<number>(allX);
  const columnPositions = Array.from(columnPos).sort((a, b) => a - b);

  return { nodes: layoutedNodes, edges: layoutedEdges, columnPositions };
};
