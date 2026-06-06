import { Outlet, useLocation } from 'react-router-dom';
import { useState, createContext, type Dispatch, type SetStateAction } from 'react';
import { Header, Footer, PaperBubbleTrail, PaperBubbleFloat } from './shell/components.ts';
import { TYPE_CONFIGS, THEMES } from './data/constants';
import './styles/app.css'

export type ThemeContextValue = {
  theme: number;
  setTheme: Dispatch<SetStateAction<number>>;
};

export const ThemeContext = createContext<ThemeContextValue>({
  theme: THEMES.FLOAT,
  setTheme: () => {
    // no-op default; real value provided by ThemeContext.Provider
  },
});

function PaperCanvas({ theme, filter, renderTime }: { theme: number, filter: string, renderTime: number }) {
  if (theme === THEMES.FLOAT) {
    return <PaperBubbleFloat filter={filter} renderTime={renderTime} />
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
  const location = useLocation();

  // Check if we're on the bday-bundle route
  const isBdayBundlePage = location.hash === '#/bday-bundle';

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const id = (event.target as HTMLElement | null)?.id ?? "";
    if (Object.keys(TYPE_CONFIGS).includes(id)) {
      setFilter(filter === id ? "" : id);
    } else if (id === "title") {
      setFilter("");
    } else if (id === "logo") {
      setFilter("");
      setRenderTime(Date.now());
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="page-wrapper fade-in" onClick={handleClick}>
        {!isBdayBundlePage && <Header />}
        <Outlet context={filter} />
        {!isBdayBundlePage && <Footer />}
      </div>
      {!isBdayBundlePage && <PaperCanvas theme={theme} filter={filter} renderTime={renderTime} />}
    </ThemeContext.Provider>
  )
}

export default App
