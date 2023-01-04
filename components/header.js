import styles from '../styles/Header.module.css';

const Header = () => {
    return (
        <div className='wrapper'>
            <nav className={styles.header}>
                <img src='/insert-logo-full.png' alt='' />
                <ul>
                    <li>HOME</li>
                    <li>ABOUT</li>
                    <li>SERVICES</li>
                    <li>PORTFOLIO</li>
                </ul>
                <button>CONTACT</button>
            </nav>
        </div>
    );
};

export default Header;
