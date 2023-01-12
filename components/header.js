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
                        <Link href='/'>HOME</Link>
                    </li>
                    <li>
                        <Link href='/about'>ABOUT</Link>
                    </li>
                    <li>
                        <Link href='/services'>SERVICES</Link>
                    </li>
                    <li>
                        <Link href='/case-studies'>PORTFOLIO</Link>
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
