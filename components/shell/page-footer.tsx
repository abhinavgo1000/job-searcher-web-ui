import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function PageFooter() {
    return (
        <Box component='footer' sx={{ padding: '16px', textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
                &copy; {new Date().getFullYear()} Abhinav Goel. All rights reserved.
            </Typography>
            <Typography variant="body2" color="textSecondary">
                <Link href="/privacy-policy" color="inherit">Privacy Policy</Link> | <Link href="/terms-of-service" color="inherit">Terms of Service</Link>
            </Typography>
        </Box>
    );
}
