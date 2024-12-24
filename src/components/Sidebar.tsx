import React, { useState, useEffect } from "react";
import styles from "../styles/SideBar.module.css";
import { InformationBox } from "./InformationBox";
import DownloadButton from "./DownloadButton";

interface SideBarProps {
  department: string | null;
}

const SideBar: React.FC<SideBarProps> = ({ department }) => {
  const [loading, setLoading] = useState(false);
  const [departmentInfo, setDepartmentInfo] = useState<any | null>(null);

  useEffect(() => {
    if (department) {
      setLoading(true);
      import(`../assets/collegeInfo/${department}.json`)
        .then((data) => {
          setDepartmentInfo(data);
        })
        .catch((error) => {
          console.error("데이터 로드에 실패했습니다.", error);
          setDepartmentInfo(null);
        })
        .finally(() => setLoading(false));
    } else {
      setDepartmentInfo(null);
    }
  }, [department]);

  if (loading) {
    return <aside className={styles.sidebar}>로딩 중...</aside>;
  }

  if (!departmentInfo) {
    return <aside className={styles.sidebar}>학과를 선택해주세요.</aside>;
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <img
          src={require(`../assets/collegeInfo/collegeLogo/${departmentInfo.logo}`)}
          alt={`${departmentInfo.university} 로고`}
          className={styles.logo}
        />
      </div>
      <h2 className={styles.collegeName}>{departmentInfo.university}</h2>
      <h3 className={styles.departmentName}>{departmentInfo.department}</h3>
      <p className={styles.description}>
        본 로드맵은 학과에서 제공하는 교육정보를 바탕으로 제작되었습니다. <br />
        {/* 이 로드맵은 학과의 <strong>커리큘럼과 강의정보</strong>를 체계적으로
        탐색할 수 있도록 설계되었습니다. 학업 계획을 세우는 데 유용한 자료로
        활용하시기 바랍니다. */}
      </p>
      <p>
        <strong>홈페이지:</strong>{" "}
        <a
          href={`${departmentInfo.homepage}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          홈페이지 가기
        </a>
      </p>
      {departmentInfo.roadmap && (
        <p>
          <strong>전공지식 체계도:</strong>{" "}
          <a
            href={require(`../assets/collegeInfo/roadmap/${departmentInfo.roadmap}`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            체계도 보기
          </a>
        </p>
      )}
      <div className={styles.infoBoxContainer}>
        <InformationBox />
      </div>
      <div className={styles.downloadButtonContainer}>
        <DownloadButton />
      </div>
    </aside>
  );
};

export default SideBar;
