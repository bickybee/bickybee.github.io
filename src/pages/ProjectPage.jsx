import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown';

import styles from './project.module.css'
import { PROJECTS } from '../data/projects.js';
import { Header, Footer, TagCollection } from '../components/components.js';

export function ProjectPage() {
    let { projectId } = useParams();
    let projectData = PROJECTS.find(proj => proj.id === projectId);
    if (!projectData) {
        return <div>Project not found</div>;
    }

    const [projectText, setProjectText] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(projectData.contentPath).then(res => res.text()).then( text => {
            setProjectText(text);
        });
        console.log('Project component mounted or updated');
    }, []);

    return (
        <>
            <div className="page-wrapper">
                <Header />
                <div className="content-wrapper">
                    <div className={styles.title}> {projectData.title} </div>
                    <div className={styles.subtitle}> {projectData.tagline} </div>
                    <TagCollection tags={projectData.tags} size="big" align="center"/>
                    <div className={styles.content + ' fade-in'}>
                        <Markdown>{projectText}</Markdown>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}