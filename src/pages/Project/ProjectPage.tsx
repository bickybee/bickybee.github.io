import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCalendarDays, faIdBadge, type IconDefinition } from '@fortawesome/free-solid-svg-icons';

import styles from './project.module.css'
import { PROJECTS } from '../../data/projects';
import { SkillCollection } from './SkillCollection';
import { ResponsiveImage } from '../../components/ResponsiveImage';
import { MarkdownBodyImage } from './MarkdownBodyImage';

interface IconMapping {
    [key: string]: IconDefinition;
}

const detailsIconMap: IconMapping = {
    where: faLocationDot,
    when: faCalendarDays,
    role: faIdBadge
}

export function ProjectPage() {
    const { projectId } = useParams();
    const projectData = PROJECTS.find(proj => proj.id === projectId);
    const [projectText, setProjectText] = useState("");

    useEffect(() => {
        if (!projectData) return;
        window.scrollTo(0, 0);
        let cancelled = false;
        fetch(projectData.contentPath)
            .then(res => res.text())
            .then(text => {
                if (!cancelled) setProjectText(text);
            });
        return () => {
            cancelled = true;
        };
    }, [projectData?.contentPath, projectData?.id]);

    if (!projectData) {
        return <div>Project not found</div>;
    }

    const details = projectData.details.map(detail => (
        <div key={detail.iconKey}>
            <FontAwesomeIcon icon={detailsIconMap[detail.iconKey]} size="lg" /> {detail.content}
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
                            <ResponsiveImage
                                src={projectData.previewImage}
                                alt={projectData.title}
                                sizes="(max-width: 900px) 100vw, min(900px, 68vw)"
                                loading="eager"
                                fetchPriority="high"
                            />
                        </div>
                    </div>
                    <div className={styles.gridRight}>
                        <div className={styles.details}>
                            <h2>Key Facts</h2>
                            {details}
                        </div>
                        <div className={styles.skills}>
                            <h2>Skills & Tools</h2>
                            <SkillCollection skills={projectData.skills} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.markdownContent + ' ' + (projectData.wideImages ? styles.wideImg : styles.narrowImg)}>
                    <Markdown
                        components={{
                            img: (props) => <MarkdownBodyImage {...props} />,
                        }}
                    >
                        {projectText}
                    </Markdown>
                </div>
            </div>
        </div>
    )
}
