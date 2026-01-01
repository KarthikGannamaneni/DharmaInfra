import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Leadership from './pages/Leadership';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import Preloader from './components/Preloader';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router basename="/DharmaInfra/">
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="leadership" element={<Leadership />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
