import React, { useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import { Tooltip } from "react-tooltip";
import "../styles/ReactFlowStyles.css";
import { CustomNode } from "../styles/CustomNode";
import { findConnectedNodesAndEdges } from "../utils/calculateRelationCourses";
import { InfomationBox } from "./InfomationBox";

const nodeTypes = {
  customNode: CustomNode,
};

interface GraphRendererProps {
  nodes: any[];
  edges: any[];
}

const GraphRenderer: React.FC<GraphRendererProps> = ({ nodes, edges }) => {
  const [styledNodes, setNodes, onNodesChange] = useNodesState(nodes);
  const [styledEdges, setEdges, onEdgesChange] = useEdgesState(edges);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [connectedNodeIds, setConnectedNodeIds] = useState<Set<string>>(
    new Set()
  );
  const [connectedEdgeIds, setConnectedEdgeIds] = useState<Set<string>>(
    new Set()
  );

  const handleNodeMouseEnter = (event: any, node: any) => {
    const connectedEdges = edges.filter(
      (edge) => edge.source === node.id || edge.target === node.id
    );

    if (connectedEdges.length > 0) {
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

  // 강조 스타일 적용
  const styledNodesWithHighlight = styledNodes.map((node) => ({
    ...node,
    style: {
      ...node.style,
      opacity:
        hoveredNodeId === null || connectedNodeIds.has(node.id) ? 1 : 0.3,
    },
    "data-tooltip-id": `tooltip-${node.id}`,
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
        hoveredNodeId === null ? 1 : connectedEdgeIds.has(edge.id) ? 1 : 0.3,
      strokeWidth:
        hoveredNodeId === null ? 1 : connectedEdgeIds.has(edge.id) ? 2 : 1,
    },
    animated: hoveredNodeId !== null && connectedEdgeIds.has(edge.id),
  }));

  return (
    <>
      <div style={{ width: "100%", height: "500px" }}>
        <ReactFlow
          nodes={styledNodesWithHighlight}
          edges={styledEdgesWithHighlight}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeMouseEnter={handleNodeMouseEnter}
          onNodeMouseLeave={handleNodeMouseLeave}
          nodeTypes={nodeTypes}
          fitView
          zoomOnScroll={false}
          panOnDrag={false}
          nodesConnectable={false}
          nodesDraggable={false}
          attributionPosition={undefined}
        >
          <Background color="#ddd" gap={16} />
          <Controls />
        </ReactFlow>
        <InfomationBox />
        <Tooltip anchorSelect="[data-tooltip-id]" place="top" clickable>
          {hoveredNodeId && (
            <div>
              <strong>
                {
                  styledNodes.find((node) => node.id === hoveredNodeId)?.data
                    .label
                }
              </strong>
            </div>
          )}
        </Tooltip>
      </div>
    </>
  );
};

export default GraphRenderer;
