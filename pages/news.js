import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/header';
import Footer from '../components/footer';
import titleStyles from '../styles/TitleSection.module.css';
import styles from '../styles/News.module.css';
import { newsItems } from '../utils/helper';

// const items = [
//     {
//         title: 'Lorem ipsum dolor lorem upsleviosa',
//         img: '/news1.jpg',
//         id: 'lorem-ipsum-1',
//     },
//     {
//         title: 'Onsite at ExCeL London for ICE 2023',
//         img: '/news2.jpg',
//         id: 'onsite-at-excel-london',
//     },
//     {
//         title: 'Lorem ipsum dolor lorem upsleviosa',
//         img: '/news3.jpg',
//         id: 'lorem-ipsum-2',
//     },
// ];

export default function News() {
    return (
        <div className={titleStyles.container}>
            <Head>
                <title>Insert Productions Limited - News.</title>
            </Head>
            <Header />
            <div className='wrapper'>
                <img
                    className={titleStyles.headerImg}
                    src='/news-header.jpg'
                    alt=''
                />
                <h1 className={titleStyles.h1}>News and insights</h1>
                <div className={titleStyles.line}></div>
            </div>
            <div className={styles.newsWrapper}>
                <ul className={styles.news}>
                    {newsItems.map((item, i) => {
                        return (
                            <Link href={`news/${item.id}`} key={i}>
                                <li className={styles.card}>
                                    <img
                                        className={styles.img}
                                        src={item.img}
                                        alt=''
                                    />
                                    <div className={styles.info}>
                                        <p>01222</p>
                                        <div className={styles.bottom}>
                                            <div className={styles.line}></div>
                                            <h2 className={styles.title}>
                                                {item.title}
                                            </h2>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        );
                    })}
                </ul>
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
