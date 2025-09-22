'use client';
import { useRouter } from 'next/router';

export default function JobDetails() {
    const router = useRouter();
    const { id } = router.query;

    return <div>Job Details Page</div>;
}
