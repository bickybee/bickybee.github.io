import { ProjectsNavigation } from './ProjectsNavigation.tsx';
import { ProjectsContainer } from './ProjectsContainer.tsx';
import { PaperCanvas } from './PaperCanvas.tsx';
import { TYPE_CONFIGS } from './data/constants.ts';
import { useState } from 'react';
import './style.css'

function App() {

  const [filter, setFilter] = useState("");
  const handleNavigationClick = (event: React.MouseEvent) => {
    const id = (event.target as HTMLElement).id;
    if (Object.keys(TYPE_CONFIGS).includes(id)) {
      setFilter(filter == id ? "" : id);
    } else if (id === "title") {
      setFilter("");
    }
  } 

  return (
    <div className="container" onClick={handleNavigationClick}>
      <PaperCanvas id="paper-canvas" filter={filter} />
      <div id="title" className="fade-in">Vicky Bilbily</div>
      <ProjectsNavigation filter={filter} />
      <ProjectsContainer filter={filter} />
    </div>
  )
}

export default App
