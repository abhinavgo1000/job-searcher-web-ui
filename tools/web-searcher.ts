import { tool } from '@openai/agents';
import z from 'zod';

export const serperWebSearch = tool({
    name: 'serper_web_search',
    description: 'Use this tool to perform a web search using the Serper API. Input should be a search query string. The output will be the search results in JSON format.',
    parameters: z.object({
        query: z.string().describe('The search query string.'),
    }),
    async execute({ query }) {
        const response = await fetch('https://google.serper.dev/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': process.env.SERPER_API_KEY || '',
            },
            body: JSON.stringify({ q: query }),
        });

        if (!response.ok) {
            throw new Error(`Serper API request failed with status ${response.status}`);
        }

        const data = await response.json();
        return JSON.stringify(data);
    }
});

// Note: Ensure that the SERPER_API_KEY environment variable is set with your Serper API key.
