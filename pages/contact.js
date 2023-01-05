import Header from '../components/header';
import Footer from '../components/footer';
import styles from '../styles/TitleSection.module.css';

export default function Contact() {
    return (
        <div className={styles.container}>
            <Header />
            <div className='wrapper'>
                <h1 className={styles.h1}>Contact</h1>
                <div className={styles.line}></div>
            </div>
            <Footer />
        </div>
    );
}
