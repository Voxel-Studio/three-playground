import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../components/header";
import Footer from "../components/footer";
import titleStyles from "../styles/TitleSection.module.css";
import styles from "../styles/Services.module.css";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";
gsap.registerPlugin(ScrollTrigger);

export default function Services() {
    const router = useRouter();
    useEffect(() => {
        gsap.utils
            .toArray("#smallImageContainer")
            .forEach((smallScreenImg, i) => {
                const smallImg = smallScreenImg.querySelector(`div`);
                console.log(smallImg);
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
            });
        gsap.utils.toArray(".section").forEach((section, i) => {
            console.log(section);
            gsap.from(section, {
                opacity: 0,
                duration: 2,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                },
            });
        });
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
                <title>
                    Insert Productions Limited - Solutions and Services.
                </title>
            </Head>
            <div className={titleStyles.container}>
                <Header />
                <img
                    className={`${titleStyles.headerImg} ${titleStyles.headerAbout}`}
                    src="/services-header.png"
                    alt=""
                />
                <div className="wrapper" style={{ marginBottom: 80 }}>
                    <h1 className={titleStyles.h1}>Solutions and services</h1>
                    <div className={titleStyles.line}></div>
                </div>
                <div className={styles.aboutWrapper}>
                    <div className={`${styles.row} section`}>
                        <div className={styles.grid}>
                            <div
                                className={styles.card}
                                onClick={() =>
                                    router.push("/services/live-events")
                                }
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
                                onClick={() =>
                                    router.push("/services/virtual-events")
                                }
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
                                onClick={() =>
                                    router.push("/services/experiential")
                                }
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
                    <div
                        className={`${styles.contentLeftContainer} section`}
                        style={{ marginBottom: 40 }}
                        // id='smallImageContainer'
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
                                Vivamus ac venenatis enim. In et iaculis nisi.
                                Nulla posuere aliquam bibendum. Cras blandit
                                volutpat euismod. Nullam nunc augue, blandit
                                convallis felis
                            </p>
                        </div>
                    </div>
                    <div
                        className={`${styles.imgLeftContainer} ${styles.smallScreenImg} section`}
                        id="smallImageContainer"
                    >
                        <div
                            className={`${styles.imgLeft} ${styles.smallImg}`}
                            style={{ backgroundImage: `url(/services1.png)` }}
                        />
                    </div>
                    <div
                        className={`${styles.contentLeftContainer} ${styles.noGrey} section`}
                        style={{ marginBottom: 40 }}
                        // id='smallImageContainer'
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
                                Vivamus ac venenatis enim. In et iaculis nisi.
                                Nulla posuere aliquam bibendum. Cras blandit
                                volutpat euismod. Nullam nunc augue, blandit
                                convallis felis
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
                                backgroundImage: `url(/services2.png)`,
                            }}
                        />
                    </div>
                    <div
                        className={`${styles.contentLeftContainer} section`}
                        style={{ marginBottom: 40 }}
                        // id='smallImageContainer'
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
                                Vivamus ac venenatis enim. In et iaculis nisi.
                                Nulla posuere aliquam bibendum. Cras blandit
                                volutpat euismod. Nullam nunc augue, blandit
                                convallis felis
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
                        // id='smallImageContainer'
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
                                Vivamus ac venenatis enim. In et iaculis nisi.
                                Nulla posuere aliquam bibendum. Cras blandit
                                volutpat euismod. Nullam nunc augue, blandit
                                convallis felis
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
                                backgroundImage: `url(/services4.png)`,
                            }}
                        />
                    </div>
                    <div
                        className={`${styles.contentLeftContainer} section`}
                        style={{ marginBottom: 40 }}
                        // id='smallImageContainer'
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
                                Vivamus ac venenatis enim. In et iaculis nisi.
                                Nulla posuere aliquam bibendum. Cras blandit
                                volutpat euismod. Nullam nunc augue, blandit
                                convallis felis
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
                                backgroundImage: `url(/services5.png)`,
                            }}
                        />
                    </div>
                </div>
                <div className="wrapper">
                    <div
                        className="backToTop"
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        }
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
