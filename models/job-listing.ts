import { z } from 'zod';

const Compensation = z.object({
    min: z.number().optional().nullable(),
    max: z.number().optional().nullable(),
    currency: z.string().optional().nullable(),
    period: z.string().optional().nullable(),
    notes: z.string().optional().nullable()
});

export const JobListing = z.object({
    id: z.string().optional().nullable(),
    source: z.string(),
    company: z.string(),
    title: z.string(),
    location: z.string().optional().nullable(),
    remote: z.boolean().optional().nullable(),
    tech_stack: z.array(z.string()),
    compensation: (Compensation).optional().nullable(),
    url: z.string().optional().nullable(),
    jobId: z.string().optional().nullable(),
    descriptionSnippet: z.string().optional().nullable()
});
