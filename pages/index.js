import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Landing from '../components/landing';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();
    return (
        <div className={styles.container}>
            <Head>
                <title>
                    Insert Productions Limited - Live and virtual event
                    technical production.
                </title>
            </Head>
            <Landing />
            <div className={styles.textContainer}>
                <h1>
                    <span onClick={() => router.push('/case-studies')}>
                        Just out of reach, behind a digital curtain, exists a
                        galaxy of activity. A new economic frontier that may be
                        the answer to the generational wealth gap.
                    </span>
                </h1>
            </div>
        </div>
    );
}
