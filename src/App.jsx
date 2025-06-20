import { useState } from 'react';
import './App.css';
import Home from './Pages/Home';
import MusicPlayer from './Pages/MusicPlayer';
import DowlandDiviceMusic from './Pages/DowlandDiviceMusic';
import Search from './Pages/Search';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [test, setTest] = useState([]);
  console.log("test icindekiler",test);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home test={test} />} />
        <Route path="/library" element={<MusicPlayer  />} />
        <Route path="/download" element={<DowlandDiviceMusic setTest={setTest} />} />
        <Route path="/search" element={<Search setTest={setTest} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
