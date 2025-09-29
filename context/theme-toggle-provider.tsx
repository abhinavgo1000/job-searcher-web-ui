'use client';
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import theme from '@/theme';

export default function ThemeToggleProvider({ children }: { children: React.ReactNode }) {

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}
