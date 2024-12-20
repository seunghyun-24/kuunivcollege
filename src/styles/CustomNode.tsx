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

      {data.tooltip && (
        <div
          style={{
            position: "absolute",
            zIndex: 1000,
            bottom: "-20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#333",
            color: "#fff",
            padding: "5px",
            borderRadius: "5px",
            fontSize: "0.75rem",
            whiteSpace: "nowrap",
            visibility: data.showTooltip ? "visible" : "hidden",
          }}
        >
          {data.tooltip}
        </div>
      )}

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

export const YearNode = ({ data }: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "350px",
        height: "30px",
        borderBottom: "3px solid #bbb",
        textAlign: "center",
        fontSize: "1.4rem",
        fontWeight: "bold",
      }}
    >
      {data.label}
    </div>
  );
};

export const SemesterNode = ({ data }: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "150px",
        height: "50px",
        borderBottom: "2px solid #000",
        textAlign: "center",
        fontSize: "1.2rem",
        fontWeight: "bold",
      }}
    >
      {data.label}
    </div>
  );
};

export const nodeTypes = {
  customNode: CustomNode,
  yearNode: YearNode,
  semesterNode: SemesterNode,
};
