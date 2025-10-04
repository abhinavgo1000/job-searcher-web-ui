'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import InsightFilter from '@/components/filters/insight-filter';
import InsightListEntry from '@/components/list-entries/insight-list-entry';
import { fetchInsights, Insight } from '@/networking/insight-search';

export default function InsightSearchArea() {
    const [position, setPosition] = React.useState('');
    const [companies, setCompanies] = React.useState<string[]>([]);
    const [yearsExperience, setYearsExperience] = React.useState(0);
    const [isRemote, setIsRemote] = React.useState(false);
    const [positionError, setPositionError] = React.useState('');
    const [companiesError, setCompaniesError] = React.useState('');
    const [isSearchButtonDisabled, setIsSearchButtonDisabled] = React.useState(true);
    const [searchTapped, setSearchTapped] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [insights, setInsights] = React.useState<Insight[]>([]);

    React.useEffect(() => {
        const isDisabled = position.trim() === '' || companies.length === 0 || yearsExperience < 0;
        setIsSearchButtonDisabled(isDisabled);
    }, [position, companies, yearsExperience]);

    const handleSearch = async () => {
        if (position.trim() === '') {
            setPositionError('Position is required.');
        } else {
            setPositionError('');
        }
        if (companies.length === 0) {
            setCompaniesError('At least one company is required.');
        } else {
            setCompaniesError('');
        }
        setSearchTapped(true);
        setIsLoading(true);
        const results = await fetchInsights({ position, companies: companies.join(','), yearsExperience, remote: isRemote });
        setInsights(results);
        setIsLoading(false);
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
                positionError={positionError}
                companiesError={companiesError}
                isSearchButtonDisabled={isSearchButtonDisabled}
                onSearch={handleSearch}
            />
            {!searchTapped && (
                <Card variant='outlined' sx={{ padding: '16px', marginTop: '16px' }}>
                    <Typography variant='body2'>Please enter search criteria and tap &quot;Search&quot; to find job insights.</Typography>
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
            {searchTapped && !isLoading && insights.length === 0 && (
                <Card variant='outlined' sx={{ padding: '16px', marginTop: '16px' }}>
                    <Typography variant='body2'>No job insights found. Please adjust your search criteria and try again.</Typography>
                </Card>
            )}
            {searchTapped && !isLoading && insights.length > 0 && insights.map((insight, index) => (
                <InsightListEntry
                    key={index}
                    {...insight}
                />
            ))}
        </Box>
    );
}
