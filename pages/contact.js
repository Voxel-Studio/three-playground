import Head from 'next/head';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from '../styles/TitleSection.module.css';

export default function Contact() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Insert Productions Limited - Contact Us.</title>
            </Head>
            <Header />
            <div className='wrapper' style={{ marginBottom: 80 }}>
                <img
                    className={styles.headerImg}
                    src='/contact-header.jpg'
                    alt=''
                />
                <h1 className={styles.h1}>Contact</h1>
                <div className={styles.line}></div>
            </div>
            <Footer showContact={true} />
        </div>
    );
}
