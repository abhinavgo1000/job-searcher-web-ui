import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import JobSearchArea from '@/components/search-areas/job-search-area';

export default function Home() {
    return (
        <React.Fragment>
            <Box sx={{ padding: '16px' }}>
                <Typography variant='h3' component='h1' gutterBottom>
                    Welcome to the Job Searcher!
                </Typography>
                <Typography variant='h5' component='h3' gutterBottom>
                    Change the filters below to let our AI agents work their magic and find the best jobs suited for you.
                </Typography>
            </Box>
            <JobSearchArea />
        </React.Fragment>
    );
}
