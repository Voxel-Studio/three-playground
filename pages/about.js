import Head from "next/head";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import titleStyles from "../styles/TitleSection.module.css";
import styles from "../styles/About.module.css";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/dist/SplitText";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const [width, setWidth] = useState(1500);
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
        gsap.utils
            .toArray("#smallImageContainer")
            .forEach((smallScreenImg, i) => {
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
            gsap.from(section, {
                opacity: 0,
                // duration: 2,
                duration: 0.5,
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
                    end: "bottom center ",
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
                    end: "bottom 75%",
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
    });
    return (
        <>
            <Head>
                <title>Insert Productions Limited - About Us.</title>
            </Head>
            <div className={titleStyles.container}>
                <Header />
                <img
                    id="header"
                    className={`${titleStyles.headerImg} ${titleStyles.headerAbout}`}
                    src="/about-bg.jpg"
                    alt=""
                />
                <div className="wrapper" style={{ marginBottom: 80 }}>
                    <h1 className={titleStyles.h1}>About</h1>
                    <div className={titleStyles.line}></div>
                </div>
                <div className={styles.aboutWrapper}>
                    <div className={`${styles.row} section`}>
                        <p className="sectionHeader">
                            We are a leading provider of global technology
                            services in the corporate, entertainment, and
                            special event sectors. With more than 50 years of
                            combined expertise, we specialise in all types of
                            event experiences, from live and broadcast to
                            corporate events, to exhibitions, concerts,
                            livestreams and more.
                        </p>
                    </div>
                    <div
                        className={`${styles.imgRightContainer} ${styles.smallScreenImg} section`}
                        id="smallImageContainer"
                    >
                        <div
                            className={`${styles.imgRight} ${styles.smallImg}`}
                            style={{
                                backgroundImage: `url(/images/3.4-a.jpg)`,
                            }}
                        />
                    </div>
                    <div
                        id="first"
                        className={`${styles.row} ${styles.rowEnd} section`}
                    >
                        <div className={`${styles.info} ${styles.infoFirst}`}>
                            <h3 id="firstSplit">
                                We are the engineers of creative technical
                                production, bringing innovative technical
                                solutions that respond directly to the needs of
                                our clients and their audiences.
                            </h3>
                            <button className={styles.viewButton}>
                                <div className={styles.underlay}></div>
                                <span>Find out more</span>
                            </button>
                        </div>
                        <img
                            className={`${styles.bts} ${styles.bts1}`}
                            // src='/about-bw1.png'
                            src="/images/3.7.jpg"
                            alt=""
                        />
                    </div>
                    <div className={`${styles.row} section`}>
                        <div className={`${styles.fullImg}`}>
                            <div
                                style={{
                                    backgroundImage: `url(/images/3.8.jpg)`,
                                }}
                            />
                        </div>
                    </div>
                    <div
                        id="second"
                        className={`${styles.row} ${styles.rowStart} section`}
                        style={{ marginRight: "10vw" }}
                    >
                        <img
                            className={`${styles.bts} ${styles.bts2}`}
                            src="/images/3.11.jpg"
                            alt=""
                        />
                        <div className={`${styles.info} ${styles.infoFirst}`}>
                            <h3 id="secondSplit">
                                We champion boundary breaking ideas and
                                impossible concepts.
                            </h3>
                        </div>
                    </div>
                    <div
                        className={`${styles.row} ${styles.rowImages} section`}
                    >
                        <div
                            id="smallImageContainer"
                            className={`${styles.fullImg}`}
                        >
                            <div
                                style={{
                                    backgroundImage: `url(/images/3.13.jpg)`,
                                }}
                            />
                        </div>
                        <div
                            id="smallImageContainer"
                            className={`${styles.fullImg}`}
                        >
                            <div
                                style={{
                                    backgroundImage: `url(/images/3.12.jpg)`,
                                }}
                            />
                        </div>
                    </div>
                    <video
                        src="/videos/3.14.mp4"
                        preload="none"
                        poster="/videos/3.14-poster.jpg"
                        loop={true}
                        controls={true}
                        autoplay={false}
                        muted={false}
                        className={styles.video}
                    />
                    <div
                        className={`${styles.row} ${styles.mobileRow} ${styles.smallImageCol} section`}
                    >
                        <div className={`${styles.rowImg}`}>
                            <img
                                className={`${styles.bts} ${styles.bts3}`}
                                src="/images/3.17.jpg"
                                alt=""
                            />
                        </div>
                        <div
                            id="third"
                            className={`${styles.info} ${styles.infoFirst}`}
                        >
                            <h3 id="thirdSplit">
                                What our clients say about us
                            </h3>
                            <button className={styles.viewButton}>
                                <div className={styles.underlay}></div>
                                <span>Testimonials</span>
                            </button>
                        </div>
                    </div>
                    <div className={`${styles.row} section`}>
                        <div
                            className={`${styles.fullImg} ${styles.fullImgMarginLeft}`}
                            id="smallImageContainer"
                        >
                            <div
                                style={{
                                    backgroundImage: `url(/images/3.18.jpg)`,
                                }}
                            />
                        </div>
                    </div>
                    <div
                        id="fourth"
                        className={`${styles.row} ${styles.rowStart} section`}
                    >
                        <div
                            className={`${styles.info} ${styles.infoFirst} ${styles.infoFirstStart}`}
                        >
                            {/* <p>EVENT TECH</p> */}
                            <h3 id="fourthSplit">Work with us</h3>
                            <Link href="/contact">
                                <button className={styles.viewButton}>
                                    <div className={styles.underlay}></div>
                                    <span>Get in touch</span>
                                </button>
                            </Link>
                        </div>
                        <img
                            className={`${styles.bts} ${styles.bts4}`}
                            src="/images/3.21.jpg"
                            alt=""
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
