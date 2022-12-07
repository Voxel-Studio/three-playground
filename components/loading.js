import React, { useState, useEffect } from 'react';
import { loadingTimeMs } from '../utils/helper';
import styles from '../styles/Loading.module.css';

export const Loading = () => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
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
            <h1>Loading</h1>
        </div>
    );
};
