import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../styles/TitleSection.module.css";

export default function Contact() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Insert Productions Limited - Contact Us.</title>
            </Head>
            <Header />
            <img
                className={styles.headerImg}
                src="/contact-heading.png"
                alt=""
            />
            <div className="wrapper" style={{ marginBottom: 80 }}>
                <h1 className={styles.h1}>Contact</h1>
                <div className={styles.line}></div>
            </div>
            <Footer showContact={true} />
        </div>
    );
}
