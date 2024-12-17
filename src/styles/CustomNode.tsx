import React from "react";
import { Handle, Position } from "react-flow-renderer";

export const CustomNode = ({ data }: any) => {
  const openCount = data.개설횟수;
  const maxCount = 5;

  const gaugeWidth = `${(openCount / maxCount) * 100}%`;

  return (
    <div
      style={{
        width: "150px", // 노드의 고정 너비
        height: "70px", // 노드의 고정 높이
        padding: "5px",
        textAlign: "center",
        //border: "1px solid #999",
        //borderRadius: "8px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden", // 넘치는 내용 감춤
      }}
    >
      <div
        style={{
          fontSize: "1rem", // 기본 폰트 크기
          overflow: "hidden",
          textOverflow: "ellipsis", // 너무 길 경우 ... 표시
          wordWrap: "break-word", // 줄바꿈 허용
          whiteSpace: "normal", // 텍스트가 줄바꿈되도록 설정
          flexShrink: 1, // 글자가 노드 크기에 맞게 축소될 수 있도록
          lineHeight: "1.2", // 줄 간격 조정
        }}
      >
        {data.label}
      </div>

      <div
        style={{
          position: "relative",
          marginTop: "5px",
          height: "8px",
          borderRadius: "4px",
          backgroundColor: "#ddd",
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
