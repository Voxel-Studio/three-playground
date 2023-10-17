import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../../components/header";
import Footer from "../../components/footer";
import titleStyles from "../../styles/TitleSection.module.css";
import styles from "../../styles/ServiceSingle.module.css";
import Carousel from "../../components/carousel";
import { projectItems } from "../../utils/helper";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function LiveEvents() {
  useEffect(() => {
    const heroImg = document.querySelector(`.${styles.heroImg}`);
    heroImg.style.backgroundPosition = `0% 0px`;
    gsap.set(heroImg, { filter: "blur(0px) brightness(0.3)" });
    gsap.to(heroImg, {
      backgroundPosition: `0% ${window.innerHeight / 2}px`,
      scale: 1.2,
      filter: "blur(10px) brightness(0)",
      ease: "none",
      scrollTrigger: {
        trigger: heroImg,
        start: "top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.utils.toArray("#smallImageContainer").forEach((smallScreenImg, i) => {
      const smallImg = smallScreenImg.querySelector(`div`);
      // gsap.set(smallImg, { filter: 'blur(2px) brightness(0)' });
      if (window.innerWidth >= 1350) {
        smallImg.style.backgroundPosition = `50% ${
          -window.innerHeight / 12 - 150
        }px`;
        // smallImg.style.height = '150%';
        gsap.to(smallImg, {
          backgroundPosition: `50% ${window.innerHeight / 12}px`,
          ease: "none",
          // filter: 'blur(0px) brightness(1)',
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
        duration: 2,
        // ease: 'power4.out',
        ease: "none",
        scrollTrigger: {
          trigger: section,
        },
      });
    });
  });
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Insert Productions Limited - Live Events.</title>
      </Head>
      <div className={styles.fullscreenHero}>
        <div
          className={styles.heroImg}
          style={{ backgroundImage: "url(/about5.jpeg)" }}
        />
      </div>
      <div className={titleStyles.container}>
        <Header />
        <div className="wrapper" style={{ minHeight: 859 }}>
          <h1 className={titleStyles.h1} id="title">
            Live Events
          </h1>
          <div className={titleStyles.line}></div>
        </div>
        <div className={styles.projectItemWrapper}>
          <div className={`${styles.row} section`}>
            <p className="sectionHeader">
              In a enim non libero commodo dapibus. Curabitur ullamcorper, orci
              ut ultricies imperdiet, tellus libero malesuada risus, non commodo
              lectus eros vel risus. Interdum et malesuada fames ac ante ipsum
              primis in faucibus. Suspendisse sit amet bibendum lectus, blandit
              ultrices nunc. Nunc laoreet purus lacus, vitae pellentesque enim
              semper vitae.
            </p>
          </div>
          <div
            className={`${styles.imgRightContainer} ${styles.smallScreenImg} section`}
            id="smallImageContainer"
          >
            <div
              className={`${styles.imgRight} ${styles.smallImg}`}
              style={{ backgroundImage: `url(/adidas-1.jpeg)` }}
            />
          </div>
          <div className={`${styles.row} section`}>
            <img
              className={`${styles.bts} ${styles.bts1}`}
              src="/live-events-bw1.png"
              alt=""
            />
            <div className={`${styles.info} ${styles.infoFirst}`}>
              <p>EVENT TECH</p>
              <h3>Praesent urna nisl convallis aliquam</h3>
            </div>
            <div className={styles.rowImg}>
              <img src="/adidas-3-new.jpg" alt="" />
              {/* <div className={styles.imgOverlayRight}></div> */}
            </div>
          </div>
          <div className={styles.carousel}>
            <Carousel />
          </div>

          <div className={`${styles.row} ${styles.rowLast} section`}>
            <div className={styles.rowImg}>
              <img src="/news1-new.jpg" alt="" />
              {/* <div className={styles.imgOverlayLeft}></div> */}
            </div>

            <div className={styles.info}>
              <p>EVENT TECH</p>
              <h3>Praesent urna nisl convallis aliquam</h3>
            </div>
            <img
              className={`${styles.bts} ${styles.bts2}`}
              src="/live-events-bw2.png"
              alt=""
            />
          </div>
          <div className={`${styles.row} section`}>
            <div className={styles.grid}>
              <div
                className={styles.card}
                onClick={() => router.push("/services/live-events")}
                style={{
                  opacity:
                    router.pathname === "/services/live-events" ? 0.4 : 1,
                }}
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
              </div>
              <div
                className={styles.card}
                onClick={() => router.push("/services/virtual-events")}
                style={{
                  opacity:
                    router.pathname === "/services/virtual-events" ? 0.4 : 1,
                }}
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
              </div>
              <div
                className={styles.card}
                onClick={() => router.push("/services/digital")}
                style={{
                  opacity: router.pathname === "/services/digital" ? 0.4 : 1,
                }}
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
              </div>
              <div
                className={styles.card}
                onClick={() => router.push("/services/experiential")}
                style={{
                  opacity:
                    router.pathname === "/services/experiential" ? 0.4 : 1,
                }}
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
              </div>
              <div
                className={styles.card}
                onClick={() => router.push("/services/av-hire")}
                style={{
                  opacity: router.pathname === "/services/av-hire" ? 0.4 : 1,
                }}
              >
                <img src="/services-card5.jpeg" alt="" />
                <h3>AV Hire</h3>
                <ul>
                  <li>Video</li>
                  <li>Lighting</li>
                  <li>Audio</li>
                </ul>
                <div className={styles.cardLine} />
              </div>
            </div>
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
