import { NextResponse } from 'next/server';
import { model, connect } from 'mongoose';

import { JobListingSchema } from '@/models/job-listing-schema';

const JobListing = model('JobListing', JobListingSchema);

const mongoUser = process.env.MONGODB_USER;
const mongoPassword = process.env.MONGODB_PASSWORD;
const mongoHost = process.env.MONGODB_HOST;
const mongoDb = process.env.MONGODB_DB;

const uri = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoHost}/?retryWrites=true&w=majority&appName=${mongoDb}`;

export async function POST(request: Request) {
    try {
        await connect(uri, { dbName: mongoDb });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: 'Failed to connect to database.' }), { status: 500 });
    }

    try {
        const { jobId, saved } = await request.json();
        if (!jobId || typeof saved !== 'boolean') {
            return new NextResponse(JSON.stringify({ error: 'Invalid request body.' }), { status: 400 });
        }

        const jobListing = await JobListing.findOne({ jobId });
        if (!jobListing) {
            return new NextResponse(JSON.stringify({ error: 'Job listing not found.' }), { status: 404 });
        }

        jobListing.set('saved', saved);
        await jobListing.save();

        return new NextResponse(JSON.stringify({ message: 'Job listing updated successfully.' }), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: 'An error occurred while updating the job listing.' }), { status: 500 });
    }
}
