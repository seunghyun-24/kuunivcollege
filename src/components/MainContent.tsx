import React from "react";
import styles from "../styles/MainContent.module.css";

const departmentImages: { [key: string]: string } = {
  컴퓨터학과: require("../assets/college/computer_science.png"),
};

interface MainContentProps {
  department: string | null;
}

const MainContent: React.FC<MainContentProps> = ({ department }) => {
  return (
    <div className={styles.mainContent}>
      {department ? (
        departmentImages[department] ? (
          <img
            src={departmentImages[department]}
            alt={department}
            className={styles.departmentImage}
          />
        ) : (
          <p className={styles.errorText}>아직 업데이트 되지 않았습니다.</p>
        )
      ) : (
        <p className={styles.placeholderText}>학과를 선택해주세요.</p>
      )}
    </div>
  );
};

export default MainContent;
