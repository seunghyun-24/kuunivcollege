import { Handle, Position } from "@xyflow/react";

export const CustomNode = ({ data }: any) => {
  const openCount = data.개설횟수;
  const maxCount = 5;

  return (
    <div
      style={{
        fontFamily: "'Nanum Gothic', sans-serif",
        width: "150px",
        height: "70px",
        padding: "5px",
        textAlign: "center",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "visible",
        position: "relative",
      }}
    >
      <div
        style={{
          fontFamily: "'Nanum Gothic', sans-serif",
          fontSize: "0.9rem",
          overflow: "hidden",
          wordWrap: "break-word",
          whiteSpace: "normal",
          flexShrink: 1,
          lineHeight: "1.2",
        }}
      >
        <strong>{data.label}</strong> <br />
        <span
          style={{
            fontFamily: "'Nanum Gothic', sans-serif",
            fontSize: "0.7rem",
            color: "#555",
          }}
        >
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

      {data.tooltip && data.showTooltip && (
        <div
          style={{
            fontFamily: "'Nanum Gothic', sans-serif",
            position: "absolute",
            zIndex: 1000,
            bottom: "-140px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(50, 50, 50, 1)",
            color: "#fff",
            padding: "15px 20px",
            borderRadius: "10px",
            fontSize: "20px",
            maxWidth: "800px", // 툴팁 너비 확장
            textAlign: "left",
            boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          <strong>{data.label}</strong>
          <ul style={{ padding: "0", margin: "0", listStyleType: "none" }}>
            {data.학수번호 && <li>학수번호: {data.학수번호}</li>}
            {data.세부전공 && <li>세부전공: {data.세부전공}</li>}
            {data.전공역량 && <li>전공역량: {data.전공역량}</li>}
            {data.개설학과 && <li>개설학과: {data.개설학과}</li>}
            {data.내용 && <li>내용: {data.내용}</li>}
            {data.메모 && <li>메모: {data.메모}</li>}
            {data.syllabus_kr && <li>Syllabus: {data.syllabus_kr}</li>}
          </ul>
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

export const CustomZeroNode = ({ data }: any) => {
  const openCount = data.개설횟수;
  const maxCount = 5;

  return (
    <div
      style={{
        fontFamily: "'Nanum Gothic', sans-serif",
        width: "370px",
        height: "70px",
        padding: "5px",
        textAlign: "center",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "visible",
        position: "relative",
      }}
    >
      <div
        style={{
          fontFamily: "'Nanum Gothic', sans-serif",
          fontSize: "0.9rem",
          overflow: "hidden",
          wordWrap: "break-word",
          whiteSpace: "normal",
          flexShrink: 1,
          lineHeight: "1.2",
        }}
      >
        <strong>{data.label}</strong> <br />
        <span
          style={{
            fontFamily: "'Nanum Gothic', sans-serif",
            fontSize: "0.7rem",
            color: "#555",
          }}
        >
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

      {data.tooltip && data.showTooltip && (
        <div
          style={{
            fontFamily: "'Nanum Gothic', sans-serif",
            position: "absolute",
            zIndex: 1000,
            bottom: "-140px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(50, 50, 50, 1)",
            color: "#fff",
            padding: "15px 20px",
            borderRadius: "10px",
            fontSize: "20px",
            maxWidth: "800px", // 툴팁 너비 확장
            textAlign: "left",
            boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          <strong>{data.label}</strong>
          <ul style={{ padding: "0", margin: "0", listStyleType: "none" }}>
            {data.학수번호 && <li>학수번호: {data.학수번호}</li>}
            {data.세부전공 && <li>세부전공: {data.세부전공}</li>}
            {data.전공역량 && <li>전공역량: {data.전공역량}</li>}
            {data.개설학과 && <li>개설학과: {data.개설학과}</li>}
            {data.내용 && <li>내용: {data.내용}</li>}
            {data.메모 && <li>메모: {data.메모}</li>}
            {data.syllabus_kr && <li>Syllabus: {data.syllabus_kr}</li>}
          </ul>
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
        fontFamily: "'Nanum Gothic', sans-serif",
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
        fontFamily: "'Nanum Gothic', sans-serif",
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
  customZeroNode: CustomZeroNode,
  yearNode: YearNode,
  semesterNode: SemesterNode,
};
