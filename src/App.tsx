import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Leadership from './pages/Leadership';

import ProjectDetail from './pages/ProjectDetail';
import Projects from './pages/Projects';
import Preloader from './components/Preloader';

import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
    const [loading, setLoading] = useState(true);

    return (
        <Router basename="/DharmaInfra/">
            <ScrollToTop />
            {loading && <Preloader onComplete={() => setLoading(false)} />}
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="leadership" element={<Leadership />} />

                    <Route path="projects" element={<Projects />} />

                    <Route path="projects/:id" element={<ProjectDetail />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
