import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import Footer from "../components/footer";
import Landing from "../components/landing";
// import Landing from '../components/archived/landing';
import Pyramid from "../components/pyramid";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Home() {
    const router = useRouter();
    const [showScrollDown, setShowScrollDown] = useState(true);
    const logoRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        const logos = logoRef.current.children;
        const cards = cardRef.current.children;
        const handleScroll = () => {
            setShowScrollDown(false);
        };
        document.addEventListener("scroll", handleScroll);
        gsap.utils
            .toArray("#smallImageContainer")
            .forEach((smallScreenImg, i) => {
                const smallImg = smallScreenImg.querySelector(`div`);
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
        // gsap.utils.toArray('.section').forEach((section, i) => {
        //     gsap.from(section, {
        //         // opacity: 0,
        //         skewX: 2,
        //         duration: 2,
        //         ease: 'circ.out',
        //         scrollTrigger: {
        //             trigger: section,
        //         },
        //     });
        // });
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
                    //markers:true,
                    start: "top 75%",
                    end: "bottom center",
                    scrub: 1,
                },
                //,   onComplete: () => {splitFirstInfo.revert()}
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
                    //markers:true,
                    start: "top 75%",
                    end: "bottom center",
                    scrub: 1,
                },
                //,   onComplete: () => {splitFirstInfo.revert()}
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
                    //markers:true,
                    // start: 'top 75%',
                    end: "bottom 75%",
                    scrub: 1,
                },
                //,   onComplete: () => {splitFirstInfo.revert()}
            },
            "+=0"
        );
        gsap.fromTo(
            logos,
            { opacity: 0, y: -30 },
            {
                duration: 0.5,
                opacity: 1,
                y: 0,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: logoRef.current,
                    start: "top bottom",
                    end: "bottom 75%",
                    // toggleActions: "play none none reverse",
                    scrub: "true",
                },
            }
        );
        gsap.fromTo(
            cards,
            { opacity: 0, y: 200 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: "#grid",
                    start: "top bottom",
                    end: "top center",
                    // toggleActions: "play none none reverse",
                    scrub: "true",
                },
            }
        );
        gsap.from("#grid", {
            backgroundColor: "rgba(0,0,0,0)",
            scrollTrigger: {
                trigger: "#grid",
                start: "top bottom",
                end: "bottom bottom",
                // toggleActions: "play none none reverse",
                scrub: "true",
            },
        });
        // gsap.set("#pyramid-container-1", { yPercent: -20 });
        // gsap.to("#pyramid-container-1", {
        //     yPercent: 20,
        //     ease: "none",
        //     scrollTrigger: {
        //         trigger: "#first",
        //         scrub: 1,
        //     },
        // });
        // gsap.set("#pyramid-container-2", { yPercent: -5 });
        // gsap.to("#pyramid-container-2", {
        //     yPercent: 5,
        //     ease: "none",
        //     scrollTrigger: {
        //         trigger: "#second",
        //         scrub: 1,
        //     },
        // });
        // gsap.set("#pyramid-container-3", { yPercent: -20 });
        // gsap.to("#pyramid-container-3", {
        //     yPercent: 20,
        //     ease: "none",
        //     scrollTrigger: {
        //         trigger: "#third",
        //         scrub: 1,
        //     },
        // });
        // const tlHover = gsap.timeline(),
        //     splitHover = new SplitText('.hoverText', {
        //         type: 'words,chars',
        //     }),
        //     charsHover = splitHover.chars;
        // tlHover.to(
        //     charsHover,
        //     {
        //         paused: true,
        //         color: 'green',
        //         // duration: 0.8,
        //         // opacity: 0.5,
        //         // y: 10,
        //         // ease: 'circ.out',
        //         // stagger: 0.02,
        //         //,   onComplete: () => {splitFirstInfo.revert()}
        //     },
        //     '+=0'
        // );
        // // tlHover.play();
        // const hoverCards = document.querySelectorAll('.hoverCard');
        // hoverCards.forEach((hoverCard) => {
        //     hoverCard.addEventListener('mouseenter', () => tlHover.play());
        //     hoverCard.addEventListener('mouseleave', () => tlHover.reverse());
        // });
        // let anims = [];
        // gsap.utils.toArray('.hoverCard').forEach((card, cardIndex) => {
        //     gsap.utils
        //         .toArray('.hoverCard ul li')
        //         .forEach((text, textIndex) => {
        //             let animation = gsap.to('.hoverCard ul li', {
        //                 paused: true,
        //                 color: 'green',
        //                 duration: 0.8,
        //             });
        //             anims.push(animation);
        //         });
        // });
        // const hoverCards = document.querySelectorAll('.hoverCard');
        // hoverCards.forEach((hoverCard) => {
        //     hoverCard.addEventListener('mouseenter', () => {
        //         anims.forEach((anim) => {
        //             anim.play();
        //         });
        //     });
        //     hoverCard.addEventListener('mouseleave', () => {
        //         anims.forEach((anim) => {
        //             anim.reverse();
        //         });
        //     });
        // });
        // return () => window.removeEventListener("scroll", handleScroll);
    });

    return (
        <div className={styles.container}>
            <Head>
                <title>
                    Insert Productions Limited - Live and virtual event
                    technical production.
                </title>
            </Head>
            {/* <Landing />
            <div className={styles.textContainer}>
                <h1>
                    <span onClick={() => router.push('/case-studies')}>
                        Just out of reach, behind a digital curtain, exists a
                        galaxy of activity. A new economic frontier that may be
                        the answer to the generational wealth gap.
                    </span>
                </h1>
            </div> */}
            {/* <Header /> */}
            <div className={styles.hero}>
                <Landing />
                {/* <div className={styles.blurNew1} /> */}
                {/* <div className={styles.blurNew2} /> */}
                {/* <div className={styles.blur1} />
                <div className={styles.blur2} /> */}
                {/* <div className={styles.heroTitles}>
                    <h1>Creative.</h1>
                    <h1>Technical.</h1>
                    <h1>Production.</h1>
                    <div className={styles.heroLine} />
                </div> */}
                <div
                    className={styles.scrollDown}
                    style={{ opacity: showScrollDown ? 1 : 0 }}
                />
            </div>
            <div className={styles.homeContainer}>
                {/* <div
                    className={`${styles.row} ${styles.rowTransition} section`}
                /> */}
                <div className={styles.homeWrapper}>
                    <div id="grid" className={`${styles.row} section`}>
                        <div className={styles.grid} ref={cardRef}>
                            <div
                                className={`${styles.card} hoverCard card`}
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
                                <div className={styles.cardLineHover} />
                            </div>
                            <div
                                className={`${styles.card} hoverCard card`}
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
                                <div className={styles.cardLineHover} />
                            </div>
                            <div
                                className={`${styles.card} hoverCard card`}
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
                                className={`${styles.card} hoverCard card`}
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
                                <div className={styles.cardLineHover} />
                            </div>
                            <div
                                className={`${styles.card} hoverCard card`}
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
                                <div className={styles.cardLineHover} />
                            </div>
                        </div>
                    </div>
                    <div
                        className={`${styles.imgLeftContainer} ${styles.smallScreenImg} section`}
                        id="smallImageContainer"
                    >
                        <div
                            className={`${styles.imgLeft} ${styles.smallImg}`}
                            style={{ backgroundImage: `url(/home-1.png)` }}
                        />
                    </div>
                    <div
                        className={`${styles.row} ${styles.rowEnd} section`}
                        id="first"
                    >
                        <div className={`${styles.info} ${styles.infoFirst}`}>
                            <p>EVENT TECH</p>
                            <img
                                className={`${styles.bts} ${styles.bts1}`}
                                src="/home-2.png"
                            />
                            <h3 id="firstSplit">
                                Praesent urna nisl convallis aliquam
                            </h3>
                            <button className={styles.viewButton}>
                                <div className={styles.underlay}></div>
                                <span>VIEW MORE</span>
                            </button>
                        </div>
                        {/* <div className={styles.bg1} id='pyramid-container-1'>
                            <Pyramid
                                setId='pyramid-container-1'
                                shapeType='pyramid'
                            />
                        </div> */}
                    </div>
                    <div className={`${styles.row} section`}>
                        <div
                            // id='smallImageContainer'
                            className={`${styles.fullImg}`}
                        >
                            <div
                                style={{ backgroundImage: `url(/home-3.png)` }}
                            />
                        </div>
                    </div>
                    <div
                        className={`${styles.row} ${styles.rowStart} section`}
                        id="second"
                    >
                        {/* <img className={styles.bg2} src='/bg2.jpg' alt='' /> */}
                        {/* <div className={styles.bg2} id='pyramid-container-2'>
                            <Pyramid
                                setId='pyramid-container-2'
                                shapeType='cube'
                            />
                        </div> */}
                        <div className={`${styles.info} ${styles.infoFirst}`}>
                            <img
                                className={`${styles.bts} ${styles.bts2}`}
                                src="/home-4.png"
                            />
                            <p>EVENT TECH</p>

                            <h3 id="secondSplit">
                                Praesent urna nisl convallis aliquam
                            </h3>
                            <button className={styles.viewButton}>
                                <div className={styles.underlay}></div>
                                <span>VIEW MORE</span>
                            </button>
                        </div>
                    </div>
                    <div
                        className={`${styles.row} ${styles.rowImages} ${styles.rowShort} section`}
                    >
                        <div
                            id="smallImageContainer"
                            className={`${styles.fullImg} ${styles.mobileRemoveImg}`}
                        >
                            <div />
                        </div>

                        <div
                            id="smallImageContainer"
                            className={`${styles.fullImg}`}
                        >
                            <div
                                style={{
                                    backgroundImage: `url(/home-5.png)`,
                                    width: "400px",
                                    marginTop: 25,
                                    marginBottom: 50,
                                }}
                            />
                        </div>
                        <img
                            className={`${styles.bts} ${styles.bts3}`}
                            src="/home-6.png"
                        />
                    </div>
                    <div
                        className={`${styles.row} ${styles.rowCentre} section`}
                        style={{ position: "relative" }}
                    >
                        {/* <div className={styles.bg3} id="pyramid-container-3">
                            <Pyramid
                                setId="pyramid-container-3"
                                shapeType="cylinder"
                            />
                        </div> */}
                        <div className={styles.brands}>
                            <div className={styles.brandsLine}></div>
                            <h1>Brands we work with</h1>
                        </div>
                        <div className={styles.logoGrid} ref={logoRef}>
                            <img src="/logo-tiktok.svg" alt="" />
                            <img src="/logo-adidas.svg" alt="" />
                            <img src="/logo-kambi.png" alt="" />
                            <img src="/logo-digitain.png" alt="" />
                            <img src="/logo-adidas-2.svg" alt="" />
                            <img src="/logo-samsung.svg" alt="" />
                            <img src="/logo-loose-fest.svg" alt="" />
                            <img src="/logo-yamaha.svg" alt="" />
                        </div>
                    </div>
                    <div
                        className={`${styles.contentLeftContainer} section`}
                        id="third"
                    >
                        <div className={styles.contentLeft}>
                            <div className={styles.content}>
                                <h2>Lorem ipsum</h2>
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
                    <div className={`${styles.contentFull} section`}>
                        <img src="/about5.jpeg" alt="" />
                        <div>
                            <h1>Praesent urna nisl convallis</h1>
                            <ul>
                                <li>
                                    In a enim non libero commodo dapibus.
                                    Curabitur
                                </li>
                                <li>
                                    Ullamcorper, orci ut ultricies imperdiet,
                                    tellus libero
                                </li>
                                <li>
                                    Malesuada risus, non commodo lectus eros vel
                                    risus
                                </li>
                                <li>
                                    Interdum et malesuada fames ac ante ipsum
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wrapper" style={{ background: "#070707" }}>
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
            <Footer
                top={-1}
                bg={router.pathname === "/" ? "#070707" : "none"}
            />
        </div>
    );
}
