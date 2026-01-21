import { Header, Footer } from '../components/components.js';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import styles from './about.module.css'

export function AboutPage() {
    const [aboutText, setAboutText] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch("copy/about.md").then(res => res.text()).then( text => {
            setAboutText(text);
        });
        console.log('Project component mounted or updated');
    }, []);

    return (
        <>
            <div className="page-wrapper">
                <Header />
                <div className={styles.grid + " content-wrapper"}>
                    <div className={styles.gridItem}>
                        <img src="/vicky-portrait.png" alt="Vicky Bilbily Portrait by Vicky Bilbily" width="500px"/>
                    </div>
                    <div className={styles.gridItem + " fade-in"}>
                        <p className={styles.about}>
                           <Markdown>{aboutText}</Markdown>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}