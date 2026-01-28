import { useState} from 'react';
import { Link } from 'react-router-dom';
import { TagCollection } from './components.js';
import styles from './projectCard.module.css'

export function ProjectCard(props) {

  const [filter, setFilter] = useState("");
  if (filter !== props.filter) {
    setFilter(props.filter); // Force re-render to load content whenever filter changes
  }
  
  const path = `/${props.id}`;
  return (
    <Link to={path} className = {styles.projectBlock}>
      <div className = {styles.projectHeader}>
        <div className = {styles.projectImg}>
          <img src={props.previewImage} alt={props.title} width="100%" />
        </div>
        <div className={styles.textOverlay}>
          <div className= {styles.projectTitle}>
            {props.title}
          </div>
            <div className= {styles.projectSubtitle}>
            {props.context}
          </div>
        </div>
      </div>

      <div className={styles.projectInfo}>
          {props.tagline}

          <TagCollection tags={props.tags} size="small" />
      </div>
    </Link>
  );
}