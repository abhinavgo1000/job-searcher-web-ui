'use client';
import * as React from 'react';
import Box from '@mui/material/Box';

import InsightFilter from '@/components/filters/insight-filter';
import InsightListEntry from '@/components/list-entries/insight-list-entry';
import { fetchInsights, Insight } from '@/networking/insight-search';

export default function InsightSearchArea() {
    const [position, setPosition] = React.useState('');
    const [companies, setCompanies] = React.useState<string[]>([]);
    const [yearsExperience, setYearsExperience] = React.useState(0);
    const [isRemote, setIsRemote] = React.useState(false);
    const [insights, setInsights] = React.useState<Insight[]>([]);

    const handleSearch = async () => {
        setInsights(await fetchInsights({ position, companies: companies, yearsExperience, remote: isRemote }));
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
            {insights.map((insight, index) => (
                <InsightListEntry
                    key={index}
                    {...insight}
                />
            ))}
        </Box>
    );
}
