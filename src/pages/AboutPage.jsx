import { Header, Footer } from '../components/components.js';
import { useEffect, useState } from 'react';


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
                <div className="content-wrapper">
                    <img src="/vicky-portrait.png" alt="Vicky Bilbily Portrait" width="500px"/>
                    <p>
                        Hi! My name is Vicky. I am a software developer with many other tendencies. I love creating beautiful and functional user experiences, exploring new technologies, and collaborating with others to bring ideas to life.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    )
}