import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/Header.module.css";

const Header = () => {
  const router = useRouter();
  const [showMobile, setShowMobile] = useState(false);
  const isHomepage = router.pathname === "/";
  return (
    <div
      className="wrapper"
      //   className={isHomepage ? "wrapper centred" : "wrapper"}
    >
      <nav
        className={styles.header}
        style={
          isHomepage
            ? {
                position: "fixed",
                top: 0,
                left: 0,
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 100%",
              }
            : null
        }
      >
        <Link href="/">
          <img className={styles.logo} src="/insert-logo-full.png" alt="" />
        </Link>
        <ul className={styles.desktop}>
          <Link href="/">
            <li>
              <div className={styles.hoverScroll} data-hover="HOME">
                HOME
              </div>
            </li>
          </Link>
          <Link href="/about">
            <li>
              <div className={styles.hoverScroll} data-hover="ABOUT">
                ABOUT
              </div>
            </li>
          </Link>
          <Link href="/services">
            <li>
              <div className={styles.hoverScroll} data-hover="SERVICES">
                SERVICES
              </div>
            </li>
          </Link>
          <Link href="/case-studies">
            <li>
              <div className={styles.hoverScroll} data-hover="PORTFOLIO">
                PORTFOLIO
              </div>
            </li>
          </Link>
          <Link href="/news">
            <li>
              <div className={styles.hoverScroll} data-hover="NEWS">
                NEWS
              </div>
            </li>
          </Link>
        </ul>
        <Link href="/contact">
          <button className={styles.buttonContact}>
            <div className={styles.underlay}></div>
            <span>CONTACT</span>
          </button>
        </Link>
        <img
          className={styles.buttonHamburger}
          src="/menu.png"
          alt=""
          onClick={() => setShowMobile(true)}
        />
        <ul
          // className={
          //     showMobile
          //         ? `${styles.mobile} ${styles.mobileShow}`
          //         : `${styles.mobile}`
          // }
          className={`${styles.mobile}`}
          style={{
            transform:
              // router.pathname === "/"
              //   ? showMobile
              //     ? "translateX(-5%)"
              //     : "translateX(-105%)"
              //   :
              showMobile ? "translateX(0)" : "translateX(-100%)",
          }}
        >
          <Link href="/">
            <li>HOME</li>
          </Link>
          <Link href="/about">
            <li>ABOUT</li>
          </Link>
          <Link href="/services">
            <li>SERVICES</li>
          </Link>
          <Link href="/case-studies">
            <li>PORTFOLIO</li>
          </Link>
          <Link href="/news">
            <li>NEWS</li>
          </Link>
          <Link href="/contact">
            <li>CONTACT</li>
          </Link>
          <img
            className={styles.buttonClose}
            src="/close.png"
            alt=""
            onClick={() => setShowMobile(false)}
          />
        </ul>
      </nav>
    </div>
  );
};

export default Header;
