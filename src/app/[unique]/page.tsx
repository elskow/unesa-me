import connectMongoDB from '@/utils/connectMongoDb';
import UrlModels from '@/db/UrlModels';

import { notFound, redirect } from 'next/navigation';

interface Params {
    unique: string; // Define the type of 'unique' property
}

export default async function RedirectPage({ params }: { params: Params }) {
    const { unique } = params;

    await connectMongoDB();
    const result = await UrlModels.findOne({ unique: unique });

    if (result) {
        await UrlModels.updateOne({ unique: unique }, { $inc: { clicked: 1 } });
        return redirect(result.url);
    } else {
        return notFound();
    }
}
