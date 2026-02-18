import { HashRouter, Routes, Route } from 'react-router-dom';
import { HomePage, ProjectPage, AboutPage } from './pages/pages.ts';
import App from './App.js';

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