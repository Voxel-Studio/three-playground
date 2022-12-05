import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Playground from '../components/playground';

export default function Home() {
    return (
        <div>
            {/* <h1>Yo</h1> */}
            <Playground />
        </div>
    );
}
