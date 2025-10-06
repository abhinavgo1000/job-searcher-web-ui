import { tool } from '@openai/agents';
import z from 'zod';
import axios from 'axios';
import { load } from 'cheerio';

export const webScraper = tool({
    name: 'web_scraper',
    description: 'Use this tool to scrape the content of a webpage. Input should be a valid URL. The output will be the text content of the page.',
    parameters: z.object({
        url: z.string().url().describe('The URL of the webpage to scrape.'),
    }),
    async execute({ url }) {
        try {
            const response = await axios.get(url);
            const html = response.data;
            const $ = load(html);
            const textContent = $('body').text().replace(/\s+/g, ' ').trim();
            return textContent;
        } catch (error: Error | any) {
            throw new Error(`Failed to scrape the webpage: ${error.message}`);
        }
    }
});
