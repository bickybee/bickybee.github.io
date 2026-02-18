import { useState} from 'react';
import { Link } from 'react-router-dom';
import { TagCollection } from './components.ts';
import styles from './projectCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import type { Project } from '../data/data.types.ts';

interface ProjectCardProps {
  filter: string,
  project: Project
}

export function ProjectCard(props: ProjectCardProps) {

  const [filter, setFilter] = useState("");
  if (filter !== props.filter) {
    setFilter(props.filter); // Force re-render to load content whenever filter changes
  }
  
  const project = props.project;
  const path = `/${project.id}`;
  return (
    <Link to={path} className = {styles.projectBlock}>
      <div className = {styles.projectHeader}>
        <div className = {styles.projectImg}>
          <img src={project.previewImage} alt={project.title} width="100%" />
        </div>
        <div className={styles.textOverlay}>
          <div className= {styles.projectTitle}>
            {project.title}
          </div>
            <div className= {styles.projectSubtitle}>
            {project.context}
          </div>
        </div>
        <div className={styles.linkOverlay}>
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </div>
      </div>

      <div className={styles.projectInfo}>
          {project.tagline}

          <TagCollection tags={project.tags} />
      </div>
    </Link>
  );
}