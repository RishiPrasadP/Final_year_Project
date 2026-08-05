import { create } from 'zustand';

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (dark: boolean) => void;
}

const getInitialTheme = (): boolean => {
  const saved = localStorage.getItem('lil_theme');
  if (saved !== null) {
    return saved === 'dark';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const useThemeStore = create<ThemeState>((set) => {
  const initialDark = getInitialTheme();
  if (initialDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return {
    isDarkMode: initialDark,
    toggleTheme: () => set((state) => {
      const nextDark = !state.isDarkMode;
      if (nextDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('lil_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('lil_theme', 'light');
      }
      return { isDarkMode: nextDark };
    }),
    setTheme: (dark) => set(() => {
      if (dark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('lil_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('lil_theme', 'light');
      }
      return { isDarkMode: dark };
    })
  };
});
