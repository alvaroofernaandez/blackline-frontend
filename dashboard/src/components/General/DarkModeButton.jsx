import React, { useEffect } from 'react';
import { CgDarkMode } from 'react-icons/cg';

const DarkModeButton = () => {
  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={toggleDarkMode}
      className="bg-neutral-700 dark:bg-neutral-900 text-white p-3 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-800 transition-all duration-300"
    >
      <CgDarkMode />
    </button>
  );
};

export default DarkModeButton;
