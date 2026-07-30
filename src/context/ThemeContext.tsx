'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'minimal';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  themeDetails: {
    name: string;
    description: string;
  };
}

const themeMeta: Record<ThemeMode, { name: string; description: string }> = {
  minimal: {
    name: 'Modern Minimal',
    description: 'Clean, elegant editorial style with high whitespace and terracotta highlights.',
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme] = useState<ThemeMode>('minimal');

  useEffect(() => {
    localStorage.setItem('tiffin_theme', 'minimal');
    document.documentElement.setAttribute('data-theme', 'minimal');
  }, []);

  const setTheme = () => {
    document.documentElement.setAttribute('data-theme', 'minimal');
  };

  return (
    <ThemeContext.Provider value={{ theme: 'minimal', setTheme, themeDetails: themeMeta.minimal }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
