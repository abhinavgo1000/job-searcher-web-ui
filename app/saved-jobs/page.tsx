import * as React from 'react';
import Typography from '@mui/material/Typography';

export default function SavedJobsPage() {
    return (
        <React.Fragment>
            <Typography variant='h3' component='h1' gutterBottom>
                Saved Jobs Page
            </Typography>
            <Typography variant='h5' component='h3' gutterBottom>
                This is where your saved jobs will appear.
            </Typography>
        </React.Fragment>
    );
}
