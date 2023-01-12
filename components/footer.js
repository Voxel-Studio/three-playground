import styles from '../styles/Footer.module.css';

const Footer = ({ showContact = false }) => {
    return (
        <footer className={styles.footer}>
            <div
                className={styles.contact}
                style={{ display: showContact ? 'flex' : 'none' }}
            >
                <div className={`${styles.contactContainer} wrapper`}>
                    <div className={styles.info}>
                        {/* <div className='wrapper'> */}
                        <div className={`${styles.row} ${styles.firstRow}`}>
                            <div className={styles.col}>
                                <h4>ADDRESS</h4>
                                <p>Unit 39 Atcham Business Park</p>
                                <p>Shrewsbury</p>
                                <p>SY4 4UG</p>
                            </div>
                            <div className={styles.col}>
                                <h4>PHONE</h4>
                                <p>020 7183 0290</p>
                            </div>
                            <div className={styles.col}>
                                <h4>EMAIL</h4>
                                <p>
                                    <a href='mailto:hello@insertproductions.com'>
                                        hello@insertproductions.com
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.social}>
                                <img src='/linkedin.svg' alt='' />
                                <img src='/ig.svg' alt='' />
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                    <form className={styles.form}>
                        <div className={styles.formRow}>
                            <input
                                className={`${styles.formName} ${styles.inputText}`}
                                type='text'
                                placeholder='NAME*'
                                required
                            />
                            <input
                                className={styles.inputText}
                                type='email'
                                placeholder='EMAIL*'
                                required
                            />
                        </div>
                        <div className={styles.formRow}>
                            <input
                                className={`${styles.inputMessage} ${styles.inputText}`}
                                type='text'
                                placeholder='MESSAGE*'
                                required
                            />
                        </div>
                        <button className={styles.submitButton} type='submit'>
                            <div className={styles.underlay}></div>
                            <span>SEND IT NOW</span>
                        </button>
                    </form>
                </div>
            </div>
            <div className={`${styles.about} wrapper`}>
                <div className={styles.aboutCol}>
                    <img
                        className={styles.aboutLogo}
                        src='/insert-logo.png'
                        alt=''
                    />
                    <p className={styles.lightText}>
                        Creative technical production
                    </p>
                    <p className={styles.lightText}>
                        for global brands and events
                    </p>
                </div>
                <div
                    className={`${styles.aboutCol} ${styles.aboutColRightJustify}`}
                >
                    <p className={styles.heavyText}>
                        <a href='mailto:hello@insertproductions.com'>
                            hello@insertproductions.com
                        </a>
                    </p>
                    <p className={styles.heavyText}>020 7183 0290</p>
                    <div className={`${styles.social} ${styles.aboutSocial}`}>
                        <img src='/linkedin.svg' alt='' />
                        <img src='/ig.svg' alt='' />
                    </div>
                </div>
            </div>
            <div className={`${styles.logos} wrapper`}>
                <img src='/logos1.png' alt='' />
                <img src='/logos2.png' alt='' />
                <img src='/logos3.png' alt='' />
                <img src='/logos4.png' alt='' />
                <img src='/logos5.png' alt='' />
            </div>
            <div className={`${styles.terms} wrapper`}>
                <div className={styles.left}>
                    <p>Insert Productions Limited</p>
                    <p>Unit 39, Atcham Business Park, Shrewsbury, SY4 4UG</p>
                </div>
                <ul className={styles.right}>
                    <li>Terms and Conditions</li>
                    <li>Privacy Policy</li>
                    <li>Cookies Policy</li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
