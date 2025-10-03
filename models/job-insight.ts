import { z } from 'zod';

const SkillDetail = z.object({
    name: z.string(),
    description: z.string(),
    proficiencyLevel: z.string(),
    category: z.string().optional().nullable()
});

export const JobInsights = z.object({
    id: z.string().optional().nullable(),
    summary: z.string(),
    skills: z.array(SkillDetail),
    feedback: z.string().optional().nullable()
});

export const MultiJobInsights = z.object({
    insights: z.array(JobInsights)
});
