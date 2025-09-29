'use client';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

import { ThemeContext } from '@/context/theme-context';
import theme from '@/theme';

export default function ThemeToggleProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
    const toggleMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

    return (
        <ThemeContext.Provider value={{ mode, toggleMode }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}
