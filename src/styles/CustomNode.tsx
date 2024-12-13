import React from "react";
import { Handle, Position } from "react-flow-renderer";

export const CustomNode = ({ data }: any) => {
  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        background: "#fff",
      }}
    >
      {data.label}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export const nodeTypes = { customNode: CustomNode };
