import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './theme.css';
import './App.css';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import Home from './pages/Home';
import Search from './pages/Search';
import Faculty from './pages/Faculty';
import Navigate from './pages/Navigate';
import About from './pages/About';

export default function App() {
  return (
    <Router>
      <Cursor />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/navigate" element={<Navigate />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}
