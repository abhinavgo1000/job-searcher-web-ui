import * as React from 'react';
import Typography from '@mui/material/Typography';

import InsightSearchArea from '@/components/search-areas/insight-search-area';

export default function JobInsightsPage() {
    return (
        <React.Fragment>
            <Typography variant='h3' component='h1' gutterBottom>
                Welcome to Job Insights!
            </Typography>
            <Typography variant='h5' component='h3' gutterBottom>
                Use the filters below to get our AI agent to gather insights about job trends, skill sets required, and more.
            </Typography>
            <InsightSearchArea />
        </React.Fragment>
    );
}
