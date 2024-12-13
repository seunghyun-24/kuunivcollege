import React from "react";

type Point = {
  x: number;
  y: number;
};

export const CustomEdge = ({ id, data }: any) => {
  const { points, type } = data;

  // Build the path string from the array of points
  const path: string = points
    .map((point: Point, index: number) =>
      index === 0 ? `M${point.x},${point.y}` : `L${point.x},${point.y}`
    )
    .join(" ");

  // Style the edge based on its type
  const edgeStyle =
    type === "required"
      ? { stroke: "#ff0000", strokeWidth: 2 } // Required edge: Red
      : { stroke: "#7e7e7e", strokeWidth: 2 }; // Optional edge: Default

  return (
    <g>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
        </marker>
      </defs>

      {/* Render the edge path */}
      <path
        id={id}
        className="react-flow__edge-path"
        d={path}
        markerEnd="url(#arrowhead)" // Add arrowhead marker
        style={{ ...edgeStyle, fill: "none" }}
      />
    </g>
  );
};

export const edgeTypes = { custom: CustomEdge };
