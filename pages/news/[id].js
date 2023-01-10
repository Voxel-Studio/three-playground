import Header from '../../components/header';
import Footer from '../../components/footer';
import titleStyles from '../../styles/TitleSection.module.css';
import styles from '../../styles/Article.module.css';
import { newsItems } from '../../utils/helper';

// using hard coded array in helper file for now
// this needs to be converted to CMS using the commented out code
// I think this requires the site to be rebuilt after each CMS change?
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
    return (
        <div className={titleStyles.container}>
            <Header />
            <div className='wrapper'>
                <h1 className={titleStyles.h1}>{item.title}</h1>
                <div className={titleStyles.line}></div>
            </div>
            <div className={styles.newsWrapper}></div>
            <Footer />
        </div>
    );
}
