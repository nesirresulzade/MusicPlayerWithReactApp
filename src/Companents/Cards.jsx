import React, { useState } from 'react';

function Cards({ image, songName, author, showIcon = false, onAddClick }) {
    const [pressed, setPressed] = useState(false);

    const cleanSongName = songName
        ?.replace(/\.(mp3|wav|ogg)$/i, '')
        ?.replace(/\s*\(.*?\)/g, '')
        ?.trim();

    return (
        <div className="w-full px-5 mb-5">
            <div
                className={`animated-border relative max-w-[361px] w-full rounded-md p-[2px] mx-auto cursor-pointer transition-all duration-200 transform ${pressed ? 'scale-[0.98]' : ''
                    } hover:scale-[0.98] active:scale-[0.97]`}
                onTouchStart={() => setPressed(true)}
                onTouchEnd={() => setPressed(false)}
                onMouseDown={() => setPressed(true)}
                onMouseUp={() => setPressed(false)}
                onMouseLeave={() => setPressed(false)}
            >
                <div className="bg-[#0A071E] hover:bg-[#16202e] rounded-md p-4 transition duration-300">
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
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (onAddClick) onAddClick();
                                }}
                                className="ml-2 w-9 h-9 flex items-center justify-center bg-cyan-400 rounded-full text-white hover:bg-cyan-500 active:bg-cyan-600 shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
                                title="Əlavə et"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-6 h-6"
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
        </div>
    );
}

export default Cards;
