import React from "react";

export const InformationBox = () => {
  const legendItems = [
    { color: "#FFECB3", label: "학문의기초" },
    { color: "#C8E6C9", label: "교양필수" },
    { color: "#B3E5FC", label: "교양선택" },
    { color: "#D1C4E9", label: "전공필수" },
    { color: "#F8BBD0", label: "전공선택" },
    { color: "#FFD180", label: "전공필수선택" },
    { color: "#FFFFFF", label: "전공인정" },
    { type: "edge", color: "#ff0000", label: "필수 선수과목" },
    { type: "edge", color: "#333", label: "권장 선수과목" },
    { type: "gauge", value: 3, label: "최근 5년 간 개설" }, // value: 게이지 값 (1~5)
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
              <div style={gaugeContainerStyle}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      ...gaugeSegmentStyle,
                      backgroundColor:
                        (item.value ?? 0) > i
                          ? i + 1 > (item.value ?? 0)
                            ? "rgba(255, 0, 0, 0.5)"
                            : "#FF0000"
                          : "#E0E0E0",
                      borderRight: i < 4 ? "1px solid #B0B0B0" : "none",
                    }}
                  />
                ))}
              </div>
              <span style={{ marginLeft: "10px" }}>{item.label}</span>
            </div>
          ) : (
            <div
              style={{
                ...colorBoxStyle,
                backgroundColor: item.color || "transparent",
              }}
            ></div>
          )}
          {item.type !== "gauge" && (
            <span style={labelStyle}>{item.label}</span>
          )}
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
  fontSize: "14px",
};

const colorBoxStyle = {
  width: "20px",
  height: "20px",
  marginRight: "10px",
  borderRadius: "4px",
};

const gaugeContainerStyle = {
  display: "flex",
  width: "50px",
  height: "10px",
  border: "1px solid #333",
  borderRadius: "2px",
  overflow: "hidden",
};

const gaugeSegmentStyle = {
  flex: 1,
  height: "100%",
};

const labelStyle = {
  fontSize: "14px",
  color: "#333",
};
