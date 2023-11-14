import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../components/header";
import Footer from "../components/footer";
import titleStyles from "../styles/TitleSection.module.css";
import styles from "../styles/Services.module.css";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";
gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const router = useRouter();
  const cardRef = useRef(null);
  useEffect(() => {
    const headerImg = document.querySelector(`#header`);
    headerImg.style.backgroundPosition = `0% 0px`;
    gsap.set(headerImg, { filter: "blur(0px) brightness(0.6)" });
    gsap.to(headerImg, {
      backgroundPosition: `0% ${window.innerHeight / 2}px`,
      scale: 1.2,
      filter: "blur(10px) brightness(0)",
      ease: "none",
      scrollTrigger: {
        trigger: headerImg,
        start: "top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.utils.toArray("#smallImageContainer").forEach((smallScreenImg, i) => {
      const smallImg = smallScreenImg.querySelector(`div`);
      if (window.innerWidth >= 1350) {
        smallImg.style.backgroundPosition = `50% ${
          -window.innerHeight / 12 - 150
        }px`;
        gsap.to(smallImg, {
          backgroundPosition: `50% ${window.innerHeight / 12}px`,
          ease: "none",
          scrollTrigger: {
            trigger: smallScreenImg,
            scrub: true,
          },
        });
      }
    });
    gsap.utils.toArray(".section").forEach((section, i) => {
      console.log(section);
      gsap.from(section, {
        opacity: 0,
        duration: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: section,
        },
      });
    });
    // const cards = cardRef.current.children;
    // gsap.fromTo(
    //     cards,
    //     // { opacity: 0, y: -20 },
    //     { opacity: 0 },
    //     {
    //         opacity: 1,
    //         y: 0,
    //         stagger: 0.1,
    //         duration: 0.1,
    //         scrollTrigger: {
    //             trigger: '#grid',
    //             start: 'top bottom',
    //             end: 'top center',
    //             // toggleActions: "play none none reverse",
    //             // scrub: 'true',
    //         },
    //     }
    // );
    const tlFirstInfo = gsap.timeline(),
      splitFirstInfo = new SplitText("#firstSplit", {
        type: "words,chars",
      }),
      chars = splitFirstInfo.chars;
    tlFirstInfo.from(
      chars,
      {
        duration: 0.8,
        opacity: 0,
        y: 10,
        ease: "circ.out",
        stagger: 0.02,
        scrollTrigger: {
          trigger: "#first",
          start: "top 75%",
          end: "bottom center",
          scrub: 1,
        },
      },
      "+=0"
    );
    const tlSecondInfo = gsap.timeline(),
      splitSecondInfo = new SplitText("#secondSplit", {
        type: "words,chars",
      }),
      charsSecond = splitSecondInfo.chars;
    tlSecondInfo.from(
      charsSecond,
      {
        duration: 0.8,
        opacity: 0,
        y: 10,
        ease: "circ.out",
        stagger: 0.02,
        scrollTrigger: {
          trigger: "#second",
          start: "top 75%",
          end: "bottom center",
          scrub: 1,
        },
      },
      "+=0"
    );
    const tlThirdInfo = gsap.timeline(),
      splitThirdInfo = new SplitText("#thirdSplit", {
        type: "words,chars",
      }),
      charsThird = splitThirdInfo.chars;
    tlThirdInfo.from(
      charsThird,
      {
        duration: 0.8,
        opacity: 0,
        y: 10,
        ease: "circ.out",
        stagger: 0.02,
        scrollTrigger: {
          trigger: "#third",
          start: "top 75%",
          end: "bottom center",
          scrub: 1,
        },
      },
      "+=0"
    );
    const tlFourthInfo = gsap.timeline(),
      splitFourthInfo = new SplitText("#fourthSplit", {
        type: "words,chars",
      }),
      charsFourth = splitFourthInfo.chars;
    tlFourthInfo.from(
      charsFourth,
      {
        duration: 0.8,
        opacity: 0,
        y: 10,
        ease: "circ.out",
        stagger: 0.02,
        scrollTrigger: {
          trigger: "#fourth",
          start: "top 75%",
          end: "bottom center",
          scrub: 1,
        },
      },
      "+=0"
    );
    const tlFifthInfo = gsap.timeline(),
      splitFifthInfo = new SplitText("#fifthSplit", {
        type: "words,chars",
      }),
      charsFifth = splitFifthInfo.chars;
    tlFifthInfo.from(
      charsFifth,
      {
        duration: 0.8,
        opacity: 0,
        y: 10,
        ease: "circ.out",
        stagger: 0.02,
        scrollTrigger: {
          trigger: "#fifth",
          start: "top 75%",
          end: "bottom center",
          scrub: 1,
        },
      },
      "+=0"
    );
  });
  return (
    <>
      <Head>
        <title>Insert Productions Limited - Solutions and Services.</title>
      </Head>
      <div className={titleStyles.container}>
        <Header />
        <img
          id="header"
          className={`${titleStyles.headerImg} ${titleStyles.headerAbout}`}
          src="/services-header.jpg"
          alt=""
        />
        <div className="wrapper" style={{ marginBottom: 80 }}>
          <h1 className={titleStyles.h1}>Solutions and services</h1>
          <div className={titleStyles.line}></div>
        </div>
        <div className={styles.aboutWrapper}>
          <div className={`${styles.row} section`}>
            <div className={styles.grid} ref={cardRef}>
              <div
                className={styles.card}
                onClick={() => router.push("/services/live-events")}
              >
                <img src="/about5.jpeg" alt="" />
                <h3>Live Events</h3>
                <ul>
                  <li>Conference</li>
                  <li>Exhibition</li>
                  <li>Award Shows</li>
                  <li>Concerts & Live Performance</li>
                  <li>Broadcast & Film</li>
                  <li>Outdoor Events</li>
                  <li>Sporting Events</li>
                </ul>
                <div className={styles.cardLine} />
                <div className={styles.cardLineHover} />
              </div>
              <div
                className={styles.card}
                onClick={() => router.push("/services/virtual-events")}
              >
                <img src="/services-card2.jpg" alt="" />
                <h3>Virtual Events</h3>
                <ul>
                  <li>Remote</li>
                  <li>Studio</li>
                  <li>Green Screen</li>
                  <li>Extended Reality (xR)</li>
                </ul>
                <div className={styles.cardLine} />
                <div className={styles.cardLineHover} />
              </div>
              <div
                className={styles.card}
                onClick={() => router.push("/services/digital")}
              >
                <img src="/services-card3.jpeg" alt="" />
                <h3>Digital</h3>
                <ul>
                  <li>Software Applications</li>
                  <li>Interactive Applications</li>
                  <li>UI & XI Design</li>
                  <li>Graphic Design</li>
                  <li>3D Visualisation</li>
                  <li>Generative Content</li>
                  <li>AR / xR / VR</li>
                </ul>
                <div className={styles.cardLine} />
                <div className={styles.cardLineHover} />
              </div>
              <div
                className={styles.card}
                onClick={() => router.push("/services/experiential")}
              >
                <img src="/services-card4.jpeg" alt="" />
                <h3>Experiential</h3>
                <ul>
                  <li>Retail</li>
                  <li>Product Launch</li>
                  <li>Consumer Engagement</li>
                  <li>Pop Up</li>
                  <li>Fan Zone</li>
                  <li>Festival</li>
                </ul>
                <div className={styles.cardLine} />
                <div className={styles.cardLineHover} />
              </div>
              <div
                className={styles.card}
                onClick={() => router.push("/services/av-hire")}
              >
                <img src="/services-card5.jpeg" alt="" />
                <h3>AV Hire</h3>
                <ul>
                  <li>Video</li>
                  <li>Lighting</li>
                  <li>Audio</li>
                  <li>Rigging</li>
                  <li>Staging</li>
                </ul>
                <div className={styles.cardLine} />
                <div className={styles.cardLineHover} />
              </div>
            </div>
          </div>
          <div
            className={`${styles.contentLeftContainer} section`}
            style={{ marginBottom: 40 }}
            id="smallImageContainer"
          >
            <div id="first" className={styles.contentLeft}>
              <div className={styles.content}>
                <h2>Live Events</h2>
                <div className={styles.sectionLine} />
                <button className={styles.viewButton}>
                  <div className={styles.underlay}></div>
                  <span>VIEW MORE</span>
                </button>
              </div>
              <p id="firstSplit">
                Vivamus ac venenatis enim. In et iaculis nisi. Nulla posuere
                aliquam bibendum. Cras blandit volutpat euismod. Nullam nunc
                augue, blandit convallis felis
              </p>
            </div>
          </div>
          <div
            className={`${styles.imgLeftContainer} ${styles.smallScreenImg} section`}
            id="smallImageContainer"
          >
            <div
              className={`${styles.imgLeft} ${styles.smallImg}`}
              style={{ backgroundImage: `url(/services1.jpg)` }}
            />
          </div>
          <div
            className={`${styles.contentLeftContainer} ${styles.noGrey} section`}
            style={{ marginBottom: 40 }}
            id="smallImageContainer"
          >
            <div className={styles.block}></div>
            <div id="second" className={styles.contentLeft}>
              <div className={styles.content}>
                <h2>Virtual Events</h2>
                <div className={styles.sectionLine} />
                <button className={styles.viewButton}>
                  <div className={styles.underlay}></div>
                  <span>VIEW MORE</span>
                </button>
              </div>
              <p id="secondSplit">
                Vivamus ac venenatis enim. In et iaculis nisi. Nulla posuere
                aliquam bibendum. Cras blandit volutpat euismod. Nullam nunc
                augue, blandit convallis felis
              </p>
            </div>
          </div>

          <div
            className={`${styles.imgRightContainer} ${styles.smallScreenImg} section`}
            id="smallImageContainer"
          >
            <div
              className={`${styles.imgRight} ${styles.smallImg}`}
              style={{
                backgroundImage: `url(/services2.jpg)`,
              }}
            >
              <div className={`${styles.contentFull} section`}>
                <div>
                  <h1>Praesent urna nisl convallis</h1>
                  <ul>
                    <li>In a enim non libero commodo dapibus. Curabitur</li>
                    <li>
                      Ullamcorper, orci ut ultricies imperdiet, tellus libero
                    </li>
                    <li>Malesuada risus, non commodo lectus eros vel risus</li>
                    <li>Interdum et malesuada fames ac ante ipsum</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${styles.contentLeftContainer} section`}
            style={{ marginBottom: 40 }}
            id="smallImageContainer"
          >
            <div id="third" className={styles.contentLeft}>
              <div className={styles.content}>
                <h2>Digital</h2>
                <div className={styles.sectionLine} />
                <button className={styles.viewButton}>
                  <div className={styles.underlay}></div>
                  <span>VIEW MORE</span>
                </button>
              </div>
              <p id="thirdSplit">
                Vivamus ac venenatis enim. In et iaculis nisi. Nulla posuere
                aliquam bibendum. Cras blandit volutpat euismod. Nullam nunc
                augue, blandit convallis felis
              </p>
            </div>
          </div>
          <div
            className={`${styles.imgLeftContainer} ${styles.smallScreenImg} section`}
            id="smallImageContainer"
          >
            <div
              className={`${styles.imgLeft} ${styles.smallImg}`}
              style={{
                backgroundImage: `url(/services-card3.jpeg)`,
              }}
            />
          </div>
          <div
            className={`${styles.contentLeftContainer} ${styles.noGrey} section`}
            style={{ marginBottom: 40 }}
            id="smallImageContainer"
          >
            <div className={styles.block}></div>
            <div id="fourth" className={styles.contentLeft}>
              <div className={styles.content}>
                <h2>Experiential</h2>
                <div className={styles.sectionLine} />
                <button className={styles.viewButton}>
                  <div className={styles.underlay}></div>
                  <span>VIEW MORE</span>
                </button>
              </div>
              <p id="fourthSplit">
                Vivamus ac venenatis enim. In et iaculis nisi. Nulla posuere
                aliquam bibendum. Cras blandit volutpat euismod. Nullam nunc
                augue, blandit convallis felis
              </p>
            </div>
          </div>
          <div
            className={`${styles.imgRightContainer} ${styles.smallScreenImg} section`}
            id="smallImageContainer"
          >
            <div
              className={`${styles.imgRight} ${styles.smallImg}`}
              style={{
                backgroundImage: `url(/services4.jpg)`,
              }}
            />
          </div>
          <div
            className={`${styles.contentLeftContainer} section`}
            style={{ marginBottom: 40 }}
            id="smallImageContainer"
          >
            <div id="fifth" className={styles.contentLeft}>
              <div className={styles.content}>
                <h2>AV Hire</h2>
                <div className={styles.sectionLine} />
                <button className={styles.viewButton}>
                  <div className={styles.underlay}></div>
                  <span>VIEW MORE</span>
                </button>
              </div>
              <p id="fifthSplit">
                Vivamus ac venenatis enim. In et iaculis nisi. Nulla posuere
                aliquam bibendum. Cras blandit volutpat euismod. Nullam nunc
                augue, blandit convallis felis
              </p>
            </div>
          </div>
          <div
            className={`${styles.imgLeftContainer} ${styles.smallScreenImg} section`}
            id="smallImageContainer"
          >
            <div
              className={`${styles.imgLeft} ${styles.smallImg}`}
              style={{
                backgroundImage: `url(/services5.jpg)`,
              }}
            />
          </div>
        </div>

        <div className="wrapper">
          <div
            className="backToTop"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <p>BACK TO TOP</p>
            <div />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
