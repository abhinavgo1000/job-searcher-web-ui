'use client';
import * as React from 'react';
import Box from '@mui/material/Box';

import SearchFilter from '@/components/filters/search-filter';
import JobListEntry from '@/components/list-entries/job-list-entry';
import { fetchJobListings, JobListing } from '@/networking/job-search';

export default function JobSearchArea() {
    const [position, setPosition] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [workDayUrl, setWorkDayUrl] = React.useState('');
    const [includeNetflix, setIncludeNetflix] = React.useState(false);
    const [strict, setStrict] = React.useState(false);
    const [jobListings, setJobListings] = React.useState<JobListing[]>([]);

    const handleSearch = async () => {
        setJobListings(await fetchJobListings({ position, location, workday: workDayUrl || undefined, includeNetflix, strict }));
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
                isStrictMode={strict}
                onIsStrictModeChange={setStrict}
                onSearch={handleSearch}
            />
            {jobListings.map((job, index) => (
                <JobListEntry
                    key={index}
                    {...job}
                />
            ))}               
        </Box>

    );
}
