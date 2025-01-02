import React from "react";

export const InformationBox = () => {
  const nodeColors = {
    학문의기초: "#f8f8f8",
    교양필수: "#C8E6C9",
    교양선택: "#f8f8f8",
    전공필수: "#D1C4E9",
    전공선택: "#f8f8f8",
    전공필수선택: "#c4d0e9",
    전공인정: "#FFFFFF",
    기타: "#FFFFFF",
  };

  const nodeLineColors = {
    학문의기초: "#92c3a5",
    교양필수: "#92c3a5",
    교양선택: "#F8BBD0",
    전공필수: "#9a49c2",
    전공선택: "#8f8f8f",
    전공필수선택: "#55aad4",
    전공인정: "#55aad4",
    기타: "#ccc",
  };

  const legendItems = [
    {
      color: nodeColors["학문의기초"],
      lineColor: nodeLineColors["학문의기초"],
      label: "학문의기초",
    },
    {
      color: nodeColors["교양필수"],
      lineColor: nodeLineColors["교양필수"],
      label: "교양필수",
    },
    {
      color: nodeColors["교양선택"],
      lineColor: nodeLineColors["교양선택"],
      label: "교양선택",
    },
    {
      color: nodeColors["전공필수"],
      lineColor: nodeLineColors["전공필수"],
      label: "전공필수",
    },
    {
      color: nodeColors["전공선택"],
      lineColor: nodeLineColors["전공선택"],
      label: "전공선택",
    },
    {
      color: nodeColors["전공필수선택"],
      lineColor: nodeLineColors["전공필수선택"],
      label: "전공필수선택",
    },
    {
      color: nodeColors["전공인정"],
      lineColor: nodeLineColors["전공인정"],
      label: "전공인정",
    },
    { type: "edge", color: "#ff0000", label: "필수 선수과목" },
    { type: "edge", color: "#333", label: "권장 선수과목" },
    { type: "gauge", value: 3, label: "최근 5년 간 개설 횟수" },
  ];

  return (
    <div style={legendContainerStyle}>
      {legendItems.map((item, index) => (
        <div key={index} style={legendItemStyle}>
          {item.type === "edge" ? (
            <svg width="200" height="20" style={{ marginRight: "10px" }}>
              <line
                x1="0"
                y1="10"
                x2="50"
                y2="10"
                stroke={item.color}
                strokeWidth="2"
              />
              <text
                x="60"
                y="15"
                fill="#333"
                fontSize="12px"
                fontFamily="Nanum Gothic"
              >
                {item.label}
              </text>
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
            <>
              <div
                style={{
                  ...colorBoxStyle,
                  backgroundColor: item.color || "transparent",
                  border: `2px solid ${item.lineColor || "transparent"}`,
                }}
              ></div>
              <span style={labelStyle}>{item.label}</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

const legendContainerStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  fontFamily: "'Nanum Gothic', sans-serif",
  padding: "10px",
  zIndex: 10,
};

const legendItemStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "5px",
  fontFamily: "'Nanum Gothic', sans-serif",
  fontSize: "12px",
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
  fontFamily: "'Nanum Gothic', sans-serif",
  overflow: "hidden",
};

const gaugeSegmentStyle = {
  flex: 1,
  fontFamily: "'Nanum Gothic', sans-serif",
  height: "100%",
};

const labelStyle = {
  fontFamily: "'Nanum Gothic', sans-serif",
  fontSize: "12px",
  color: "#333",
};
