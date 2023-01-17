import Link from 'next/link';
import styles from '../styles/Header.module.css';

const Header = ({ isHomepage = false }) => {
    return (
        <div className={isHomepage ? 'wrapper centred' : 'wrapper'}>
            <nav className={styles.header}>
                <Link href='/'>
                    <img
                        className={styles.logo}
                        src='/insert-logo-full.png'
                        alt=''
                    />
                </Link>
                <ul>
                    <li>
                        <Link href='/'>
                            <div
                                className={styles.hoverScroll}
                                data-hover='HOME'
                            >
                                HOME
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href='/about'>
                            <div
                                className={styles.hoverScroll}
                                data-hover='ABOUT'
                            >
                                ABOUT
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href='/services'>
                            <div
                                className={styles.hoverScroll}
                                data-hover='SERVICES'
                            >
                                SERVICES
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href='/case-studies'>
                            <div
                                className={styles.hoverScroll}
                                data-hover='PORTFOLIO'
                            >
                                PORTFOLIO
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href='/news'>
                            <div
                                className={styles.hoverScroll}
                                data-hover='NEWS'
                            >
                                NEWS
                            </div>
                        </Link>
                    </li>
                </ul>
                <Link href='/contact'>
                    <button className={styles.buttonContact}>
                        <div className={styles.underlay}></div>
                        <span>CONTACT</span>
                    </button>
                </Link>
                <img
                    className={styles.buttonHamburger}
                    src='/menu.png'
                    alt=''
                />
            </nav>
        </div>
    );
};

export default Header;
