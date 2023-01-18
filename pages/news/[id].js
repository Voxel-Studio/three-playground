import Head from 'next/head';
import Header from '../../components/header';
import Footer from '../../components/footer';
import titleStyles from '../../styles/TitleSection.module.css';
import styles from '../../styles/Article.module.css';
import { newsItems } from '../../utils/helper';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// using hard coded array in helper file for now
// this needs to be converted to CMS using the commented out code
// I think this requires the site to be rebuilt after each CMS change?
// might need to change this to server side rendering SSR?
export const getStaticPaths = async () => {
    // const res = await fetch('STRAPI_URL_HERE/');
    // const data = await res.json();

    // const paths = data.map(item => {
    const paths = newsItems.map((item) => {
        return {
            params: { id: item.id },
        };
    });

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async (context) => {
    // const id = context.params.id;

    // const res = await fetch('STRAPI_URL_HERE/' + id);
    // const data = await res.json();

    // just hard code for now
    const id = context.params.id;
    let data;
    switch (id) {
        case 'lorem-ipsum-1':
            data = newsItems[0];
            break;
        case 'onsite-at-excel-london':
            data = newsItems[1];
            break;
        case 'lorem-ipsum-2':
            data = newsItems[2];
            break;
        default:
            break;
    }

    return {
        props: { item: data },
    };
};

export default function Article({ item }) {
    useEffect(() => {
        const heroImg = document.querySelector(`.${styles.heroImg}`);
        heroImg.style.backgroundPosition = `0% 0px`;
        gsap.to(heroImg, {
            backgroundPosition: `0% ${window.innerHeight / 2}px`,
            scale: 1.2,
            ease: 'none',
            scrollTrigger: {
                trigger: heroImg,
                start: 'top ' + heroImg.offsetHeight,
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
                // smallImg.style.height = '150%';
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
            // console.log(section);
            gsap.from(section, {
                opacity: 0,
                duration: 2,
                // ease: 'power4.out',
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                },
            });
        });
    });
    return (
        <div className={titleStyles.container}>
            <Head>
                <title>Insert Productions Limited - {item.title}.</title>
            </Head>
            <Header />
            <div className='wrapper'>
                <h1 className={titleStyles.h1}>{item.title}</h1>
                <div className={titleStyles.line}></div>
            </div>
            {/* <img className={styles.heroImg} src={item.img} alt='' /> */}
            <div className={styles.fullscreenHero}>
                <div
                    className={styles.heroImg}
                    style={{ backgroundImage: `url(${item.img})` }}
                />
            </div>
            <div className={styles.newsItemWrapper}>
                <p className='section'>
                    In a enim non libero commodo dapibus. Curabitur ullamcorper,
                    orci ut ultricies imperdiet, tellus libero malesuada risus,
                    non commodo lectus eros vel risus. Interdum et malesuada
                    fames ac ante ipsum primis in faucibus. Suspendisse sit amet
                    bibendum lectus, blandit ultrices nunc. Nunc laoreet purus
                    lacus, vitae pellentesque enim semper vitae.
                </p>
                <p className='section'>
                    Nulla feugiat sit amet nunc ac pulvinar. Etiam sapien dui,
                    tempor porttitor sollicitudin eget, commodo sed nisi.
                    Praesent urna nisl, convallis aliquam tempor quis, porta
                    condimentum mauris. Aenean scelerisque eros magna, nec
                    venenatis odio sodales et. Sed sodales turpis turpis, quis
                    varius lectus posuere porttitor. Duis ac tincidunt nibh, vel
                    porttitor neque. Duis magna erat, convallis a massa ut,
                    congue dapibus lectus.
                </p>
                <div
                    className={`${styles.smallScreenImg} section`}
                    id='smallImageContainer'
                >
                    <div
                        className={`${styles.smallImg}`}
                        style={{ backgroundImage: `url(${item.img})` }}
                    />
                </div>
                <div className={`${styles.metaGrid} section`}>
                    <p>Posted on:</p>
                    <p>18/12/2022</p>
                    <p>Tags:</p>
                    <p>#events #production #digital</p>
                </div>
            </div>
            {/* <div className={styles.newsWrapper}></div> */}
            <div className='moreNews'>
                <div className='newsCard'>
                    <img src='/more-news-1.jpg' alt='' />
                    <p className='moreNewsFirst'>Yamaha - WAY UP HOUSE</p>
                    <p className='prevArticle'>PREV</p>
                    <div className='prevLine' />
                </div>
                <div className='newsCard'>
                    <p>TikTok - Transparency Forum</p>
                    <p className='nextArticle'>NEXT</p>
                    <div className='nextLine' />
                    <img src='/more-news-2.jpg' alt='' />
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
