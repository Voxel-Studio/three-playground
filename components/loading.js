import React, { useState, useEffect } from 'react';
import { loadingTimeMs } from '../utils/helper';
import styles from '../styles/Loading.module.css';
import { StyleRegistry } from 'styled-jsx';

export const Loading = () => {
    const [loaded, setLoaded] = useState(true);
    const [startLoading, setStartLoading] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setStartLoading(true);
        }, 200);
        setTimeout(() => {
            setLoaded(true);
        }, loadingTimeMs);
    }, []);
    return (
        <div
            className={
                loaded
                    ? `${styles.loading} ${styles.hidden}`
                    : `${styles.loading}`
            }
        >
            <div className={styles.container}>
                <img
                    className={
                        startLoading
                            ? `${styles.logo} ${styles.fadeIn}`
                            : `${styles.logo}`
                    }
                    src='/insert-logo.png'
                    alt=''
                />
                <div
                    className={
                        startLoading
                            ? `${styles.indicator} ${styles.start}`
                            : `${styles.indicator}`
                    }
                ></div>
                {/* <circle class="circle" cx="40" cy="40" r="36" fill="transparent" stroke="black" stroke-width="4" /> */}
            </div>
        </div>
    );
};
