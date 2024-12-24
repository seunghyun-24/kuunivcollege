import React from "react";

export const GroupNode = ({ data }: any) => {
  return (
    <div
      style={{
        width: data.style?.width || "200px",
        height: data.style?.height || "150px",
        backgroundColor: data.style?.backgroundColor || "#C8E6C9",
        border: data.style?.border || "2px solid #92c3a5",
        borderRadius: data.style?.borderRadius || "10px",
        padding: "10px",
        position: "relative",
      }}
    >
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
      {data.nodes.map((nodeId: string) => (
        <div
          key={nodeId}
          style={{
            marginBottom: "5px",
            fontSize: "14px",
            color: "#333",
            textAlign: "center",
          }}
        >
          {nodeId}
        </div>
      ))}
    </div>
  );
};
