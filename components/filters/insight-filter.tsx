'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import NumberInput from './number-input/number-input';

interface InsightFilterProps {
    position: string;
    onPositionChange: (newPosition: string) => void;
    companies: string[];
    onCompaniesChange: (newCompanies: string[]) => void;
    yearsExperience: number;
    onYearsExperienceChange: (newYearsExperience: number) => void;
    isRemote: boolean;
    onIsSRemoteChange: (newRemote: boolean) => void;
    onSearch: () => void;
}

export default function InsightFilter({
    position,
    onPositionChange,
    companies,
    onCompaniesChange,
    yearsExperience,
    onYearsExperienceChange,
    isRemote,
    onIsSRemoteChange,
    onSearch,
}: InsightFilterProps) {

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
                    label='Companies (comma separated)'
                    value={companies.join(',')}
                    onChange={(e) => onCompaniesChange(e.target.value.split(',').map(c => c.trim()))}
                    onKeyUp={handleKeyUp}
                    variant='outlined'
                    sx={{ width: '45%' }}
                />
            </div>
            <div style={{ marginTop: '16px', marginBottom: '16px'}}>
                <NumberInput
                    value={yearsExperience}
                    onChange={onYearsExperienceChange}
                    label='Years of Experience' />
            </div>
            <div>
                <FormControlLabel
                    control={
                        <Switch
                            checked={isRemote}
                            onChange={(e) => onIsSRemoteChange(e.target.checked)}
                            color='primary'
                        />
                    }
                    label='Remote Only'
                    sx={{ marginLeft: '8px' }}
                />
                <Button
                    variant='contained'
                    color='primary'
                    startIcon={<SearchIcon />}
                    onClick={onSearch}
                    sx={{ margin: '8px' }}
                >
                    Search
                </Button>
            </div>
        </Box>
    );
}
