import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/landing.jsx';
import Welcome from './pages/Welcome.jsx';
import Home from './pages/Home.jsx';
import Cake from './pages/Cake.jsx'; // Import the new Cake page
import './App.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cake" element={<Cake />} /> {/* New Cake page route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}