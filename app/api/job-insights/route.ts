import { run } from '@openai/agents';
import type { AgentInputItem } from '@openai/agents';
import { setDefaultOpenAIKey } from '@openai/agents';

setDefaultOpenAIKey(process.env.OPENAI_API_KEY || '');

import { techStackResearcher } from '@/agents/agents';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const position = searchParams.get('position') || '';
    const companies = searchParams.get('companies') || '';
    const yearsExperience = searchParams.get('yearsExperience') || 0;
    const remote = searchParams.get('remote') === 'true';

    // Validate parameters
    if (!position && !companies && !yearsExperience) {
        return new Response(JSON.stringify({ error: 'At least one of position, companies, or years of experience must be provided.' }), { status: 400 });
    }

    const agentInput: AgentInputItem[] = [];

    try {
        const result = await run(
            techStackResearcher,
            agentInput.concat({
                role: 'user',
                content: `Analyze the following job search parameters and provide detailed job insights including required skills, 
                proficiency levels, and feedback for a candidate looking for a position as ${position} 
                at companies like ${companies} with ${yearsExperience} years of experience ${remote ? ' in a remote role' : ''}.`
            })
        );
        return new Response(JSON.stringify(result.finalOutput?.insights), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'An error occurred while fetching job insights.' }), { status: 500 });
    }
}
