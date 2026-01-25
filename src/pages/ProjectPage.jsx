import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown';

import styles from './project.module.css'
import { PROJECTS } from '../data/projects.js';
import { SkillCard } from '../components/components.js';

export function ProjectPage() {
    let { projectId } = useParams();
    let projectData = PROJECTS.find(proj => proj.id === projectId);
    if (!projectData) {
        return <div>Project not found</div>;
    }

    const [projectText, setProjectText] = useState(null);
    const allSkills = projectData.skills.map(skill =>
        <SkillCard skill={skill} key={skill.type} />
    );

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(projectData.contentPath).then(res => res.text()).then( text => {
            setProjectText(text);
        });
        console.log('Project component mounted or updated');
    }, []);

    return (
        <div className={styles.pageWidth + " content-wrapper"}>
                <div className={styles.title}> {projectData.title} </div>
                <div className={styles.subtitle}> {projectData.tagline} </div>
                <div className={styles.imageContainer}>
                    <img src={projectData.previewImage}></img>
                </div>
                <div className={styles.skills + ' fade-in'}>
                    { allSkills }
                </div>
                <div className={styles.content}>
                    <Markdown>{projectText}</Markdown>
                </div>
        </div>
    )
}