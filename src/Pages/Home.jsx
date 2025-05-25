import React, { useState } from 'react';
import Navbar from '../Companents/Navbar';
import Cards from '../Companents/Cards';
import HomeTitle from '../Companents/HomeTitle';
import Search from '../Companents/Search';
import defaultImage from "../img/img234.png";
import { useNavigate } from 'react-router-dom';

function Home({ test }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleCardClick = (index) => {
    navigate('/library', { state: { audioFiles: filteredSongs, currentIndex: index } });
  };

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm.toLowerCase());
  };

  const filteredSongs = test?.filter(item =>
    item.name.toLowerCase().includes(query) ||
    item.author.toLowerCase().includes(query)
  ) || [];

  const isEmpty = filteredSongs.length === 0;

  return (
    <>
      <HomeTitle />
      <Search onSearch={handleSearch} />

      {isEmpty ? (
        <Cards
          image={defaultImage}
          songName="No Song Found"
          author="Try different keywords"
        />
      ) : (
        filteredSongs.map((item, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            className="cursor-pointer active:scale-95 transition-transform duration-100"
          >
            <Cards
              image={item.image}
              songName={item.name}
              author={item.author}
            />
          </div>
        ))
      )}
      <div style={{ height: '85px' }}>
        <Navbar />
      </div>
    </>
  );
}

export default Home;
