import Link from 'next/link';
import styles from '../styles/Header.module.css';

const Header = () => {
    return (
        <div className='wrapper'>
            <nav className={styles.header}>
                <img
                    className={styles.logo}
                    src='/insert-logo-full.png'
                    alt=''
                />
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
                    <button className={styles.buttonContact}>CONTACT</button>
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
