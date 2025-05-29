import React, { useState } from 'react';

function Cards({ image, songName, author, showIcon = false }) {
    const [pressed, setPressed] = useState(false);

    const cleanSongName = songName
        ?.replace(/\.(mp3|wav|ogg)$/i, '')
        ?.replace(/\s*\(.*?\)/g, '')
        ?.trim();

    return (
        <div className="w-full px-5">
            <div
                className={`max-w-[361px] w-full rounded-md p-4 mx-auto cursor-pointer transition-all duration-200 transform ${
                    pressed ? 'bg-[#1a153a] scale-[0.98] shadow-lg' : 'bg-[#0A071E]'
                } hover:bg-[#1a153a] hover:shadow-lg hover:scale-[0.98] active:scale-[0.97]`}
                onTouchStart={() => setPressed(true)}
                onTouchEnd={() => setPressed(false)}
                onMouseDown={() => setPressed(true)}
                onMouseUp={() => setPressed(false)}
                onMouseLeave={() => setPressed(false)}
            >
                <div className="w-full flex items-center justify-between p-2 rounded-lg">
                    <div className="flex">
                        <img
                            src={image}
                            alt={songName || 'Song'}
                            className="w-[88px] h-[88px] rounded-[8px] object-cover"
                            style={{ opacity: 0.85 }}
                        />
                        <div className="ml-4 flex flex-col justify-between py-1">
                            <div className="w-full max-w-[197px] text-[20px] font-normal leading-[22px] tracking-[-0.41px] font-[Nunito] text-[#F2F2F2] break-words">
                                {cleanSongName}
                            </div>
                            <div className="w-full max-w-[200px] text-[16px] font-normal leading-[18px] tracking-[-0.08px] font-[Nunito] text-[#DEDEDE]">
                                {author}
                            </div>
                        </div>
                    </div>

                    {showIcon && (
                        <div className="ml-2 w-8 h-8 flex items-center justify-center bg-[#3b82f6] rounded-full text-white hover:bg-blue-600 transition">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Cards;
