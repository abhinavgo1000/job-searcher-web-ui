import { run } from '@openai/agents';

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

    // Construct the query parameters
    const queryParams = new URLSearchParams();
    if (position) queryParams.append('position', position);
    if (companies) queryParams.append('companies', companies);
    if (yearsExperience) queryParams.append('yearsExperience', yearsExperience.toString());
    if (remote) queryParams.append('remote', remote.toString());

    try {
        const response = await fetch(`${process.env.BACKEND_API_URL || 'http://localhost:5057'}/job-insights?${queryParams.toString()}`);
        if (!response.ok) {
            return new Response(JSON.stringify({ error: 'Failed to fetch job insights from backend.' }), { status: response.status });
        }
        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'An error occurred while fetching job insights.' }), { status: 500 });
    }
}
