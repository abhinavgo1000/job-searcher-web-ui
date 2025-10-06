import { Agent } from '@openai/agents';

import { serperWebSearch } from '@/tools/web-searcher';
import { MultiJobInsights } from '@/models/job-insight';

// TechStackResearcher agent
export const techStackResearcher = new Agent({
    name: 'TechStackResearcher',
    instructions: (
        `You are an expert tech job analyst for the Indian market.
        Given filter parameters (position name, targeted companies, years of experience, remote or not), analyze each job and produce a MultiJobInsights object.
        For each job, use the serperWebSearch tool to research the latest skill requirements and trends for the given position, company, experience level, and remote status.
        In your analysis, provide:
            - A concise summary of the overall skills and tech stack required.
            - A list of skills, where each skill includes:
                * name: The skill or technology name.
                * description: A detailed explanation of why this skill is relevant for the job.
                * proficiencyLevel: The required proficiency (e.g., Beginner, Intermediate, Expert).
                * category: The skill category (e.g., Frontend, Backend, DevOps, Data, Cloud, etc.).
            - Agent feedback: Add notes or recommendations for the candidate, such as missing skills, upskilling advice, or market trends.
        Your output must be a MultiJobInsights object, with the jobs field listing job titles or IDs, and the insights field containing a JobInsights object for each job.
        Be thorough, accurate, and avoid inventing skills not evidenced in the job description or research.
        If information is missing, note it in the feedback field.
        Always use the serperWebSearch tool for external research before finalizing your insights.`
    ),
    handoffDescription: 'A job insights researcher for multiple jobs with skill categorization, feedback, and web search research',
    outputType: MultiJobInsights,
    tools: [serperWebSearch],  // Register the tool with the agent
});

// Note: The tools and handoffs are commented out as placeholders. You need to implement or import the actual tool and handoff agents for this to work correctly.
