import { Header, Footer } from '../components/components.js';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import styles from './about.module.css'

function TextContent(props) {
  if (props.aboutText) {
    return <></>
  } else{
    return <PaperBubbleTrail filter={props.filter} renderTime={props.renderTime} />;
  } 
}

export function AboutPage() {
    const [aboutText, setAboutText] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch("copy/about.md").then(res => res.text()).then( text => {
            setAboutText(text);
        });
        console.log('Project component mounted or updated');
    }, []);

    if (aboutText){
        return (
        <div className={styles.contentWrapper}>
            <div className={styles.gridItem1}>
                <img src="/vicky-portrait-square-overflow.png" alt="Vicky Bilbily self-portrait" title="Self-portrait by me!"/>
            </div>
            <div className={styles.gridItem2 + " fade-in"}>
                <div className={styles.aboutGrid}>
                    <div className={styles.aboutContent}>
                        <Markdown>{aboutText}</Markdown>
                    </div>
                </div>
            </div>
        </div>
        )
    } else {
        return (<></>)
    }
}