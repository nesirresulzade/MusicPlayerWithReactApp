import { useState } from 'react';
import './App.css';
import Home from './Pages/Home';
import MusicPlayer from './Pages/MusicPlayer';
import DowlandDiviceMusic from './Pages/DowlandDiviceMusic';
import Search from './Pages/Search';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [test, setTest] = useState([]);
  console.log(test);

  const [url , setUrl] = useState([]);
  console.log("url den gelen data",url);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home test={test} />} />
        <Route path="/library" element={<MusicPlayer url={url}/>} />
        <Route path="/download" element={<DowlandDiviceMusic setTest={setTest} />} />
        <Route path="/search" element={<Search setUrl={setUrl}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
