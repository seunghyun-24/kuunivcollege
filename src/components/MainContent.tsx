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
              안녕하세요. <br />
              <strong>고려대학교 학부대학 전공탐색로드맵입니다.</strong>
            </p>
            <ul className={styles.infoList}>
              <li>학과를 선택하여, 개설강의와 로드맵을 탐색해보세요.</li>
              <li>
                학과별 홈페이지 및 교육정보를 확인하고, 그래픽 뷰를 통해
                커리큘럼을 자유롭게 구상할 수 있습니다.
              </li>
              <li>
                각 학과별 강의정보에 커서를 올려, 해당 과목의 세부정보와
                교수요목을 확인할 수 있습니다.
              </li>
            </ul>
            <p className={styles.resourcesHeader}>
              아래는 여러분의 전공 탐색에 도움을 드릴 수 있는 사이트 모음입니다.
            </p>
            <ul className={styles.resourcesList}>
              <li>
                🐯{" "}
                <a
                  href="https://univ.korea.ac.kr/ge/index.do"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  학부대학 홈페이지
                </a>
              </li>
              <li>
                🏫{" "}
                <a
                  href="https://registrar.korea.ac.kr/eduinfo/index.do"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  고려대학교 교육정보
                </a>
              </li>
              <li>
                📖{" "}
                <a
                  href="https://ibook.korea.ac.kr/Viewer/HF1ALNVYXCOW?_ga=2.73349011.1272927809.1734914653-1048059663.1731638360"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  2024학년도 교육과정편람
                </a>
              </li>
              <li>
                🖌{" "}
                <a
                  href="https://ibook.korea.ac.kr/Viewer/IZLUFTDAVIED?_ga=2.79141652.1272927809.1734914653-1048059663.1731638360"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  2024학년도 개설학과별 교수요목 (서울)
                </a>
              </li>
            </ul>
            <p className={styles.footerText}>
              made by 박승현(컴과 21), 신종현(수교 19), 김규탁(생공 19)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;
