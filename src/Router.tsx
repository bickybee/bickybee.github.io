import { HashRouter, Routes, Route } from 'react-router-dom';
import { HomePage, ProjectPage, AboutPage, BdayBundlePage } from './pages/pages';
import App from './App';

export function Router() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/bday-bundle" element={<BdayBundlePage />} />
                    <Route path="/:projectId" element={<ProjectPage />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}
