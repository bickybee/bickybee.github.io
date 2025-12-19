import { ProjectsNavigation } from './ProjectsNavigation.tsx';
import { ProjectsContainer } from './ProjectsContainer.jsx';
import { PaperCanvas } from './PaperCanvas.jsx';
import { TYPE_CONFIGS } from './data/constants.ts';
import { useState } from 'react';
import './style.css'

function App() {

  const [filter, setFilter] = useState("");
  const handleNavigationClick = (event) => {
    const id = event.target.id;
    if (Object.keys(TYPE_CONFIGS).includes(id)) {
      setFilter(filter == id ? "" : id);
    } else if (id === "title") {
      setFilter("");
    }
  } 

  return (
    <div className="container" onClick={handleNavigationClick}>
      <PaperCanvas filter={filter} />
      <div className="title fade-in">Vicky Bilbily</div>
      <ProjectsNavigation filter={filter} />
      <ProjectsContainer filter={filter} />
    </div>
  )
}

export default App
