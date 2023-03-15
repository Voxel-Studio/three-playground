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
                    <Link href='/'>
                        <li>
                            <div
                                className={styles.hoverScroll}
                                data-hover='HOME'
                            >
                                HOME
                            </div>
                        </li>
                    </Link>
                    <Link href='/about'>
                        <li>
                            <div
                                className={styles.hoverScroll}
                                data-hover='ABOUT'
                            >
                                ABOUT
                            </div>
                        </li>
                    </Link>
                    <Link href='/services'>
                        <li>
                            <div
                                className={styles.hoverScroll}
                                data-hover='SERVICES'
                            >
                                SERVICES
                            </div>
                        </li>
                    </Link>
                    <Link href='/case-studies'>
                        <li>
                            <div
                                className={styles.hoverScroll}
                                data-hover='PORTFOLIO'
                            >
                                PORTFOLIO
                            </div>
                        </li>
                    </Link>
                    <Link href='/news'>
                        <li>
                            <div
                                className={styles.hoverScroll}
                                data-hover='NEWS'
                            >
                                NEWS
                            </div>
                        </li>
                    </Link>
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
