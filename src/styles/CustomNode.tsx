import React from "react";
import { Handle, Position } from "react-flow-renderer";

export const CustomNode = ({ data }: any) => {
  return (
    <div
      style={{
        padding: "3px",
        //fontSize: "16px",
        textAlign: "center",
      }}
    >
      {data.label}
      <Handle
        type="target"
        position={Position.Left}
        style={{ visibility: "hidden" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ visibility: "hidden" }}
      />
    </div>
  );
};

export const nodeTypes = { customNode: CustomNode };
