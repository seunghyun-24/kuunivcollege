import { useEffect, useState } from "react";
import { Position, useEdgesState, useNodesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import styles from "../styles/MainContent.module.css";
import GraphRenderer from "./GraphRenderer";

interface MainContentProps {
  department: string | null;
}

const MainContent: React.FC<MainContentProps> = ({ department }) => {
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [loading, setLoading] = useState(false);
  const [graphBounds, setGraphBounds] = useState({ width: 1000, height: 500 }); // 기본 높이와 너비

  useEffect(() => {
    if (department) {
      setLoading(true);
      import(`../assets/college/${department}.json`)
        .then((data) => {
          setNodes(
            data.nodes.map((node: any) => ({
              ...node,
              position: node.position || { x: 0, y: 0 },
              sourcePosition: Position.Right,
              targetPosition: Position.Left,
            }))
          );
          setEdges(data.edges);
        })
        .catch((error) => {
          console.error("데이터 로드에 실패했습니다.", error);
          setNodes([]);
          setEdges([]);
        })
        .finally(() => setLoading(false));
    }
  }, [department]);

  const handleBoundsChange = (bounds: { width: number; height: number }) => {
    if (
      bounds.width !== graphBounds.width ||
      bounds.height !== graphBounds.height
    ) {
      setGraphBounds(bounds);
    }
  };

  return (
    <div
      className={styles.mainContent}
      style={{
        width: `${graphBounds.width}px`,
        height: `${graphBounds.height}px`,
        overflow: "auto",
      }}
    >
      {department ? (
        loading ? (
          <p>로딩 중...</p>
        ) : nodes.length > 0 ? (
          <GraphRenderer
            nodes={nodes}
            edges={edges}
            onBoundsChange={handleBoundsChange}
          />
        ) : (
          // <AutoLayoutFlow />
          <p className={styles.errorText}>
            자료를 찾을 수 없습니다. 관리자에게 문의해주세요.
          </p>
        )
      ) : (
        <p className={styles.placeholderText}>학과를 선택해주세요.</p>
      )}
    </div>
  );
};

export default MainContent;
