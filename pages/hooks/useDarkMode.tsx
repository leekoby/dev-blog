/** 2023/06/11 - DarkMode Customhook - by leekoby */
import { useEffect } from 'react';

const THEME_MODE = 'theme-mode';
const defaultTheme = 'light';
const darkTheme = 'dark';

const useDarkMode = () => {
  const storeThemeToLs = (themeMode: string) => {
    localStorage.setItem(THEME_MODE, themeMode);
  };
  const readThemeToLs = () => {
    return localStorage.getItem(THEME_MODE) || '';
  };
  const updateTheme = (newTheme: string, previousTheme?: string) => {
    const { classList } = document.documentElement;
    if (previousTheme) classList.remove(previousTheme);
    classList.add(newTheme);
  };
  const toggleTheme = () => {
    const previousTheme = readThemeToLs();
    const newTheme = previousTheme === defaultTheme ? darkTheme : defaultTheme;
    updateTheme(newTheme, previousTheme);
    storeThemeToLs(newTheme);
  };

  useEffect(() => {
    const oldTheme = readThemeToLs();
    if (oldTheme) {
      return updateTheme(oldTheme);
    }
  }, []);

  return { toggleTheme };
};

export default useDarkMode;
