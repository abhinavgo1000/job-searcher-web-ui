import { url } from 'inspector';
import { Schema } from 'mongoose';

export const JobListingSchema = new Schema({
    id: { type: String, required: false },
    source: { type: String, required: true },
    company: { type: String, required: true },
    title: { type: String, required: true },
    location: { type: String, required: false },
    remote: { type: Boolean, required: false },
    techStack: { type: [String], required: true },
    compensation: {
        min: { type: Number, required: false },
        max: { type: Number, required: false },
        currency: { type: String, required: false },
        period: { type: String, required: false },
        notes: { type: String, required: false },
    },
    url: { type: String, required: true },
    jobId: { type: String, required: true, unique: true },
    descriptionSnippet: { type: String, required: false },
});

JobListingSchema.index({ title: 'text', description: 'text', company: 'text', location: 'text' });
