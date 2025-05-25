// Search.jsx
import React from 'react';

function Search({ onSearch }) {
  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    onSearch(query);
  };

  return (
    <div className="w-full px-4 py-4 max-w-[390px] mx-auto flex items-center justify-between mb-6">
      <div className="text-[#F2F2F2] font-[Nunito] font-semibold text-[26px] leading-[20px] tracking-[-0.24px] w-[159px]">
        Listen The<br />Latest Musics
      </div>

      <div className="flex items-center bg-[#F2F2F2] rounded-full w-[163px] h-[48px] px-3 transition-shadow duration-200 hover:shadow-md focus-within:shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-[18px] h-[18px] text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
        </svg>

        <input
          type="text"
          placeholder="Search Music"
          onChange={handleChange}
          className="ml-2 bg-transparent w-[81px] h-[26px] text-[14px] text-black placeholder-gray-500 font-[Nunito] 
                     focus:outline-none focus:placeholder-gray-400 
                     focus:text-black transition-all duration-200"
        />
      </div>
    </div>
  );
}

export default Search;
