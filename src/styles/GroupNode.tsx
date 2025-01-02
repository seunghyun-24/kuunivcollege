import React from "react";
import { CustomNode } from "./CustomNode"; // CustomNode를 가져옴

export const GroupNode = ({ data }: any) => {
  const maxItemsPerRow = 8; // 한 줄에 배치할 최대 노드 수

  return (
    <div
      style={{
        backgroundColor: data.style?.backgroundColor || "#E0F7FA",
        border: data.style?.border || "2px solid #00838F",
        borderRadius: "10px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: data.style?.width || "400px",
        height: data.style?.height || "auto",
      }}
    >
      {/* 그룹 제목 */}
      <div
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        {data.label}
      </div>

      {/* 그룹 내부 노드 */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {data.nodes.map((node: any, index: number) => (
          <CustomNode
            key={node.id || index}
            data={{
              label: node.label,
              학수번호: node.tooltip.학수번호,
              세부전공: node.tooltip.세부전공,
              전공역량: node.tooltip.전공역량,
              개설학과: node.tooltip.개설학과,
              내용: node.tooltip.내용,
              메모: node.tooltip.메모,
              syllabus_kr: node.tooltip.syllabus_kr,
            }}
          />
        ))}
      </div>
    </div>
  );
};
