import { Outlet } from 'react-router-dom';
import { useState, createContext } from 'react';
import { Header, Footer, PaperBubbleTrail, PaperBubbleFloat } from './components/components.js';
import { TYPE_CONFIGS, THEMES } from './data/constants.ts';
import './app.css'

export const ThemeContext = createContext(THEMES.FLOAT);

function PaperCanvas({ theme, filter, renderTime }: {theme: number, filter: string, renderTime: number}) {
  if (theme === THEMES.FLOAT) {
    return <PaperBubbleFloat  filter={filter} renderTime={renderTime} />
  } else if (theme === THEMES.CURSOR) {
    return <PaperBubbleTrail filter={filter} renderTime={renderTime} />;
  } else {
    return null;
  }
}

function App() {

  const [theme, setTheme] = useState(THEMES.FLOAT);
  const [filter, setFilter] = useState("");
  const [renderTime, setRenderTime] = useState(Date.now());

  const handleClick = (event) => {
    const id = event.target.id;
    if (Object.keys(TYPE_CONFIGS).includes(id)) {
      setFilter(filter == id ? "" : id);
    } else if (id === "title") {
      setFilter("");
    } else if (id === "logo") {
      setFilter("");
      setRenderTime(Date.now());
    }
  } 

  return (
    <ThemeContext value={{theme, setTheme}}>
      <div className="page-wrapper fade-in" onClick={handleClick}>
        <Header />
        <Outlet context={filter}/>
        <Footer />
      </div>
    <PaperCanvas theme={theme} filter={filter} renderTime={renderTime} />
    </ThemeContext>
  )
}

export default App
