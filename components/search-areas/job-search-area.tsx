'use client';
import * as React from 'react';
import Box from '@mui/material/Box';

import SearchFilter from '@/components/filters/search-filter';

export default function JobSearchArea() {
    const [position, setPosition] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [workDayUrl, setWorkDayUrl] = React.useState('');
    const [includeNetflix, setIncludeNetflix] = React.useState(false);
    const [isStrictMode, setIsStrictMode] = React.useState(false);

    const handleSearch = () => {
        // Implement the search logic here
        console.log('Searching for:', { position, location, workDayUrl, includeNetflix, isStrictMode });
    };

    return (
        <Box sx={{ padding: '16px' }}>
            <SearchFilter
                position={position}
                onPositionChange={setPosition}
                location={location}
                onLocationChange={setLocation}
                workDayUrl={workDayUrl}
                onWorkDayUrlChange={setWorkDayUrl}
                includeNetflix={includeNetflix}
                onIncludeNetflixChange={setIncludeNetflix}
                isStrictMode={isStrictMode}
                onIsStrictModeChange={setIsStrictMode}
                onSearch={handleSearch}
            />
        </Box>
    );
}
