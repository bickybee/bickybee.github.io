import { useState } from 'react';
import { PROJECTS } from '../data/projects.js';
import { ProjectCard } from './components.js';
import styles from './projectCard.module.css'

export function ProjectCardsContainer(props) {

  const allProjects = PROJECTS.filter(project => {
    return props.filter === "" || project.tags.includes(props.filter)
  }).map(project =>
    <ProjectCard {...project} filter={props.filter} key={project.id} />
  );

  const [filter, setFilter] = useState("");
  if (filter !== props.filter) {
    setFilter(props.filter); // Force re-render to load content whenever filter changes
  }

  return (
    <div className={styles.projectsContainer}>
        { allProjects }
    </div>
  );
}