import { Moon, Sun } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Set initial mode based on local storage or system preference
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(savedMode);
    document.documentElement.classList.toggle('dark', savedMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem('darkMode', newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (

    <>
  
    <div
      onClick={toggleDarkMode}
      className={`w-10 hidden lg:flex h-6  items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
        isDark ? 'bg-gray-700' : ''
      }`}
    >
      <div
        className={`size-4 bg-white rounded-full shadow-md transform ${
          isDark ? 'translate-x-4' : ''
        } transition-transform`}
      ></div>
    </div>
    <div
      onClick={toggleDarkMode}
      className={`size-10 lg:hidden grid place-content-center items-center bg-gray-300 bg-opacity-40 rounded-full p-2 cursor-pointer ${
        isDark ? 'bg-gray-700 bg-opacity-20 ' : ''
      }`}
    >
      <Sun className={`${isDark ? 'hidden':'block text-gray-600'}`}/>
      <Moon className={`${!isDark ? 'hidden':'block text-gray-100'}`}/>
    

    </div>
    </>
  );
};

export default DarkModeToggle;