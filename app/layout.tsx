import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';
import Box from '@mui/material/Box';

import ThemeToggleProvider from '@/context/theme-toggle-provider';
import PageHeader from '@/components/shell/page-header';
import PageFooter from '@/components/shell/page-footer';
import './globals.css';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto',
});

export const metadata: Metadata = {
    title: 'Job Searcher',
    description: 'A web UI frontend written in Next.js to display the Agentic AI job search output',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' className={roboto.variable}>
            <body>
                <AppRouterCacheProvider>
                    <ThemeToggleProvider>
                        <PageHeader />
                        <Box sx={{ padding: '16px' }}>
                            {children}
                        </Box>
                        <PageFooter />
                    </ThemeToggleProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
