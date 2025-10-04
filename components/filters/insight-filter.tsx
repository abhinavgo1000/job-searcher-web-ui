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
    positionError?: string;
    companies: string[];
    onCompaniesChange: (newCompanies: string[]) => void;
    companiesError?: string;
    yearsExperience: number;
    onYearsExperienceChange: (newYearsExperience: number) => void;
    isRemote: boolean;
    onIsSRemoteChange: (newRemote: boolean) => void;
    isSearchButtonDisabled?: boolean;
    onSearch: () => void;
}

export default function InsightFilter(props: InsightFilterProps) {

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
                    label='Companies (comma separated)'
                    value={props.companies.join(',')}
                    required
                    onChange={(e) => props.onCompaniesChange(e.target.value.split(',').map(c => c.trim()))}
                    error={!!props.companiesError}
                    helperText={props.companiesError}
                    variant='outlined'
                    sx={{ width: '45%' }}
                />
            </div>
            <div style={{ marginTop: '16px', marginBottom: '16px'}}>
                <NumberInput
                    value={props.yearsExperience}
                    onChange={props.onYearsExperienceChange}
                    label='Years of Experience' />
            </div>
            <div>
                <FormControlLabel
                    control={
                        <Switch
                            checked={props.isRemote}
                            onChange={(e) => props.onIsSRemoteChange(e.target.checked)}
                            color='primary'
                        />
                    }
                    label='Remote Only'
                    sx={{ marginLeft: '8px' }}
                />
                <Button
                    variant='contained'
                    color='primary'
                    disabled={props.isSearchButtonDisabled}
                    startIcon={<SearchIcon />}
                    onClick={props.onSearch}
                    sx={{ margin: '8px' }}
                >
                    Search
                </Button>
            </div>
        </Box>
    );
}
