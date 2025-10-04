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
    positionError?: string;
    location: string;
    onLocationChange: (newLocation: string) => void;
    locationError?: string;
    workDayUrl?: string;
    onWorkDayUrlChange?: (newUrl: string) => void;
    includeNetflix: boolean;
    onIncludeNetflixChange: (newIncludeNetflix: boolean) => void;
    isStrictMode: boolean;
    onIsStrictModeChange: (newIsStrictMode: boolean) => void;
    isSearchButtonDisabled?: boolean;
    onSearch: () => void;
}

export default function SearchFilter(props: SearchFilterProps) {

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
                    value={props.position}
                    required
                    onChange={(e) => props.onPositionChange(e.target.value)}
                    error={!!props.positionError}
                    helperText={props.positionError}
                    variant='outlined'
                    sx={{ width: '45%' }}
                />
                <TextField
                    label='Location'
                    value={props.location}
                    required
                    onChange={(e) => props.onLocationChange(e.target.value)}
                    error={!!props.locationError}
                    helperText={props.locationError}
                    variant='outlined'
                    sx={{ width: '45%' }}
                />
            </div>
            <div>
                <TextField
                    label='Workday URL (Optional)'
                    value={props.workDayUrl}
                    onChange={(e) => props.onWorkDayUrlChange && props.onWorkDayUrlChange(e.target.value)}
                    variant='outlined'
                    sx={{ width: '91%' }}
                />
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={props.includeNetflix}
                            onChange={(e) => props.onIncludeNetflixChange(e.target.checked)}
                            color='primary'
                        />
                    }
                    label='Include Netflix Jobs'
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={props.isStrictMode}
                            onChange={(e) => props.onIsStrictModeChange(e.target.checked)}
                            color='primary'
                        />
                    }
                    label='Strict Mode'
                />
                <Button
                    variant='contained'
                    color='primary'
                    disabled={props.isSearchButtonDisabled}
                    startIcon={<SearchIcon />}
                    onClick={props.onSearch}
                >
                    Search
                </Button>
            </div>
        </Box>
    );
}
