import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Companents/Navbar';



function MusicPlayer() {
  const location = useLocation();
  const { audioFiles, currentIndex } = location.state || {};

  const [currentSongIndex, setCurrentSongIndex] = useState(currentIndex || 0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  //!Cari mahnı obyekti
  const currentAudio = audioFiles ? audioFiles[currentSongIndex] : null;

  //! Avtomatik oynatma mahnı dəyişəndə
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentSongIndex]);

  //! Vaxt yenilənməsi və müddət
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const updateTime = () => {
      setCurrentTime(audioElement.currentTime);
    };
    const setAudioDuration = () => {
      setDuration(audioElement.duration);
    };
    audioElement.addEventListener('timeupdate', updateTime);
    audioElement.addEventListener('loadedmetadata', setAudioDuration);

    return () => {
      audioElement.removeEventListener('timeupdate', updateTime);
      audioElement.removeEventListener('loadedmetadata', setAudioDuration);
    };
  }, []);

  //! Play / Pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  //! İrəli / Geri - mahnı dəyişmək üçün
  const skipForward = () => {
    if (!audioFiles) return;
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % audioFiles.length);
  };

  const skipBackward = () => {
    if (!audioFiles) return;
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? audioFiles.length - 1 : prevIndex - 1
    );
  };

  //! Restart (mahnını yenidən başlat)
  const restartAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  //!Progress bar kliklənəndə yeni vaxt təyin etmək
  const handleSeek = (e) => {
    const width = e.target.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const newTime = (clickX / width) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  //!Format vaxt
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.floor(time % 60) || 0;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!audioFiles || !currentAudio) {
    return (
      <>
        <div className="flex flex-col items-center justify-center mt-10 text-center px-4">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-6 py-4 rounded-xl shadow-md max-w-md">
            <h2 className="text-xl font-semibold mb-2">Hazirda Oxunacaq Mahni yoxdur</h2>
            <p className="text-sm">
              Zəhmət olmasa bir musiqi faylı yükləyin və ya mövcud siyahıdan birini seçin.
            </p>
          </div>
        </div>
        <Navbar />
      </>
    );
  }

  const CleanSongName = currentAudio.name
    .replace(/\.(mp3|wav|ogg)$/i, '')
    .replace(/\s*\(.*?\)/g, '')
    .trim();

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#0A071E] overflow-y-auto relative">
      <audio ref={audioRef} src={currentAudio.url} />
      <div className="w-[360px] min-h-[740px] bg-[#0A071E] flex flex-col justify-between items-center px-4 py-6 pb-[100px]">
        <div className="text-[#F2F2F2] font-[Segoe UI] font-semibold text-[23px] text-center">
          {CleanSongName}
        </div>

        <div className="w-[299px] h-[299px] mt-6 rounded-[30px] overflow-hidden">
          <img src={currentAudio.image} alt="Cover" className="w-full h-full object-cover rounded-[30px]" />
        </div>

        <div className="text-center mt-6">
          <div className="text-[#F2F2F2] font-[Nunito] text-[24px]">{CleanSongName}</div>
          <div className="text-[#8E8E8E] font-[Nunito] text-[18px] mt-1">{currentAudio.author}</div>
        </div>

        <div className="w-[335px] mt-6 relative cursor-pointer" onClick={handleSeek}>
          <div className="w-full h-[4px] bg-[#8E8E8E] rounded-full relative">
            <div
              className="h-[4px] bg-[#F2F2F2] rounded-full absolute top-0 left-0"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[12px] text-[#F2F2F2] font-[Nunito] mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="w-full max-w-[335px] mt-6 flex justify-center items-center gap-6">
          {/* Geri */}
          <button onClick={skipBackward} className="w-[30px] h-[30px] text-white hover:scale-110 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            className="w-[75.82px] h-[74px] bg-white text-black rounded-full flex items-center justify-center shadow-[0px_0px_47px_0px_#7A51E259] hover:scale-105 transition"
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-[30px] h-[30px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-[30px] h-[30px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* İrəli */}
          <button onClick={skipForward} className="w-[30px] h-[30px] text-white hover:scale-110 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Repeat */}
          <button onClick={restartAudio} className="w-[30px] h-[30px] text-white hover:text-cyan-400 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v6h6M20 20v-6h-6M4 20c4.418 0 8-3.582 8-8s-3.582-8-8-8m16 0c-4.418 0-8 3.582-8 8s3.582 8 8 8" />
            </svg>
          </button>
        </div>

        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[390.4px]">
          <Navbar />
        </div>

      </div>
    </div>
  );
}

export default MusicPlayer;