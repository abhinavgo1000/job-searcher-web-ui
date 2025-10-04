import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5057';

export interface JobSearchParams {
    position: string;
    location: string;
    workday: string | undefined;
    includeNetflix: boolean;
    strict: boolean;
}

interface Compensation {
    min: number | undefined;
    max: number | undefined;
    currency: string | undefined;
    period: string | undefined;
    notes: string | undefined;
}

export interface JobListing {
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

function camelToSnakeCase(camelCaseString: string): string {
    return camelCaseString.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
}

function snakeToCamel(s: any): any {
    return s.replace(/([-_][a-z])/ig, ($1: string) => {
        return $1.toUpperCase()
            .replace('-', '')
            .replace('_', '');
    });
}

function convertObjectKeysToCamelCase(obj: any[] | null): any {
    if (Array.isArray(obj)) {
        return obj.map(item => convertObjectKeysToCamelCase(item));
    } else if (typeof obj === 'object' && obj !== null && !Object.prototype.hasOwnProperty.call(obj, 'constructor')) {
        return Object.keys(obj).reduce((acc: Record<string, any>, key: string) => {
            const camelKey = snakeToCamel(key);
            acc[camelKey] = convertObjectKeysToCamelCase(obj[key]);
            return acc;
        }, {} as Record<string, any>);
    }
    return obj;
}

export async function fetchJobListings(params: JobSearchParams): Promise<JobListing[]> {
    // Convert params keys to snake_case
    const snakeCaseParams: Record<string, any> = {};
    Object.entries(params).forEach(([key, value]) => {
        snakeCaseParams[camelToSnakeCase(key)] = value;
    });
    try {
        const response = await axios.get<JobListing[]>(`${API_BASE_URL}/jobs`, { params: snakeCaseParams });
        return convertObjectKeysToCamelCase(response.data);
    } catch (error) {
        console.error('Error fetching job listings:', error);
        return [];
    }
}

export async function fetchJobDetails(jobId: string): Promise<JobListing | null> {
    try {
        const response = await axios.get<JobListing>(`${API_BASE_URL}/jobs/${jobId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching job details:', error);
        return null;
    }
}
