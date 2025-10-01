import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5057';

export interface InsightSearchParams {
    position: string;
    companies: string;
    yearsExperience: number;
    remote: boolean;
}

interface SkillDetail {
    name: string;
    description: string;
    proficiencyLevel: string;
    category: string | undefined;
}

export interface Insight {
    id: string | undefined;
    summary: string;
    skills: SkillDetail[];
    feedback: string | undefined;
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

export async function fetchInsights(params: InsightSearchParams): Promise<Insight[]> {
    try {
        const snakeCaseParams = Object.keys(params).reduce((acc: Record<string, any>, key: string) => {
            const snakeKey = camelToSnakeCase(key);
            acc[snakeKey] = (params as Record<string, any>)[key];
            return acc;
        }, {} as Record<string, any>);

        const response = await axios.get(`${API_BASE_URL}/job-insights`, { params: snakeCaseParams });
        return convertObjectKeysToCamelCase(response.data);
    } catch (error) {
        console.error('Error fetching insights:', error);
        return [];
    }
}
