import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

import connectMongoDB from '@/utils/connectMongoDb';
import UrlModels from '@/db/UrlModels';

const verifyEndpoint =
    'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const secret = process.env.SECRET_KEY;

async function verifyToken(token: string): Promise<boolean> {
    if (secret === undefined) {
        throw new Error('Invalid secret key');
    }

    const res = await fetch(verifyEndpoint, {
        method: 'POST',
        body: `secret=${encodeURIComponent(
            secret,
        )}&response=${encodeURIComponent(token)}`,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
    });

    const data = await res.json();

    return data.success;
}

async function createShortUrl(requestData: any): Promise<any> {
    if (!requestData.url || !requestData.token) {
        throw new Error('Invalid parameters');
    }

    const token = requestData.token;
    const isTokenValid = await verifyToken(token);

    if (!isTokenValid) {
        throw new Error('Cannot confirm your security code');
    }

    const ipaddressRes = await fetch('https://api.ipify.org?format=json');
    const { ip: ipaddress } = await ipaddressRes.json();

    await connectMongoDB();

    let unique;
    const { url, customAddress } = requestData;

    if (!customAddress) {
        unique = nanoid(5);
    } else {
        const existingUrl = await UrlModels.findOne({ unique: customAddress });

        if (existingUrl) {
            throw new Error('Custom unique already exists');
        }

        unique = customAddress;
    }

    const query = await UrlModels.create({
        url,
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
