import { useState, useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";
import Landing from "../components/landing";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [showScrollDown, setShowScrollDown] = useState(true);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollDown(false);
    };
    document.addEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    setWidth(window.innerWidth);
    console.log(width);
  });
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <Landing />
        <div
          className={styles.scrollDown}
          style={{ opacity: showScrollDown ? 1 : 0 }}
        />
      </div>
      <div className={styles.homeContainer}>
        <div className={styles.homeWrapper}>
          <div />
        </div>
      </div>
    </div>
  );
}
