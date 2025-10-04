'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import SearchFilter from '@/components/filters/search-filter';
import JobListEntry from '@/components/list-entries/job-list-entry';
import { fetchJobListings, JobListing } from '@/networking/job-search';

export default function JobSearchArea() {
    const [position, setPosition] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [workDayUrl, setWorkDayUrl] = React.useState('');
    const [includeNetflix, setIncludeNetflix] = React.useState(false);
    const [strict, setStrict] = React.useState(false);
    const [positionError, setPositionError] = React.useState('');
    const [locationError, setLocationError] = React.useState('');
    const [isSearchButtonDisabled, setIsSearchButtonDisabled] = React.useState(true);
    const [searchTapped, setSearchTapped] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [jobListings, setJobListings] = React.useState<JobListing[]>([]);

    React.useEffect(() => {
        const isDisabled = position.trim() === '' || location.trim() === '';
        setIsSearchButtonDisabled(isDisabled);
    }, [position, location]);

    const handleSearch = async () => {
        if (position.trim() === '') {
            setPositionError('Position is required.');
        } else {
            setPositionError('');
        }
        if (location.trim() === '') {
            setLocationError('Location is required.');
        } else {
            setLocationError('');
        }
        setSearchTapped(true);
        setIsLoading(true);
        const results = await fetchJobListings({ position, location, workday: workDayUrl || undefined, includeNetflix, strict });
        setJobListings(results);
        setIsLoading(false);
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
                positionError={positionError}
                locationError={locationError}
                isStrictMode={strict}
                onIsStrictModeChange={setStrict}
                isSearchButtonDisabled={isSearchButtonDisabled}
                onSearch={handleSearch}
            />
            {!searchTapped && (
                <Card variant='outlined' sx={{ padding: '16px', marginTop: '16px' }}>
                    <Typography variant='body2'>Please enter search criteria and tap &quot;Search&quot; to find job listings.</Typography>
                </Card>
            )}
            {searchTapped && isLoading && (
                <Card variant='outlined' sx={{ padding: '16px', marginTop: '16px' }}>
                    <Stack spacing={1}>
                        <Skeleton variant='text' />
                        <Skeleton variant='rectangular' />
                        <Skeleton variant='rectangular' />
                    </Stack>
                </Card>
            )}
            {searchTapped && !isLoading && jobListings.length === 0 && (
                <Card variant='outlined' sx={{ padding: '16px', marginTop: '16px' }}>
                    <Typography variant='body2'>No job listings found. Please adjust your search criteria and try again.</Typography>
                </Card>
            )}
            {searchTapped && !isLoading && jobListings.length > 0 && jobListings.map((job, index) => (
                <JobListEntry
                    key={index}
                    {...job}
                />
            ))}               
        </Box>

    );
}
