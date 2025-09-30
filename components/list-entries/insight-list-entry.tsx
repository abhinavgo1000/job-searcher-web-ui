import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface SkillDetail {
    name: string;
    description: string;
    proficiencyLevel: string;
    category: string | undefined;
}

interface JobListEntryProps {
    summary: string;
    skills: SkillDetail[];
    feedback: string | undefined;
}

export default function InsightListEntry(props: JobListEntryProps) {

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
                            Skill Insights
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                            {props.summary}
                        </Typography>
                        <Box sx={{ mb: 1.5 }}>
                            {props.skills.map((skill, index) => (
                                <Box key={index} sx={{ mb: 1 }}>
                                    <Typography variant='subtitle1'>{skill.name} ({skill.proficiencyLevel})</Typography>
                                    <Typography variant='body2' color='text.secondary'>{skill.description}</Typography>
                                    {skill.category && <Typography variant='caption' color='text.secondary'>Category: {skill.category}</Typography>}
                                </Box>
                            ))}
                        </Box>
                        {props.feedback && (
                            <Typography variant='body2' color='text.secondary'>
                                Feedback: {props.feedback}
                            </Typography>
                        )}
                    </CardContent>
                    <CardActions>
                        <Button size='small' onClick={() => handleLearnMore(undefined)}>Learn More</Button>
                    </CardActions>
                </Card>
            </Box>
        </React.Fragment>
    );
}
