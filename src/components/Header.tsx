import React from "react";
import styles from "../styles/Header.module.css";
import logo from "../assets/logo.png";

const Header: React.FC = () => (
  <header className={styles.header}>
    <a
      href="https://univ.korea.ac.kr/ge/index.do#none"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={logo} alt="Logo" className={styles.logo} />
    </a>
    <h1 className={styles.title}>전공탐색로드맵 ∙ 전공이수체계도</h1>
  </header>
);

export default Header;
