import React, { useState } from 'react';

function Cards({ image, songName, author }) {
    const [pressed, setPressed] = useState(false);

    return (
        <div className="w-full px-5">
            <div
                className={`max-w-[361px] w-full rounded-md p-4 mx-auto cursor-pointer transition-all duration-200 transform ${pressed ? 'bg-[#1a153a] scale-[0.98] shadow-lg' : 'bg-[#0A071E]'
                    } hover:bg-[#1a153a] hover:shadow-lg hover:scale-[0.98] active:scale-[0.97]`}
                onTouchStart={() => setPressed(true)}
                onTouchEnd={() => setPressed(false)}
                onMouseDown={() => setPressed(true)}
                onMouseUp={() => setPressed(false)}
                onMouseLeave={() => setPressed(false)}
            >
                <div className="w-full flex p-2 rounded-lg">
                    <img
                        src={image}
                        alt={songName || "Song"}
                        className="w-[88px] h-[88px] rounded-[8px] object-cover"
                        style={{ opacity: 0.85 }}
                    />
                    <div className="ml-4 flex flex-col justify-between py-1">
                        <div className="w-full max-w-[197px] text-[22px] font-normal leading-[22px] tracking-[-0.41px] font-[Nunito] text-[#F2F2F2]">
                            {songName}
                        </div>
                        <div className="w-full max-w-[200px] text-[16px] font-normal leading-[18px] tracking-[-0.08px] font-[Nunito] text-[#DEDEDE]">
                            {author}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cards;
