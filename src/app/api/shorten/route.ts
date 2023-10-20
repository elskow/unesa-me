import { NextResponse } from 'next/server';

import connectMongoDB from '@/utils/connectMongoDb';
import UrlModels from '@/db/UrlModels';
import { verifyToken } from '@/utils/tokenVerifier';
import getIpAddress from '@/utils/getIpAddress';
import generateUnique from '@/utils/uniqueUrl';

async function createShortUrl(requestData: any): Promise<any> {
    if (!requestData.url || !requestData.token) {
        throw new Error('Invalid parameters');
    }

    const token = requestData.token;
    const isTokenValid = await verifyToken(token);

    if (!isTokenValid) {
        throw new Error('Cannot confirm your security code');
    }
    await connectMongoDB();

    const ipaddress = await getIpAddress();
    const unique = await generateUnique(requestData.customAddress);

    const query = await UrlModels.create({
        url: requestData.url,
        unique,
        ipaddress,
    });

    return query;
}

export async function POST(request: Request) {
    try {
        const requestData = await request.json();
        const data = await createShortUrl(requestData);

        return NextResponse.json(
            { message: 'Success shorten URL', data },
            { status: 200 },
        );
    } catch (error) {
        const message = error.message || 'Internal server error';
        const status = error.status || 500;

        return NextResponse.json({ message }, { status });
    }
}
