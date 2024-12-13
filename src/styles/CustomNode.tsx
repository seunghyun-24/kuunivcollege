import React from "react";
import { Handle, Position } from "react-flow-renderer";

export const CustomNode = ({ data }: any) => {
  const isLongText = data.label.length > 10; // 텍스트가 10글자를 초과하는지 확인

  return (
    <div
      style={{
        padding: "2px",
        textAlign: "center",
        fontSize: isLongText ? "15px" : "18px", // 글자 크기 동적으로 변경
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
