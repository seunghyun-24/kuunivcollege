import { useEffect, useState } from "react";
import { useEdgesState, useNodesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import styles from "../styles/MainContent.module.css";
import { getLayoutedNodesAndEdges } from "../utils/layoutEngine";
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
          const {
            nodes: layoutedNodes,
            edges: layoutedEdges,
            // columnPositions,
          } = getLayoutedNodesAndEdges(data.nodes, data.edges);

          setNodes(layoutedNodes);
          setEdges(layoutedEdges);
        })
        .catch((error) => {
          console.error("데이터 로드에 실패했습니다.", error);
          setNodes([]);
          setEdges([]);
        })
        .finally(() => setLoading(false));
    }
  }, [department, setEdges, setNodes]);

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
            onBoundsChange={(bounds) => setGraphBounds(bounds)} // 그래프 크기 업데이트
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
