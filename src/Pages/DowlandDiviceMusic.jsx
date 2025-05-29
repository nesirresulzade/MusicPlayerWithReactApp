import React, { useState } from 'react';
import UploadMusic from "../img/6328436.png";
import Cards from '../Companents/Cards';
import Navbar from '../Companents/Navbar';
import { parseBlob } from 'music-metadata-browser';
import { useNavigate } from 'react-router-dom';

function DowlandDiviceMusic({ setTest , setCurrentIndex}) {

  const [audioFiles, setAudioFiles] = useState([]);
  console.log(audioFiles)
  const navigate = useNavigate();
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    for (const file of files) {
      try {
        const metadata = await parseBlob(file);
        const common = metadata.common;
        const picture = common.picture ? common.picture[0] : null;
        let base64String = null;
        if (picture) {
          const blob = new Blob([picture.data], { type: picture.format });
          base64String = URL.createObjectURL(blob);
        }
        setAudioFiles(prev => [
          ...prev,
          {
            file,
            url: URL.createObjectURL(file),
            name: common.title || file.name,
            author: common.artist || "Unknown Artist",
            image: base64String || UploadMusic
          }
        ]);
        // test yoxalnir
        setTest((prew) => [
          ...prew,
          {
            file,
            url: URL.createObjectURL(file),
            name: common.title || file.name,
            author: common.artist || "Unknown Artist",
            image: base64String || UploadMusic
          }
          ])
         
      } catch (error) {
        console.log('Metadata oxunarkən xəta:', error);
        setAudioFiles(prev => [
          ...prev,
          {
            file,
            url: URL.createObjectURL(file),
            name: file.name,
            author: "Unknown Artist",
            image: UploadMusic
          }
        ]);
        // test yoxalnir
        setTest((prew) => [
          ...prew,
          {
            file,
            url: URL.createObjectURL(file),
            name: file.name,
            author: "Unknown Artist",
            image: UploadMusic
          }
        ]);
        
      }
    }
  };
  const handleCardClick = (index) => {
    navigate('/library', { state: { audioFiles, currentIndex: index } });
  };
  return (
    <div className="flex flex-col min-h-screen bg-[#0A071E] px-5 pt-10 text-center relative pb-[100px] w-full">
      {/* üst hissə */}
      <div>
        <div className="w-80 h-80 rounded-full overflow-hidden mx-auto mb-6">
          <img src={UploadMusic} alt="Upload Music" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-white text-[24px] font-semibold">Upload Music</h2>
        <p className="text-[#8E8E8E] text-[16px] mt-2 mb-6">
          Add music from your device to your library
        </p>
        <div className="w-full flex justify-center mb-6">
          <input
            type="file"
            multiple
            accept="audio/*"
            onChange={handleFileChange}
            className="w-[calc(100%-60px)] max-w-md py-3 px-4 rounded-lg bg-[#1F1F1F] text-white border border-gray-600
                       file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-cyan-500 file:text-white hover:file:bg-cyan-400 transition"
          />
        </div>
      </div>
      {/* Scroll hissə – tam səhifənin boşluğuna əsaslanır */}
      <div className="overflow-y-auto flex-grow px-4 space-y-4 pr-2">
        {audioFiles.length > 0 ? (
          audioFiles.map((audio, index) => (
            <div key={index} onClick={() => handleCardClick(index)} className="cursor-pointer">
              <Cards image={audio.image} songName={audio.name} author={audio.author} />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No songs uploaded yet.</p>
        )}
      </div>
      {/* Fixlənmiş aşağı navbar */}
      <div
        className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50"
        style={{ height: '85px', width: '390.4px' }}
      >
        <Navbar />
      </div>
    </div>
  );
}
export default DowlandDiviceMusic;