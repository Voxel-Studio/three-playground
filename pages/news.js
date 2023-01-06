import Header from '../components/header';
import Footer from '../components/footer';
import titleStyles from '../styles/TitleSection.module.css';
import styles from '../styles/News.module.css';

const items = [
    {
        title: 'Lorem ipsum dolor lorem upsleviosa',
        img: '/news1.jpg',
    },
    {
        title: 'Onsite at ExCeL London for ICE 2023',
        img: '/news2.jpg',
    },
    {
        title: 'Lorem ipsum dolor lorem upsleviosa',
        img: '/news3.jpg',
    },
];

export default function News() {
    return (
        <div className={titleStyles.container}>
            <Header />
            <div className='wrapper'>
                <h1 className={titleStyles.h1}>News and insights</h1>
                <div className={titleStyles.line}></div>
            </div>
            <div className={styles.newsWrapper}>
                <ul className={styles.news}>
                    {items.map((item) => {
                        return (
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
                        );
                    })}
                </ul>
            </div>
            <Footer />
        </div>
    );
}
