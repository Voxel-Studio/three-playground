import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/CaseStudies.module.css';
import Projects from '../components/projects';

export default function CaseStudies() {
    const router = useRouter();
    const [selectedProject, setSelectedProject] = useState(0);
    const getSelected = (selected) => {
        setSelectedProject(selected);
    };
    return (
        <div>
            {/* <h1>Yo</h1> */}
            <Projects getSelected={getSelected} />
            <div className={styles.overlay} />
            <img
                className={styles.logoFull}
                src='/insert-logo-full.png'
                alt=''
                onClick={() => router.push('/')}
            />
            <img className={styles.logo} src='/insert-logo.png' alt='' />
            <img className={styles.menu} src='/menu.svg' alt='' />
            <p className={styles.allWorks}>all works</p>
            <p className={styles.projectNumber}>{selectedProject + 1} / 8</p>
            {/* <div className={styles.clickContainer} /> */}
        </div>
    );
}
