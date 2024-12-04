import React from "react";
import styles from "../styles/Footer.module.css";
import logo from "../assets/black2positive.gif";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <img src={logo} alt="Korea University Logo" className={styles.logo} />
        <div className={styles.info}>
          <p>
            [02841] 서울시 성북구 안암로 145 고려대학교 우당교양관 5층 501호
            학부대학
          </p>
          <p>Tel: 02-3290-1591~9</p>
          <p>FAX: 02-921-0323</p>
          <hr className={styles.divider} />
          <p>개인정보처리방침</p>
          <p>Copyright © Korea University. All Rights Reserved</p>
        </div>
      </div>
      <p className={styles.secret}>Contributed by seunghyun-24</p>
    </footer>
  );
};

export default Footer;
