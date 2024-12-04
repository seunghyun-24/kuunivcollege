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
  </header>
);

export default Header;
