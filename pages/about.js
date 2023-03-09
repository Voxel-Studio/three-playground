import Head from 'next/head';
import Header from '../components/header';
import Footer from '../components/footer';
import titleStyles from '../styles/TitleSection.module.css';
import styles from '../styles/About.module.css';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function About() {
    useEffect(() => {
        gsap.utils
            .toArray('#smallImageContainer')
            .forEach((smallScreenImg, i) => {
                const smallImg = smallScreenImg.querySelector(`div`);
                console.log(smallImg);
                smallImg.style.backgroundPosition = `50% ${
                    -window.innerHeight / 12 - 150
                }px`;
                gsap.to(smallImg, {
                    backgroundPosition: `50% ${window.innerHeight / 12}px`,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: smallScreenImg,
                        scrub: true,
                    },
                });
            });
        gsap.utils.toArray('.section').forEach((section, i) => {
            console.log(section);
            gsap.from(section, {
                opacity: 0,
                duration: 2,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                },
            });
        });
    });
    return (
        <>
            <Head>
                <title>Insert Productions Limited - About Us.</title>
            </Head>
            <div className={titleStyles.container}>
                <Header />
                <div className='wrapper' style={{ marginBottom: 80 }}>
                    <img
                        className={`${titleStyles.headerImg} ${titleStyles.headerAbout}`}
                        src='/about-header.png'
                        alt=''
                    />
                    <h1 className={titleStyles.h1}>About</h1>
                    <div className={titleStyles.line}></div>
                </div>
                <div className={styles.aboutWrapper}>
                    <div className={`${styles.row} section`}>
                        <p className='sectionHeader'>
                            In a enim non libero commodo dapibus. Curabitur
                            ullamcorper, orci ut ultricies imperdiet, tellus
                            libero malesuada risus, non commodo lectus eros vel
                            risus. Interdum et malesuada fames ac ante ipsum
                            primis in faucibus. Suspendisse sit amet bibendum
                            lectus, blandit ultrices nunc. Nunc laoreet purus
                            lacus, vitae pellentesque enim semper vitae.
                        </p>
                    </div>
                    <div
                        className={`${styles.imgRightContainer} ${styles.smallScreenImg} section`}
                        id='smallImageContainer'
                    >
                        <div
                            className={`${styles.imgRight} ${styles.smallImg}`}
                            style={{ backgroundImage: `url(/about1.jpeg)` }}
                        />
                    </div>
                    <div className={`${styles.row} ${styles.rowEnd} section`}>
                        <div className={`${styles.info} ${styles.infoFirst}`}>
                            <p>EVENT TECH</p>
                            <h3>Praesent urna nisl convallis aliquam</h3>
                            <button className={styles.viewButton}>
                                <div className={styles.underlay}></div>
                                <span>VIEW MORE</span>
                            </button>
                        </div>
                        <img className={styles.bg1} src='/bg1.jpg' alt='' />
                    </div>
                    <div className={`${styles.row} section`}>
                        <div
                            // id='smallImageContainer'
                            className={`${styles.fullImg}`}
                        >
                            <div
                                style={{ backgroundImage: `url(/about2.jpeg)` }}
                            />
                        </div>
                    </div>
                    <div className={`${styles.row} ${styles.rowStart} section`}>
                        <img className={styles.bg2} src='/bg2.jpg' alt='' />
                        <div className={`${styles.info} ${styles.infoFirst}`}>
                            <p>EVENT TECH</p>
                            <h3>Praesent urna nisl convallis aliquam</h3>
                            <button className={styles.viewButton}>
                                <div className={styles.underlay}></div>
                                <span>VIEW MORE</span>
                            </button>
                        </div>
                    </div>
                    <div
                        className={`${styles.row} ${styles.rowImages} section`}
                    >
                        <div
                            id='smallImageContainer'
                            className={`${styles.fullImg}`}
                        >
                            <div
                                style={{ backgroundImage: `url(/about3.jpeg)` }}
                            />
                        </div>
                        <div
                            id='smallImageContainer'
                            className={`${styles.fullImg}`}
                        >
                            <div
                                style={{ backgroundImage: `url(/about4.jpg)` }}
                            />
                        </div>
                    </div>
                    <div
                        className={`${styles.imgLeftContainer} ${styles.smallScreenImg} section`}
                        id='smallImageContainer'
                    >
                        <div
                            className={`${styles.imgLeft} ${styles.smallImg}`}
                            style={{ backgroundImage: `url(/about5.jpeg)` }}
                        />
                    </div>
                    <div
                        className={`${styles.row} ${styles.mobileRow} ${styles.smallImageCol} section`}
                    >
                        <div
                            className={`${styles.rowImg}`}
                            // id='smallImageContainer'
                        >
                            <div
                                style={{
                                    backgroundImage: `url(/adidas-1.jpeg)`,
                                }}
                            />
                        </div>
                        <div className={`${styles.info} ${styles.infoFirst}`}>
                            <p>EVENT TECH</p>
                            <h3>Praesent urna nisl convallis aliquam</h3>
                            <button className={styles.viewButton}>
                                <div className={styles.underlay}></div>
                                <span>VIEW MORE</span>
                            </button>
                        </div>
                    </div>
                    <div className={`${styles.row} section`}>
                        <div
                            className={`${styles.fullImg} ${styles.fullImgMarginLeft}`}
                            // id='smallImageContainer'
                        >
                            <div
                                style={{
                                    backgroundImage: `url(/adidas-2.jpeg)`,
                                }}
                            />
                        </div>
                    </div>
                    <div className={`${styles.row} ${styles.rowStart} section`}>
                        <img className={styles.bg3} src='/bg3.jpg' alt='' />
                        <div
                            className={`${styles.info} ${styles.infoFirst} ${styles.infoFirstStart}`}
                        >
                            <p>EVENT TECH</p>
                            <h3>Praesent urna nisl convallis aliquam</h3>
                            <button className={styles.viewButton}>
                                <div className={styles.underlay}></div>
                                <span>VIEW MORE</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='wrapper'>
                    <div
                        className='backToTop'
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: 'smooth' })
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
