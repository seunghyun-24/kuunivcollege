import { Handle, Position } from "react-flow-renderer";

export const CustomNode = ({ data }: any) => {
  const openCount = data.개설횟수;
  const maxCount = 5;

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
          display: "flex",
          height: "9px",
          borderRadius: "4px",
          //border: "1px solid #000",
          backgroundColor: "#ddd",
          marginTop: "3px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {Array.from({ length: maxCount }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: "100%",
              borderRight: i < maxCount - 1 ? "1px solid #fff" : "none",
              backgroundColor:
                i < openCount
                  ? openCount > i && openCount < i + 1
                    ? "rgba(255, 0, 0, 0.5)"
                    : "#FF0000"
                  : "#E0E0E0",
              transition: "background-color 0.3s ease-in-out",
            }}
          />
        ))}
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
            fontSize: "20px",
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
