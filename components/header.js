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
                    <li>HOME</li>
                    <li>ABOUT</li>
                    <li>SERVICES</li>
                    <li>PORTFOLIO</li>
                </ul>
                <button className={styles.buttonContact}>CONTACT</button>
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
