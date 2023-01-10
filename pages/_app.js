import '../styles/globals.css';
import Head from 'next/head';
import Validation from '../components/validation';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Three Playground</title>{' '}
                <meta
                    name='viewport'
                    content='initial-scale=1.0, width=device-width'
                />
            </Head>
            <Component {...pageProps} />
            <Validation />
        </>
    );
}

export default MyApp;
