'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface Compensation {
    min: number | undefined ;
    max: number | undefined;
    currency: string | undefined;
    period: string | undefined;
    notes: string | undefined;
}

interface JobListEntryProps {
    id: string | undefined;
    source: string;
    company: string;
    title: string;
    location: string | undefined;
    remote: boolean | undefined;
    tech_stack: string[];
    compensation: Compensation | undefined;
    url: string | undefined;
    jobId: string | undefined;
    descriptionSnippet: string | undefined;
}

export default function JobListEntry(props: JobListEntryProps) {

    const router = useRouter();

    const handleLearnMore = (url: string | undefined) => {
        if (url) {
            router.push(url);
        }
    }

    return (
        <React.Fragment>
            <Box sx={{ minWidth: 275 }}>
                <Card variant='outlined'>
                    <CardContent>
                        <Typography variant='h5' component='div'>
                            {props.title}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                            {props.company} - {props.location}
                        </Typography>
                        <Typography variant='body2'>
                            {props.descriptionSnippet}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size='small' onClick={() => handleLearnMore(props.url)}>Learn More</Button>
                    </CardActions>
                </Card>
            </Box>
        </React.Fragment>
    );
}
