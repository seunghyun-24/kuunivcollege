import React from "react";

export const InfomationBox = () => {
  const legendItems = [
    { color: "#FFECB3", label: "학문의기초" },
    { color: "#C8E6C9", label: "교양필수" },
    { color: "#B3E5FC", label: "교양선택" },
    { color: "#D1C4E9", label: "전공필수" },
    { color: "#F8BBD0", label: "전공선택" },
    { color: "#FFD180", label: "전공필수선택" },
    // { color: "#FFFFFF", label: "기타" },
    // { border: "2px solid #000000", label: "실험실습" },
    { type: "edge", color: "#ff0000", label: "필수 선수과목" },
    { type: "edge", color: "#333", label: "권장 선수과목" },
    { type: "gauge", color: "#FF0000", label: "최근 5년 간 개설 정도" }, // 게이지 바 설명 추가
  ];

  return (
    <div style={legendContainerStyle}>
      {legendItems.map((item, index) => (
        <div key={index} style={legendItemStyle}>
          {item.type === "edge" ? (
            <svg width="50" height="10" style={{ marginRight: "10px" }}>
              <line x1="0" y1="5" x2="50" y2="5" stroke={item.color} />
            </svg>
          ) : item.type === "gauge" ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "50px",
                  height: "5px",
                  backgroundColor: item.color,
                  marginRight: "10px",
                }}
              />
            </div>
          ) : (
            <div
              style={{
                ...colorBoxStyle,
                backgroundColor: item.color || "transparent",
              }}
            ></div>
          )}
          <span style={labelStyle}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const legendContainerStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  padding: "10px",
  zIndex: 10,
};

const legendItemStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "5px",
};

const colorBoxStyle = {
  width: "20px",
  height: "20px",
  marginRight: "10px",
  borderRadius: "4px",
};

const labelStyle = {
  fontSize: "14px",
  color: "#333",
};
