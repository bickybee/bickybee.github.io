import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown';

import styles from './project.module.css'
import { PROJECTS } from '../data/projects.js';
import { SkillCardsContainer } from '../components/components.js';

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
        <div className="content-wrapper">
            <div className={styles.title}> {projectData.title} </div>
            <div className={styles.subtitle}> {projectData.tagline} </div>
            <SkillCardsContainer skills={projectData.skills}/>
            <div className={styles.content}>
                <Markdown>{projectText}</Markdown>
            </div>
        </div>
    )
}