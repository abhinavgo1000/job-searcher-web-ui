'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

interface SearchFilterProps {
    position: string;
    onPositionChange: (newPosition: string) => void;
    location: string;
    onLocationChange: (newLocation: string) => void;
    workDayUrl?: string;
    onWorkDayUrlChange?: (newUrl: string) => void;
    includeNetflix: boolean;
    onIncludeNetflixChange: (newIncludeNetflix: boolean) => void;
    isStrictMode: boolean;
    onIsStrictModeChange: (newIsStrictMode: boolean) => void;
    onSearch: () => void;
}

export default function SearchFilter({
    position,
    onPositionChange,
    location,
    onLocationChange,
    includeNetflix,
    onIncludeNetflixChange,
    workDayUrl,
    onWorkDayUrlChange,
    isStrictMode,
    onIsStrictModeChange,
    onSearch,
}: SearchFilterProps) {

    const handleKeyUp = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <Box 
            component='form'
            noValidate
            autoComplete='off'
            sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '16px', 
                    marginBottom: '24px',
                    '& .MuiTextField-root': { m: 1 }
                }}
        >
            <div>
                <TextField
                    label='Position'
                    value={position}
                    onChange={(e) => onPositionChange(e.target.value)}
                    onKeyUp={handleKeyUp}
                    variant='outlined'
                    sx={{ width: '45%' }}
                />
                <TextField
                    label='Location'
                    value={location}
                    onChange={(e) => onLocationChange(e.target.value)}
                    onKeyUp={handleKeyUp}
                    variant='outlined'
                    sx={{ width: '45%' }}
                />
            </div>
            <div>
                <TextField
                    label='Workday URL (Optional)'
                    value={workDayUrl}
                    onChange={(e) => onWorkDayUrlChange && onWorkDayUrlChange(e.target.value)}
                    onKeyUp={handleKeyUp}
                    variant='filled'
                    sx={{ width: '91%' }}
                />
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={includeNetflix}
                            onChange={(e) => onIncludeNetflixChange(e.target.checked)}
                            color='primary'
                        />
                    }
                    label='Include Netflix Jobs'
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={isStrictMode}
                            onChange={(e) => onIsStrictModeChange(e.target.checked)}
                            color='primary'
                        />
                    }
                    label='Strict Mode'
                />
                <Button
                    variant='contained'
                    color='primary'
                    startIcon={<SearchIcon />}
                    onClick={onSearch}
                >
                    Search
                </Button>
            </div>
        </Box>
    );
}
