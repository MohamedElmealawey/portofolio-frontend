import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './components/main/Main.jsx';
import Notfound from './components/notfound/Notfound';
import ProjectDetailPage from './pages/ProjectDetailPage.jsx';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/projectDetails/:id" element={<ProjectDetailPage />} />
            <Route path="*" element={<Notfound />} />
        </Routes>
    );
}

export default App;