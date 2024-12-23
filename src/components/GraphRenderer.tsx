import React, { useCallback, useEffect, useState } from "react";
import {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "../styles/ReactFlowStyles.css";
import { CustomNode, YearNode, SemesterNode } from "../styles/CustomNode";
import { findConnectedNodesAndEdges } from "../utils/calculateRelationCourses";

const nodeTypes = {
  customNode: CustomNode,
  yearNode: YearNode,
  semesterNode: SemesterNode,
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
  }));

  const calculateGraphBounds = useCallback(() => {
    const maxX = Math.max(...styledNodes.map((node) => node.position.x), 600);
    const maxY = Math.max(
      ...styledNodes.map((node) => node.position.y * 0.6),
      1000
    );
    return { width: maxX, height: maxY };
  }, [styledNodes]);

  const topY = Math.min(...styledNodes.map((node) => node.position.y));
  const minX = Math.min(...nodes.map((node) => node.position.x));

  const [previousBounds, setPreviousBounds] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const bounds = calculateGraphBounds();
    if (
      bounds.width !== previousBounds.width ||
      bounds.height !== previousBounds.height
    ) {
      setPreviousBounds(bounds);
      onBoundsChange(bounds);
    }
  }, [styledNodes, calculateGraphBounds, onBoundsChange, previousBounds]);

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
          panOnDrag={true}
          viewport={{ x: -minX * 0.5, y: -topY * 0.5, zoom: 0.5 }}
          maxZoom={2.0}
          minZoom={0.5}
          nodesConnectable={false}
          nodesDraggable={false}
        >
          <Background color="#ddd" gap={16} />
          <Controls position="top-right" />
        </ReactFlow>
      </div>
    </>
  );
};

export default GraphRenderer;
