'use client';
import * as React from 'react';
import Box from '@mui/material/Box';

import InsightFilter from '@/components/filters/insight-filter';

export default function InsightSearchArea() {
    const [position, setPosition] = React.useState('');
    const [companies, setCompanies] = React.useState<string[]>([]);
    const [yearsExperience, setYearsExperience] = React.useState(0);
    const [isRemote, setIsRemote] = React.useState(false);

    const handleSearch = () => {
        // Implement the search logic here
        console.log('Searching for:', { position, companies, yearsExperience, isRemote });
    };

    return (
        <Box sx={{ padding: '16px' }}>
            <InsightFilter
                position={position}
                onPositionChange={setPosition}
                companies={companies}
                onCompaniesChange={setCompanies}
                yearsExperience={yearsExperience}
                onYearsExperienceChange={setYearsExperience}
                isRemote={isRemote}
                onIsSRemoteChange={setIsRemote}
                onSearch={handleSearch}
            />
        </Box>
    );
}
