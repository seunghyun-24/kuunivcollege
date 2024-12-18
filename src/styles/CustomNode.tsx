import React from "react";
import { Handle, Position } from "react-flow-renderer";

export const CustomNode = ({ data }: any) => {
  const openCount = data.개설횟수;
  const maxCount = 5;

  const gaugeWidth = `${(openCount / maxCount) * 100}%`;

  return (
    <div
      style={{
        width: "150px",
        height: "70px",
        padding: "5px",
        textAlign: "center",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontSize: "0.9rem",
          overflow: "hidden",
          wordWrap: "break-word",
          whiteSpace: "normal",
          flexShrink: 1,
          lineHeight: "1.2",
        }}
      >
        <strong>{data.label}</strong> <br />
        <span style={{ fontSize: "0.7rem", color: "#555" }}>
          {data.학수번호}
        </span>
      </div>

      <div
        style={{
          position: "relative",
          height: "7px",
          borderRadius: "4px",
          backgroundColor: "#ddd",
          marginTop: "3px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: gaugeWidth,
            backgroundColor: "#FF0000",
            borderRadius: "4px",
            transition: "width 0.3s ease-in-out",
          }}
        />
      </div>

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
