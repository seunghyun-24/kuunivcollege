import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  ReactFlow,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "../styles/ReactFlowStyles.css";
import {
  CustomNode,
  CustomZeroNode,
  YearNode,
  SemesterNode,
} from "../styles/CustomNode";
import { GroupNode } from "../styles/GroupNode";
import { findConnectedNodesAndEdges } from "../utils/calculateRelationCourses";

const nodeTypes = {
  customNode: CustomNode,
  customZeroNode: CustomZeroNode,
  yearNode: YearNode,
  semesterNode: SemesterNode,
  groupNode: GroupNode,
};

interface GraphRendererProps {
  nodes: any[];
  edges: any[];
  onBoundsChange: (bounds: { width: number; height: number }) => void;
}

const GraphRenderer: React.FC<GraphRendererProps> = ({
  nodes,
  edges,
  onBoundsChange,
}) => {
  const reactFlowInstance = useReactFlow();
  const [styledNodes, , onNodesChange] = useNodesState(nodes);
  const [styledEdges, , onEdgesChange] = useEdgesState(edges);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [connectedNodeIds, setConnectedNodeIds] = useState<Set<string>>(
    new Set()
  );
  const [connectedEdgeIds, setConnectedEdgeIds] = useState<Set<string>>(
    new Set()
  );

  const handleNodeMouseEnter = (_event: any, node: any) => {
    const connectedEdges = edges.filter(
      (edge) => edge.source === node.id || edge.target === node.id
    );

    if (connectedEdges.length >= 0) {
      setHoveredNodeId(node.id);

      const { nodes: relatedNodes, edges: relatedEdges } =
        findConnectedNodesAndEdges(node.id, edges);
      setConnectedNodeIds(relatedNodes);
      setConnectedEdgeIds(relatedEdges);
    }
  };

  const handleNodeMouseLeave = () => {
    setHoveredNodeId(null);
    setConnectedNodeIds(new Set());
    setConnectedEdgeIds(new Set());
  };

  const defaultViewport = useMemo(
    () => ({
      x: -Math.min(...nodes.map((node) => node.position.x)) * 0.5,
      y: -Math.min(...nodes.map((node) => node.position.y)) * 0.5,
      zoom: 0.5,
    }),
    [nodes]
  );

  const styledNodesWithHighlight = styledNodes.map((node) => ({
    ...node,
    style: {
      ...node.style,
      opacity:
        hoveredNodeId === null || connectedNodeIds.has(node.id) ? 1 : 0.3,
    },
    data: {
      ...node.data,
      tooltip: [
        node.data?.label,
        node.data?.학수번호,
        node.data?.세부전공,
        node.data?.전공역량,
        node.data?.개설학과,
        node.data?.개설횟수,
        node.data?.내용,
        node.data?.메모,
        node.data?.syllabus_kr,
      ]
        .filter(Boolean)
        .join(" | "),
      showTooltip: hoveredNodeId === node.id,
    },
  }));

  const styledEdgesWithHighlight = styledEdges.map((edge) => ({
    ...edge,
    style: {
      ...edge.style,
      stroke: connectedEdgeIds.has(edge.id)
        ? "#007bff"
        : edge.data?.type === "required"
        ? "#ff0000"
        : "#7e7e7e",
      opacity:
        hoveredNodeId === null ? 1 : connectedEdgeIds.has(edge.id) ? 1 : 0.1,
      strokeWidth:
        hoveredNodeId === null ? 1 : connectedEdgeIds.has(edge.id) ? 2 : 1,
    },
    animated: hoveredNodeId !== null && connectedEdgeIds.has(edge.id),
    markerEnd: {
      type: "arrowclosed",
      color: connectedEdgeIds.has(edge.id) ? "#007bff" : "#7e7e7e",
    },
  }));

  useEffect(() => {
    const bounds = {
      width: Math.max(...styledNodes.map((node) => node.position.x), 600),
      height: Math.max(
        ...styledNodes.map((node) => node.position.y * 0.6),
        1000
      ),
    };
    onBoundsChange(bounds);
  }, [styledNodes, onBoundsChange]);

  const resetView = useCallback(() => {
    reactFlowInstance.setViewport(defaultViewport);
  }, [defaultViewport, reactFlowInstance]);

  return (
    <>
      <div className="reactflow-wrapper">
        <ReactFlow
          nodes={styledNodesWithHighlight}
          edges={styledEdgesWithHighlight}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeMouseEnter={handleNodeMouseEnter}
          onNodeMouseLeave={handleNodeMouseLeave}
          nodeTypes={nodeTypes}
          zoomOnScroll={true}
          panOnDrag={false}
          defaultViewport={defaultViewport}
          maxZoom={5.0}
          minZoom={0.5}
          nodesConnectable={false}
          nodesDraggable={false}
        >
          <Background color="#ddd" gap={16} />
          <Controls position="top-right" onFitView={resetView} />
        </ReactFlow>
      </div>
    </>
  );
};

export default GraphRenderer;
