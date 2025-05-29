import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Companents/Navbar';
import Cards from '../Companents/Cards';

function Search({ setTest }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [tracks, setTracks] = useState([]);
    const [isComplete, setIsComplete] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        if (!searchTerm.trim()) return alert('Mahni adini daxil edin');

        setIsComplete(false);

        fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=song&limit=10`)
            .then(res => res.json())
            .then(data => {
                if (data.results) {
                    const formattedTracks = data.results.map(track => ({
                        url: track.previewUrl,
                        name: track.trackName,
                        image: track.artworkUrl100,
                        author: track.artistName,
                    }));
                    setTracks(formattedTracks);
                } else {
                    setTracks([]);
                }
                setIsComplete(true);
                setTimeout(() => {
                    setIsComplete(false);
                }, 1500);
            })
            .catch(err => {
                console.error('Xəta baş verdi:', err);
                setTracks([]);
                setIsComplete(true);
                setTimeout(() => {
                    setIsComplete(false);
                }, 1500);
            });
    };

    const handleCardClick = (index) => {
        navigate('/library', { state: { audioFiles: tracks, currentIndex: index } });
    };

    const handleClickAdd = (index) => {
        setTest((prev) => [...prev, tracks[index]]);
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#0A091E] flex flex-col items-center justify-start pt-10 px-4 pb-[100px] relative">
            {/* Axtarış input və buton */}
            <div className="relative w-full max-w-md p-[2px] rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x shadow-lg mb-6">
                <div className="flex w-full h-14 rounded-full overflow-hidden bg-white focus-within:ring-2 focus-within:ring-cyan-400 transition-all duration-300">
                    <input
                        type="text"
                        placeholder="Write Music Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 h-full px-4 text-[#0A091E] placeholder-[#999] text-lg font-medium outline-none"
                    />
                    <button
                        onClick={handleClick}
                        disabled={isComplete}
                        className={`h-full w-32 text-white text-base font-bold flex items-center justify-center transition-all duration-300 bg-gradient-to-r from-cyan-400 to-blue-500 ${isComplete ? 'cursor-not-allowed' : 'hover:brightness-110 cursor-pointer'
                            }`}
                    >
                        {!isComplete ? (
                            "Axtar"
                        ) : (
                            <svg
                                className="w-6 h-6 text-white animate-checkmark"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Track-lar */}
            <div className="w-full max-w-md">
                {tracks.length > 0 ? (
                    tracks.map((track, index) => (
                        <div
                            key={track.url}
                            onClick={() => handleCardClick(index)}
                            className="cursor-pointer"
                        >
                            <Cards
                                image={track.image}
                                songName={track.name}
                                author={track.author}
                                showIcon={true}
                                onAddClick={() => handleClickAdd(index)}
                            />
                        </div>
                    ))
                ) : (
                    <p className="mt-10 text-center text-lg font-semibold text-white bg-gradient-to-r from-gray-600 via-gray-800 to-gray-600 px-6 py-4 rounded-xl shadow-md animate-pulse">
                        🔍 Axtarış nəticəsi yoxdur
                    </p>
                )}
            </div>

            {/* Uğurlu əlavə bildirişi */}
            {showSuccess && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 pointer-events-none">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xl px-6 py-3 rounded-xl shadow-lg font-semibold text-center max-w-xs mx-4 animate-fade-in-out pointer-events-auto">
                        🎉 Proses uğurla tamamlandı!
                    </div>
                </div>
            )}
            <Navbar />
        </div>
    );
}

export default Search;
