import * as React from 'react';
import Typography from '@mui/material/Typography';

import JobSearchArea from '@/components/search-areas/job-search-area';

export default function Home() {
    return (
        <React.Fragment>
            <Typography variant='h3' component='h1' gutterBottom>
                Welcome to the Job Searcher!
            </Typography>
            <Typography variant='h5' component='h3' gutterBottom>
                Change the filters below to let our AI agents work their magic and find the best jobs suited for you.
            </Typography>
            <JobSearchArea />
        </React.Fragment>
    );
}
