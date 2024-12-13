import { useEffect, useState } from "react";
import { useEdgesState, useNodesState } from "react-flow-renderer";
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

          console.log("Converted nodes:", layoutedNodes); // 디버깅
          console.log("Converted edges:", layoutedEdges); // 디버깅

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
  }, [department]);

  return (
    <div className={styles.mainContent}>
      {department ? (
        loading ? (
          <p>로딩 중...</p>
        ) : nodes.length > 0 ? (
          <GraphRenderer nodes={nodes} edges={edges} />
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
