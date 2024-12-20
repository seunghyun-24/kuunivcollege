import React from "react";
import styles from "../styles/SelectionBar.module.css";

const departments: { [key: string]: string[] } = {
  경영대학: ["경영학과"],
  공과대학: [
    "화공생명공학과",
    "신소재공학부",
    "건축사회환경공학부",
    "기계공학부",
    "산업경영공학부",
    "전기전자공학부",
  ],
  국제대학: ["국제학부", "글로벌한국융합학부"],
  문과대학: [
    "국어국문학과",
    "철학과",
    "한국사학과",
    "사학과",
    "사회학과",
    "한문학과",
    "영어영문학과",
    "독어독문학과",
    "불어불문학과",
    "중어중문학과",
    "노어노문학과",
    "일어일문학과",
    "서어서문학과",
    "언어학과",
  ],
  미디어학부: ["미디어학부"],
  보건과학대학: [
    "바의오의공학부",
    "바이오시스템의과학부",
    "보건환경융합과학부",
    "보건정책관리학부",
  ],
  생명과학대학: [
    "생명과학부",
    "생명공학부",
    "식품공학과",
    "환경생태공학부",
    "식품자원경제학과",
  ],
  심리학부: ["심리학부"],
  이과대학: ["수학과", "물리학과", "화학과", "지구환경과학과"],
  정경대학: ["정치외교학과", "경제학과", "통계학과", "행정학과"],
  정보대학: ["컴퓨터학과"],
};

interface SelectionBarProps {
  onDepartmentClick: (department: string) => void;
}

const SelectionBar: React.FC<SelectionBarProps> = ({ onDepartmentClick }) => {
  const handleSubDepartmentClick = (subDepartment: string) => {
    onDepartmentClick(subDepartment);
  };

  return (
    <div className={styles.container}>
      <ul className={styles.menuList}>
        {Object.keys(departments).map((department) => (
          <li key={department} className={styles.menuItem}>
            {department}
            <ul className={styles.subMenuList}>
              {departments[department].map((subDepartment: string) => (
                <li
                  key={subDepartment}
                  className={styles.subMenuItem}
                  onClick={() => handleSubDepartmentClick(subDepartment)}
                >
                  {subDepartment}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectionBar;
