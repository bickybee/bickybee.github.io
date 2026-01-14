import { Outlet, ScrollRestoration } from 'react-router-dom';
import { useState, createContext } from 'react';
import { PaperBubbleTrail } from './components/PaperBubbleTrail.jsx';
import { PaperBubbleFloat } from './components/PaperBubbleFloat.jsx';
import { TYPE_CONFIGS, THEMES } from './data/constants.ts';
import './app.css'

export const ThemeContext = createContext("float");

function PaperCanvas(props) {
  if (props.theme === THEMES.FLOAT) {
    return <PaperBubbleFloat filter={props.filter} renderTime={props.renderTime} />
  } else if (props.theme === THEMES.CURSOR) {
    return <PaperBubbleTrail filter={props.filter} renderTime={props.renderTime} />;
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
        <PaperCanvas theme={theme} filter={filter} renderTime={renderTime} />
        <Outlet context={filter}/>
      </div>

    </ThemeContext>
  )
}

export default App
