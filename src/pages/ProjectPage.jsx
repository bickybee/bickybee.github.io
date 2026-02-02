import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCalendarDays, faIdBadge } from '@fortawesome/free-solid-svg-icons';

import styles from './project.module.css'
import { PROJECTS } from '../data/projects.js';
import { SkillCollection } from '../components/components.js';

const detailsIconMap = {
    where: faLocationDot,
    when: faCalendarDays,
    role: faIdBadge
}

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

    const details = projectData.details.map(detail => (
        <div>
            <FontAwesomeIcon icon={detailsIconMap[detail.iconKey]} size="lg"/> { detail.content }
        </div>
        ) 
    );

    return (
        <div>
            <div className={styles.contentWrapper}>
                <div className={styles.title}> {projectData.title} </div>
                <div className={styles.subtitle}> {projectData.tagline} </div>
                <div className={styles.overviewGrid + ' fade-in'}>
                    <div className={styles.gridLeft}>
                        <div className={styles.imageContainer}>
                            <img src={projectData.previewImage}></img>
                        </div>
                    </div>
                    <div className={styles.gridRight}>
                        <div className={styles.details}>
                            <h2>Key Facts</h2>
                            { details }
                        </div>
                        <div className={styles.skills}>
                            <h2>Skills & Tools</h2>
                            <SkillCollection skills={projectData.skills}/> 
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={styles.content}>
                <div className={styles.markdownContent + ' ' + (projectData.wideImages ?  styles.wideImg : styles.narrowImg)}>
                        <Markdown>{projectText}</Markdown>
                </div>
            </div>
        </div>
    )
}