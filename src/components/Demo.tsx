import React, { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  useEdgesState,
  useNodesState,
  Edge,
  Node,
  Position,
  addEdge,
  Connection,
} from "react-flow-renderer";
import dagre from "dagre";

import { CustomNode } from "../styles/CustomNode";
import { CustomEdge } from "../styles/CustomEdge";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 150;
const nodeHeight = 50;

const nodeTypes = { customNode: CustomNode };
const edgeTypes = { step: CustomEdge };

const getLayoutedNodesAndEdges = (
  nodes: Node[],
  edges: Edge[],
  direction: "TB" | "LR" = "TB"
): { nodes: Node[]; edges: Edge[] } => {
  dagreGraph.setGraph({ rankdir: direction });

  // Dagre에 노드 추가
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  // Dagre에 엣지 추가
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Dagre 레이아웃 계산
  dagre.layout(dagreGraph);

  // x 좌표 기준으로 그룹화
  const xGroups: { [key: number]: Node[] } = {};

  nodes.forEach((node) => {
    const x = node.data.x || 0;
    if (!xGroups[x]) xGroups[x] = [];
    xGroups[x].push(node);
  });

  // y 좌표를 Dagre 계산값과 그룹 내 순서에 따라 조정
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const x = node.data.x || 0;

    // 같은 x 그룹 내에서 간격 조정
    const group = xGroups[x];
    const yIndex = group.findIndex((n) => n.id === node.id);
    const ySpacing = nodeHeight + 50; // 노드 간 세로 간격

    node.position = {
      x, // x는 사용자 제공 값을 유지
      y: nodeWithPosition.y + yIndex * ySpacing, // y는 그룹 내 간격 조정
    };
    node.targetPosition = Position.Left;
    node.sourcePosition = Position.Right;
    return node;
  });

  const layoutedEdges = edges.map((edge) => ({
    ...edge,
    markerEnd: "arrowclosed",
  }));

  return { nodes: layoutedNodes, edges: layoutedEdges };
};

// 초기 노드 데이터: x 좌표를 지정
const initialNodes: Node[] = [
  {
    id: "1",
    data: { label: "1", x: 100 },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "2",
    data: { label: "2", x: 300 },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "3",
    data: { label: "3", x: 500 },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "4",
    data: { label: "4", x: 700 },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "5",
    data: { label: "5", x: 100 },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "6",
    data: { label: "6", x: 100 },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "7",
    data: { label: "7", x: 200 },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", type: "step" },
  { id: "e2-3", source: "2", target: "3", type: "step" },
  { id: "e3-4", source: "3", target: "4", type: "step" },
  { id: "e5-2", source: "5", target: "2", type: "step" },
  { id: "e6-3", source: "6", target: "3", type: "step" },
  //{ id: "e7-5", source: "7", target: "5", type: "step" },
];

const AutoLayoutFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const applyLayout = useCallback(() => {
    const layouted = getLayoutedNodesAndEdges(initialNodes, initialEdges);
    setNodes(layouted.nodes);
    setEdges(layouted.edges);
  }, []);

  const onConnect = (connection: Connection) =>
    setEdges((eds) => addEdge(connection, eds));

  React.useEffect(() => {
    applyLayout();
  }, [applyLayout]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        nodeTypes={nodeTypes}
        style={{ background: "#f0f0f0" }}
        onConnect={onConnect} // 연결 이벤트
        nodesConnectable={false} // 핸들(점) 숨김
        nodesDraggable={false} // 전체 노드 이동 비활성화
      >
        <Background color="#888" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default AutoLayoutFlow;
