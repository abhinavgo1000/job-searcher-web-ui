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

export async function fetchInsights(params: InsightSearchParams): Promise<Insight[]> {
    try {
        const queryParams = new URLSearchParams();
        queryParams.append('position', params.position);
        queryParams.append('companies', params.companies);
        queryParams.append('yearsExperience', params.yearsExperience.toString());
        queryParams.append('remote', params.remote.toString());

        const response = await fetch(`/api/job-insights?${queryParams.toString()}`);
        return response.json();
    } catch (error) {
        console.error('Error fetching insights:', error);
        return [];
    }
}
