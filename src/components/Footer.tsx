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
            학부대학 Tel: 02-3290-1591~9 &nbsp;&nbsp;&nbsp;&nbsp; FAX:
            02-921-0323
          </p>
          <hr className={styles.divider} />
          <p>
            개인정보처리방침 &nbsp;&nbsp;&nbsp;&nbsp; Copyright © Korea
            University. All Rights Reserved
          </p>
          <div className={styles.Contributed}>
            <p>
              본 페이지는 학부대학 근로장학생 박승현(웹페이지
              디자인/제작/데이터표준화), 신종현(데이터표준화),
              김규탁(데이터표준화)에 의해 오픈소스로 제작되었습니다.
            </p>
          </div>
        </div>
      </div>
      <span
        className={styles.secret}
        onClick={() => window.open("https://github.com/seunghyun-24", "_blank")}
      >
        Contributed by seunghyun-24
      </span>
    </footer>
  );
};

export default Footer;
