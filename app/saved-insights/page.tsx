import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function SavedInsightsPage() {
    return (
        <React.Fragment>
            <Box sx={{ padding: '16px' }}>
                <Typography variant='h3' component='h1' gutterBottom>
                    Saved Insights Page
                </Typography>
                <Typography variant='h5' component='h3' gutterBottom>
                    This is where your saved insights will appear.
                </Typography>
            </Box>
        </React.Fragment>
    );
}
