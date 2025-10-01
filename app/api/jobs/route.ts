export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const position = searchParams.get('position') || '';
    const location = searchParams.get('location') || '';
    const workday = searchParams.get('workday') || undefined;
    const includeNetflix = searchParams.get('include_netflix') === 'true';
    const strict = searchParams.get('strict') === 'true';

    // Validate parameters
    if (!position && !location && !workday) {
        return new Response(JSON.stringify({ error: 'At least one of position, location, or workday must be provided.' }), { status: 400 });
    }

    // Construct the query parameters
    const queryParams = new URLSearchParams();
    if (position) queryParams.append('position', position);
    if (location) queryParams.append('location', location);
    if (workday) queryParams.append('workday', workday);
    queryParams.append('include_netflix', includeNetflix.toString());
    queryParams.append('strict', strict.toString());

    try {
        const response = await fetch(`${process.env.BACKEND_API_URL || 'http://localhost:5057'}/jobs?${queryParams.toString()}`);
        if (!response.ok) {
            return new Response(JSON.stringify({ error: 'Failed to fetch job listings from backend.' }), { status: response.status });
        }
        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'An error occurred while fetching job listings.' }), { status: 500 });
    }
}
