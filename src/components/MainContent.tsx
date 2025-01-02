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
    setNodes([]);
    setEdges([]);
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
  }, [department, setNodes, setEdges]);

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
        <div className={styles.container}>
          <div className={styles.content}>
            <p className={styles.introText}>
              고려대학교 학부대학에서 제공하는 전공탐색로드맵과
              전공교육체계도입니다. 고려대학교내 43개 학부 또는 학과나
              교육과정편람에서 제공하는 전공 과목의 권장이수학기 및 필수/권장
              선이수관계 등을 한눈에 볼 수 있습니다. 대학과 학과를 선택하면
              학과나 교육과정편람에서 제공하는 전공교육체계도를 탐색가능하고,
              해당 체계도는 그래픽이미지로 다운로드 가능합니다. 이 자료는
              참고용으로만 사용하고, 보다 자세한 사항은 학부대학
              전공디자인센터나 각학부/학과로 문의해 주세요. <br />
            </p>
            <ul className={styles.resourcesList}>
              <li>
                <a
                  href="https://univ.korea.ac.kr/ge/index.do"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  학부대학 홈페이지
                </a>
                <span className={styles.separator}>|</span>
                <a
                  href="https://registrar.korea.ac.kr/eduinfo/index.do"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  고려대학교 교육정보
                </a>
                <span className={styles.separator}>|</span>
                <a
                  href="https://ibook.korea.ac.kr/Viewer/HF1ALNVYXCOW?_ga=2.73349011.1272927809.1734914653-1048059663.1731638360"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  2024학년도 교육과정편람
                </a>
                <span className={styles.separator}>|</span>
                <a
                  href="https://ibook.korea.ac.kr/Viewer/IZLUFTDAVIED?_ga=2.79141652.1272927809.1734914653-1048059663.1731638360"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  2024학년도 개설학과별 교수요목 (서울)
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;
