import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { ProjectPage } from './pages/ProjectPage.jsx';

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="/:projectId" element={<ProjectPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}