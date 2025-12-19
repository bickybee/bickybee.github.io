import { PROJECTS } from './data/projects';
import { Project } from './Project.jsx';
import { useState } from 'react';

export function ProjectsContainer(props) {

  const allProjects = PROJECTS.filter(project => {
    return props.filter === "" || project.tags.includes(props.filter)
  }).map(project =>
    <Project {...project} filter={props.filter} key={project.id} />
  );

  const [filter, setFilter] = useState("");
  if (filter !== props.filter) {
    setFilter(props.filter); // Force re-render to load content whenever filter changes
  }

  return (
    <div className="projects-container">
        { allProjects }
    </div>
  );
}