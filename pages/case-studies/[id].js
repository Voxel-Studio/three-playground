import Header from '../../components/header';
import Footer from '../../components/footer';
import titleStyles from '../../styles/TitleSection.module.css';
import styles from '../../styles/Project.module.css';
import { projectItems } from '../../utils/helper';

// using hard coded array in helper file for now
// this needs to be converted to CMS using the commented out code
// I think this requires the site to be rebuilt after each CMS change?
// might need to change this to server side rendering SSR?
export const getStaticPaths = async () => {
    // const res = await fetch('STRAPI_URL_HERE/');
    // const data = await res.json();

    // const paths = data.map(item => {
    const paths = projectItems.map((item) => {
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
        case 'project-1':
            data = projectItems[0];
            break;
        case 'project-2':
            data = projectItems[1];
            break;
        case 'project-3':
            data = projectItems[2];
            break;
        case 'project-4':
            data = projectItems[3];
            break;
        case 'project-5':
            data = projectItems[4];
            break;
        case 'project-6':
            data = projectItems[5];
            break;
        case 'project-7':
            data = projectItems[6];
            break;
        case 'project-8':
            data = projectItems[7];
            break;
        default:
            break;
    }

    return {
        props: { item: data },
    };
};

export default function Project({ item }) {
    return (
        <>
            <img className={styles.heroImg} src={item.image} alt='' />
            <div className={styles.overlay} />
            <div className={titleStyles.container}>
                <Header />
                <div className='wrapper'>
                    <h1 className={titleStyles.h1}>{item.title}</h1>
                    <div className={titleStyles.line}></div>
                    <div className={titleStyles.detailGrid}>
                        <p className={titleStyles.detailGridTitle}>SOLUTION</p>
                        <p className={titleStyles.detailGridTitle}>BRAND</p>
                        <p className={titleStyles.detailGridTitle}>AGENCY</p>
                        <p>Full technical production</p>
                        <p>Adidas | Made Originals</p>
                        <p>The Marketing Store</p>
                    </div>
                </div>
                <div className={styles.projectItemWrapper}>
                    <div className={styles.result}>
                        <div className={styles.left}>
                            <h4>The result</h4>
                            <div className={styles.line}></div>
                        </div>
                        <div className={styles.right}>
                            <p>
                                Vivamus ac venenatis enim. In et iaculis nisi.
                                Nulla posuere aliquam bibendum. Cras blandit
                                volutpat euismod. Nullam nunc augue, blandit
                                convallis felis imperdiet, gravida tempu.
                            </p>
                        </div>
                    </div>
                    <img
                        className={styles.imgLeft}
                        src='/adidas-2.jpeg'
                        alt=''
                    />
                    <div className={styles.row}>
                        <div className={`${styles.info} ${styles.infoFirst}`}>
                            <p>EVENT TECH</p>
                            <h3>Praesent urna nisl convallis aliquam</h3>
                        </div>
                        <div className={styles.rowImg}>
                            <img src='/adidas-3-new.jpg' alt='' />
                            {/* <div className={styles.imgOverlayRight}></div> */}
                        </div>
                    </div>
                    <div className={`${styles.row} ${styles.rowLast}`}>
                        <div className={styles.rowImg}>
                            <img src='/news1-new.jpg' alt='' />
                            {/* <div className={styles.imgOverlayLeft}></div> */}
                        </div>
                        <div className={styles.info}>
                            <p>EVENT TECH</p>
                            <h3>Praesent urna nisl convallis aliquam</h3>
                        </div>
                    </div>
                    <img
                        className={styles.imgRight}
                        src='/adidas-1.jpeg'
                        alt=''
                    />
                    <p>
                        In a enim non libero commodo dapibus. Curabitur
                        ullamcorper, orci ut ultricies imperdiet, tellus libero
                        malesuada risus, non commodo lectus eros vel risus.
                        Interdum et malesuada fames ac ante ipsum primis in
                        faucibus. Suspendisse sit amet bibendum lectus, blandit
                        ultrices nunc. Nunc laoreet purus lacus, vitae
                        pellentesque enim semper vitae.
                    </p>
                </div>
                {/* <div className={styles.newsWrapper}></div> */}
                <div className='moreNews'>
                    <div className='newsCard'>
                        <img src='/more-news-1.jpg' alt='' />
                        <p className='moreNewsFirst'>Yamaha - WAY UP HOUSE</p>
                        <p className='prevArticle'>PREV</p>
                    </div>
                    <div className='newsCard'>
                        <p>TikTok - Transparency Forum</p>
                        <p className='nextArticle'>NEXT</p>
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
        </>
    );
}
