import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Companents/Navbar';
import Cards from '../Companents/Cards';

function Search({ setUrl }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [tracks, setTracks] = useState([]);
    const navigate = useNavigate();

    const handleClick = () => {
        if (!searchTerm.trim()) return alert('Mahni adini daxil edin');

        fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=song&limit=10`)
            .then(res => res.json())
            .then(data => {
                if (data.results) {
                    setTracks(data.results);
                } else {
                    setTracks([]);
                }
            })
            .catch(err => {
                console.error('Xəta baş verdi:', err);
                setTracks([]);
            });
    };

const handleCardClick = (index) => {
    setUrl({
        name: tracks[index].collectionName,
        author: tracks[index].artistName,
        image: tracks[index].artworkUrl100,
        url: tracks[index].previewUrl,
    });

    navigate('/library');
};


    return (
        <div className="min-h-screen bg-[#0A091E] flex flex-col items-center justify-start pt-10 px-4 pb-[100px]">
            <div className="flex items-center w-full max-w-md mb-6">
                <input
                    type="text"
                    placeholder="Mahni adi yaz"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 h-12 bg-[#F2F2F2] rounded-l-full text-[#0A091E] placeholder-[#0A091E] text-lg font-semibold px-6 outline-none"
                />
                <button
                    onClick={handleClick}
                    className="w-16 h-12 bg-cyan-400 hover:bg-cyan-500 text-white rounded-r-full font-semibold transition-all duration-300"
                >
                    Axtar
                </button>
            </div>

            <div className="w-full max-w-md">
                {tracks.length > 0 ? (
                    tracks.map((track, index) => (
                        <div
                            key={track.trackId}
                            onClick={() => handleCardClick(index)}
                            className="cursor-pointer"
                        >
                            <Cards
                                image={track.artworkUrl100}
                                songName={track.trackName}
                                author={track.artistName}
                                showIcon={true}
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 text-center mt-6">Axtarış nəticəsi yoxdur</p>
                )}
            </div>

            <Navbar />
        </div>
    );
}

export default Search;
