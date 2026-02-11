import { HashRouter, Routes, Route } from 'react-router-dom';
import { HomePage, ProjectPage, AboutPage } from './pages/pages.js';
import App from './App.jsx';

export function Router() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="/:projectId" element={<ProjectPage />} />
                    <Route path="/about" element={<AboutPage />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}