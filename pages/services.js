import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../components/header";
import Footer from "../components/footer";
import titleStyles from "../styles/TitleSection.module.css";
import styles from "../styles/Services.module.css";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
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
                        <div className={styles.contentLeft}>
                            <div className={styles.content}>
                                <h2>Live Events</h2>
                                <div className={styles.sectionLine} />
                                <button className={styles.viewButton}>
                                    <div className={styles.underlay}></div>
                                    <span>VIEW MORE</span>
                                </button>
                            </div>
                            <p>
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
                        <div className={styles.contentLeft}>
                            <div className={styles.content}>
                                <h2>Virtual Events</h2>
                                <div className={styles.sectionLine} />
                                <button className={styles.viewButton}>
                                    <div className={styles.underlay}></div>
                                    <span>VIEW MORE</span>
                                </button>
                            </div>
                            <p>
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
                        <div className={styles.contentLeft}>
                            <div className={styles.content}>
                                <h2>Digital</h2>
                                <div className={styles.sectionLine} />
                                <button className={styles.viewButton}>
                                    <div className={styles.underlay}></div>
                                    <span>VIEW MORE</span>
                                </button>
                            </div>
                            <p>
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
                        <div className={styles.contentLeft}>
                            <div className={styles.content}>
                                <h2>Experiential</h2>
                                <div className={styles.sectionLine} />
                                <button className={styles.viewButton}>
                                    <div className={styles.underlay}></div>
                                    <span>VIEW MORE</span>
                                </button>
                            </div>
                            <p>
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
                        <div className={styles.contentLeft}>
                            <div className={styles.content}>
                                <h2>AV Hire</h2>
                                <div className={styles.sectionLine} />
                                <button className={styles.viewButton}>
                                    <div className={styles.underlay}></div>
                                    <span>VIEW MORE</span>
                                </button>
                            </div>
                            <p>
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
