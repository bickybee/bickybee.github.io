import { useState } from 'react';
import { PROJECTS } from '../data/projects.js';
import { ProjectCard } from './components.js';
import type { FilterProps } from './components.types.js';
import styles from './projectCard.module.css'

export function ProjectCardsContainer({ filter }: FilterProps) {

  const allProjects = PROJECTS.filter(project => {
    return filter === "" || project.tags.includes(filter)
  }).map(project =>
    <ProjectCard project={project} filter={filter} key={project.id} />
  );

  // Should most probably use context instead of re-defining state
  // const [localFilter, setFilter] = useState("");

  // if (localFilter !== filter) {
  //   setFilter(filter); // Force re-render to load content whenever filter changes
  // }

  return (
    <div className={styles.projectsContainer}>
        { allProjects }
    </div>
  );
}