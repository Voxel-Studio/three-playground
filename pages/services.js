import Head from "next/head";
import Link from "next/link";
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
                <title>Insert Productions Limited - Services.</title>
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
                    <h1 className={titleStyles.h1}>Services</h1>
                    <div className={titleStyles.line}></div>
                </div>
                <div className={styles.aboutWrapper}>
                    <div className={`${styles.row} section`}>
                        <div className={styles.grid} ref={cardRef}>
                            <Link href="/services/live-events">
                                <div className={styles.card}>
                                    <img src="/images/2.jpg" alt="" />
                                    <h3>Live</h3>
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
                            </Link>
                            <Link href="/services/virtual-events">
                                <div className={styles.card}>
                                    <img src="/images/2.1.jpg" alt="" />
                                    <h3>Virtual</h3>
                                    <ul>
                                        <li>Remote</li>
                                        <li>Studio</li>
                                        <li>Green Screen</li>
                                        <li>Extended Reality (xR)</li>
                                    </ul>
                                    <div className={styles.cardLine} />
                                    <div className={styles.cardLineHover} />
                                </div>
                            </Link>
                            <Link href="/services/digital">
                                <div className={styles.card}>
                                    <img src="/images/2.2.jpg" alt="" />
                                    <h3>Digital</h3>
                                    <ul>
                                        <li>Permanent Installations</li>
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
                            </Link>
                            <Link href="/services/experiential">
                                <div className={styles.card}>
                                    <img src="/images/2.3.jpg" alt="" />
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
                            </Link>
                            <Link href="/services/av-hire">
                                <div className={styles.card}>
                                    <img src="/images/2.4.jpg" alt="" />
                                    <h3>Hire</h3>
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
                            </Link>
                        </div>
                    </div>
                    <div
                        className={`${styles.contentLeftContainer} section`}
                        style={{ marginBottom: 40 }}
                        id="smallImageContainer"
                    >
                        <div id="first" className={styles.contentLeft}>
                            <div className={styles.content}>
                                <h2>Live</h2>
                                <div className={styles.sectionLine} />
                                <Link href="/services/live-events">
                                    <button className={styles.viewButton}>
                                        <div className={styles.underlay}></div>
                                        <span>See our Live Events</span>
                                    </button>
                                </Link>
                            </div>
                            <p id="firstSplit">
                                Captivate Your Audience: Transforming Moments
                                into Unforgettable Live Event Experiences!
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
                                <h2>Virtual</h2>
                                <div className={styles.sectionLine} />
                                <Link href="/services/virtual-events">
                                    <button className={styles.viewButton}>
                                        <div className={styles.underlay}></div>
                                        <span>See our Virtual Events</span>
                                    </button>
                                </Link>
                            </div>
                            <p id="secondSplit">
                                These virtual gatherings break down geographical
                                barriers, allowing you to reach a global
                                audience with ease.
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
                                    <h1 style={{ fontSize: "3rem" }}>
                                        Unleash the Power of Connection
                                    </h1>
                                    <ul>
                                        <li>Unleash the Power of Connection</li>
                                        <li>Elevate Your Strategy</li>
                                        <li>
                                            Captivate the audience, and lead the
                                            way with the dynamic impact of Our
                                            Virtual Events
                                        </li>
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
                                <Link href="/services/digital">
                                    <button className={styles.viewButton}>
                                        <div className={styles.underlay}></div>
                                        <span>See our Digital Events</span>
                                    </button>
                                </Link>
                            </div>
                            <p id="thirdSplit">
                                In the ever-evolving landscape of modern
                                business and engagement, digital events have
                                become not only relevant but crucial to success.
                                As we navigate a world that increasingly values
                                connectivity and accessibility, the significance
                                of digital events cannot be overstated.
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
                                backgroundImage: `url(/images/4.15.jpg)`,
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
                                <Link href="/services/experiential">
                                    <button className={styles.viewButton}>
                                        <div className={styles.underlay}></div>
                                        <span>See our Experiential Events</span>
                                    </button>
                                </Link>
                            </div>
                            <p id="fourthSplit">
                                Step into a realm of unparalleled engagement and
                                immersive moments with our experiential events.
                                We redefine traditional gatherings, offering not
                                just events but unforgettable experiences that
                                leave lasting impressions.
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
                                backgroundImage: `url(/images/4.19.jpg)`,
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
                                <h2>Hire</h2>
                                <div className={styles.sectionLine} />
                                <button className={styles.viewButton}>
                                    <div className={styles.underlay}></div>
                                    <span>
                                        Get in touch to find out more about our
                                        hire products
                                    </span>
                                </button>
                            </div>
                            <p id="fifthSplit">
                                Explore our extensive AV rental services for
                                your next event.
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
                                // backgroundImage: `url(/services5.jpg)`,
                                backgroundImage: `url(/images/4.23.jpg)`,
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
