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
        <div className={styles.grid + " content-wrapper"}>
            <div className={styles.row}>
                <div className={styles.gridItem}>
                    <img src="/vicky-portrait-square-overflow.png" alt="Vicky Bilbily self-portrait" title="Self-portrait by me!"/>
                </div>
                <div className={styles.gridItem + " fade-in"}>
                    <div className={styles.about}>
                        <Markdown>{aboutText}</Markdown>
                    </div>
                </div>
            </div>
        </div>
    )
}