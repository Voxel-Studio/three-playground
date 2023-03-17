import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Header from '../components/header';
import Footer from '../components/footer';
import Landing from '../components/landing';
import { useRouter } from 'next/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const router = useRouter();
    useEffect(() => {
        gsap.utils
            .toArray('#smallImageContainer')
            .forEach((smallScreenImg, i) => {
                const smallImg = smallScreenImg.querySelector(`div`);
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
            <Header />
            <div className={styles.hero}>
                <Landing />
                {/* <div className={styles.blur1} />
                <div className={styles.blur2} /> */}
                <div className={styles.heroTitles}>
                    <h1>Creative.</h1>
                    <h1>Technical.</h1>
                    <h1>Production.</h1>
                    <div className={styles.heroLine} />
                </div>
            </div>
            <div className={styles.homeWrapper}>
                <div className={`${styles.row} section`}>
                    <div className={styles.grid}>
                        <div
                            className={styles.card}
                            onClick={() => router.push('/services/live-events')}
                        >
                            <img src='/about5.jpeg' alt='' />
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
                                router.push('/services/virtual-events')
                            }
                        >
                            <img src='/services-card2.jpg' alt='' />
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
                            onClick={() => router.push('/services/digital')}
                        >
                            <img src='/services-card3.jpeg' alt='' />
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
                                router.push('/services/experiential')
                            }
                        >
                            <img src='/services-card4.jpeg' alt='' />
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
                            onClick={() => router.push('/services/av-hire')}
                        >
                            <img src='/services-card5.jpeg' alt='' />
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
                    className={`${styles.imgLeftContainer} ${styles.smallScreenImg} section`}
                    id='smallImageContainer'
                >
                    <div
                        className={`${styles.imgLeft} ${styles.smallImg}`}
                        style={{ backgroundImage: `url(/about5.jpeg)` }}
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
                    {/* <img className={styles.bg1} src='/bg1.jpg' alt='' /> */}
                </div>
                <div className={`${styles.row} section`}>
                    <div
                        // id='smallImageContainer'
                        className={`${styles.fullImg}`}
                    >
                        <div style={{ backgroundImage: `url(/about2.jpeg)` }} />
                    </div>
                </div>
                <div className={`${styles.row} ${styles.rowStart} section`}>
                    {/* <img className={styles.bg2} src='/bg2.jpg' alt='' /> */}
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
                    className={`${styles.row} ${styles.rowImages} ${styles.rowShort} section`}
                >
                    <div
                        id='smallImageContainer'
                        className={`${styles.fullImg} ${styles.mobileRemoveImg}`}
                    >
                        <div />
                    </div>
                    <div
                        id='smallImageContainer'
                        className={`${styles.fullImg}`}
                    >
                        <div style={{ backgroundImage: `url(/about4.jpg)` }} />
                    </div>
                </div>
                <div className={`${styles.row} ${styles.rowCentre} section`}>
                    <div className={styles.brands}>
                        <h1>Brands we work with</h1>
                        <div className={styles.brandsLine}></div>
                    </div>
                    <div className={styles.logoGrid}>
                        <img src='/logo-tiktok.svg' alt='' />
                        <img src='/logo-adidas.svg' alt='' />
                        <img src='/logo-kambi.png' alt='' />
                        <img src='/logo-digitain.png' alt='' />
                        <img src='/logo-adidas-2.svg' alt='' />
                        <img src='/logo-samsung.svg' alt='' />
                        <img src='/logo-loose-fest.svg' alt='' />
                        <img src='/logo-yamaha.svg' alt='' />
                    </div>
                </div>
                <div className={`${styles.contentLeftContainer} section`}>
                    <div className={styles.contentLeft}>
                        <div className={styles.content}>
                            <h2>Lorem ipsum</h2>
                            <div className={styles.sectionLine} />
                            <button className={styles.viewButton}>
                                <div className={styles.underlay}></div>
                                <span>VIEW MORE</span>
                            </button>
                        </div>
                        <p>
                            Vivamus ac venenatis enim. In et iaculis nisi. Nulla
                            posuere aliquam bibendum. Cras blandit volutpat
                            euismod. Nullam nunc augue, blandit convallis felis
                        </p>
                    </div>
                </div>
                <div className={`${styles.contentFull} section`}>
                    <img src='/about5.jpeg' alt='' />
                    <div>
                        <h1>Praesent urna nisl convallis</h1>
                        <ul>
                            <li>
                                In a enim non libero commodo dapibus. Curabitur
                            </li>
                            <li>
                                Ullamcorper, orci ut ultricies imperdiet, tellus
                                libero
                            </li>
                            <li>
                                Malesuada risus, non commodo lectus eros vel
                                risus
                            </li>
                            <li>Interdum et malesuada fames ac ante ipsum</li>
                        </ul>
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
    );
}
