import React from 'react';

export const ThemeContext = React.createContext<{
    mode: 'light' | 'dark';
    toggleMode: () => void;
}>({
    mode: 'light',
    toggleMode: () => {},
});
