import { MusicalNoteIcon, ArrowDownTrayIcon, PlayIcon } from '@heroicons/react/24/outline';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState('music');

  // URL dəyişdikdə aktiv düyməni yenilə
  useEffect(() => {
    if (location.pathname === '/') {
      setActive('music');
    } else if (location.pathname.startsWith('/download')) {
      setActive('download');
    } else if (location.pathname.startsWith('/library')) {
      setActive('play');
    }
  }, [location.pathname]);

  // Dinamik ikon klassı
  const iconClass = (key) =>
    `w-[32.44px] h-[34px] transition-all duration-300 ease-out ${active === key ? 'text-cyan-400 scale-110 drop-shadow-lg' : 'text-white'
    }`;

  return (
    <div className="fixed bottom-0 w-full px-5 sm:px-6 md:px-10 z-50">
      <div className="mx-auto max-w-sm h-[85px] bg-[#0A091E] rounded-tl-[40px] rounded-tr-[40px] shadow-[0px_-5px_20px_0px_#A8BACF1A] flex items-center justify-center">
        <div className="w-[260px] h-[34px] flex justify-between items-center">

          {/* Music Page */}
          <button
            onClick={() => {
              setActive('music');
              navigate('/');
            }}
            className={iconClass('music')}
          >
            <MusicalNoteIcon className="w-full h-full" />
          </button>

          {/* Download Page */}
          <button
            onClick={() => {
              setActive('download');
              navigate('/download');
            }}
            className={iconClass('download')}
          >
            <ArrowDownTrayIcon className="w-full h-full" />
          </button>

          {/* Library / Play Page */}
          <button
            onClick={() => {
              setActive('play');
              navigate('/library');
            }}
            className={iconClass('play')}
          >
            <PlayIcon className="w-full h-full" />
          </button>

        </div>
      </div>
    </div>
  );
}

export default Navbar;