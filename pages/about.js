import Head from 'next/head';
import Header from '../components/header';
import Footer from '../components/footer';
import titleStyles from '../styles/TitleSection.module.css';
import styles from '../styles/About.module.css';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/dist/SplitText';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function About() {
    useEffect(() => {
        const headerImg = document.querySelector(`#header`);
        headerImg.style.backgroundPosition = `0% 0px`;
        gsap.set(headerImg, { filter: 'blur(0px) brightness(0.6)' });
        gsap.to(headerImg, {
            backgroundPosition: `0% ${window.innerHeight / 2}px`,
            scale: 1.2,
            filter: 'blur(10px) brightness(0)',
            ease: 'none',
            scrollTrigger: {
                trigger: headerImg,
                start: 'top',
                end: 'bottom top',
                scrub: true,
            },
        });
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
                // duration: 2,
                duration: 0.5,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                },
            });
        });
        const tlFirstInfo = gsap.timeline(),
            splitFirstInfo = new SplitText('#firstSplit', {
                type: 'words,chars',
            }),
            chars = splitFirstInfo.chars;
        tlFirstInfo.from(
            chars,
            {
                duration: 0.8,
                opacity: 0,
                y: 10,
                ease: 'circ.out',
                stagger: 0.02,
                scrollTrigger: {
                    trigger: '#first',
                    start: 'top 75%',
                    end: 'bottom center ',
                    scrub: 1,
                },
            },
            '+=0'
        );
        const tlSecondInfo = gsap.timeline(),
            splitSecondInfo = new SplitText('#secondSplit', {
                type: 'words,chars',
            }),
            charsSecond = splitSecondInfo.chars;
        tlSecondInfo.from(
            charsSecond,
            {
                duration: 0.8,
                opacity: 0,
                y: 10,
                ease: 'circ.out',
                stagger: 0.02,
                scrollTrigger: {
                    trigger: '#second',
                    start: 'top 75%',
                    end: 'bottom center',
                    scrub: 1,
                },
            },
            '+=0'
        );
        const tlThirdInfo = gsap.timeline(),
            splitThirdInfo = new SplitText('#thirdSplit', {
                type: 'words,chars',
            }),
            charsThird = splitThirdInfo.chars;
        tlThirdInfo.from(
            charsThird,
            {
                duration: 0.8,
                opacity: 0,
                y: 10,
                ease: 'circ.out',
                stagger: 0.02,
                scrollTrigger: {
                    trigger: '#third',
                    start: 'top 75%',
                    end: 'bottom center',
                    scrub: 1,
                },
            },
            '+=0'
        );
        const tlFourthInfo = gsap.timeline(),
            splitFourthInfo = new SplitText('#fourthSplit', {
                type: 'words,chars',
            }),
            charsFourth = splitFourthInfo.chars;
        tlFourthInfo.from(
            charsFourth,
            {
                duration: 0.8,
                opacity: 0,
                y: 10,
                ease: 'circ.out',
                stagger: 0.02,
                scrollTrigger: {
                    trigger: '#fourth',
                    start: 'top 75%',
                    end: 'bottom center',
                    scrub: 1,
                },
            },
            '+=0'
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
                    id='header'
                    className={`${titleStyles.headerImg} ${titleStyles.headerAbout}`}
                    src='/about-bg.png'
                    alt=''
                />
                <div className='wrapper' style={{ marginBottom: 80 }}>
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
                    <div
                        id='first'
                        className={`${styles.row} ${styles.rowEnd} section`}
                    >
                        <div className={`${styles.info} ${styles.infoFirst}`}>
                            <p>EVENT TECH</p>
                            <h3 id='firstSplit'>
                                Praesent urna nisl convallis aliquam
                            </h3>
                            <button className={styles.viewButton}>
                                <div className={styles.underlay}></div>
                                <span>VIEW MORE</span>
                            </button>
                        </div>
                        {/* <img className={styles.bg1} src='/bg1.jpg' alt='' /> */}
                        <img
                            className={`${styles.bts} ${styles.bts1}`}
                            src='/about-bw1.png'
                            alt=''
                        />
                    </div>
                    <div className={`${styles.row} section`}>
                        <div
                            // id='smallImageContainer'
                            className={`${styles.fullImg}`}
                        >
                            <div
                                style={{ backgroundImage: `url(/about2.png)` }}
                            />
                        </div>
                    </div>
                    <div
                        id='second'
                        className={`${styles.row} ${styles.rowStart} section`}
                        style={{ marginRight: '10vw' }}
                    >
                        {/* <img className={styles.bg2} src="/bg2.jpg" alt="" /> */}
                        <img
                            className={`${styles.bts} ${styles.bts2}`}
                            src='/about-bw2.png'
                            alt=''
                        />
                        <div className={`${styles.info} ${styles.infoFirst}`}>
                            <p>EVENT TECH</p>
                            <h3 id='secondSplit'>
                                Praesent urna nisl convallis aliquam
                            </h3>
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
                                style={{ backgroundImage: `url(/about3.png)` }}
                            />
                        </div>
                    </div>
                    <div
                        className={`${styles.imgLeftContainer} ${styles.smallScreenImg} section`}
                        // id="smallImageContainer"
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
                            {/* <div
                                style={{
                                    backgroundImage: `url(/about-bw3.png)`,
                                }}
                            /> */}
                            <img
                                className={`${styles.bts} ${styles.bts3}`}
                                src='/about-bw3.png'
                                alt=''
                            />
                        </div>
                        <div
                            id='third'
                            className={`${styles.info} ${styles.infoFirst}`}
                        >
                            <p>EVENT TECH</p>
                            <h3 id='thirdSplit'>
                                Praesent urna nisl convallis aliquam
                            </h3>
                            <button className={styles.viewButton}>
                                <div className={styles.underlay}></div>
                                <span>VIEW MORE</span>
                            </button>
                        </div>
                    </div>
                    <div className={`${styles.row} section`}>
                        <div
                            className={`${styles.fullImg} ${styles.fullImgMarginLeft}`}
                            id='smallImageContainer'
                        >
                            <div
                                style={{
                                    backgroundImage: `url(/about6.png)`,
                                }}
                            />
                        </div>
                    </div>
                    <div
                        id='fourth'
                        className={`${styles.row} ${styles.rowStart} section`}
                    >
                        <div
                            className={`${styles.info} ${styles.infoFirst} ${styles.infoFirstStart}`}
                        >
                            <p>EVENT TECH</p>
                            <h3 id='fourthSplit'>
                                Praesent urna nisl convallis aliquam
                            </h3>
                            <button className={styles.viewButton}>
                                <div className={styles.underlay}></div>
                                <span>VIEW MORE</span>
                            </button>
                        </div>
                        <img
                            className={`${styles.bts} ${styles.bts4}`}
                            src='/about-bw4.png'
                            alt=''
                        />
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
