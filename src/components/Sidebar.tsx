import React, { useState, useEffect } from "react";
import styles from "../styles/SideBar.module.css";
import { InfomationBox } from "./InfomationBox";

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
      <p>
        <strong>홈페이지:</strong>{" "}
        <a
          href={`https://${departmentInfo.homepage}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          홈페이지 가기
        </a>
      </p>
      <p>
        <strong>전공지식 체계도:</strong>{" "}
        <a
          href={departmentInfo.roadmap}
          target="_blank"
          rel="noopener noreferrer"
        >
          체계도 보기
        </a>
      </p>
      <div className={styles.infoBoxContainer}>
        <InfomationBox />
      </div>
    </aside>
  );
};

export default SideBar;
