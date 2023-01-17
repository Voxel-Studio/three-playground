import Head from 'next/head';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from '../styles/TitleSection.module.css';

export default function Custom404() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Insert Productions Limited - 404.</title>
            </Head>
            <Header />
            <div className='wrapper'>
                <h1 className={styles.h1}>Page not found</h1>
                <div className={styles.line}></div>
            </div>
            <Footer showContact={true} />
        </div>
    );
}
