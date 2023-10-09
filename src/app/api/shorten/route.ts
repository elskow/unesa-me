import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

import connectMongoDB from '@/utils/connectMongoDb';
import UrlModels from '@/db/UrlModels';

const verifyEndpoint =
    'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const secret = process.env.SECRET_KEY;

export async function POST(request: Request) {
    try {
        const requestData = await request.json();

        if (!requestData.url && !requestData.token) {
            return NextResponse.json(
                { message: 'Invalid parameters' },
                { status: 400 },
            );
        }

        const token = requestData.token;
        let res;

        if (secret !== undefined) {
            res = await fetch(verifyEndpoint, {
                method: 'POST',
                body: `secret=${encodeURIComponent(
                    secret,
                )}&response=${encodeURIComponent(token)}`,
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                },
            });
        } else {
            return NextResponse.json(
                { message: 'Invalid secret key' },
                { status: 400 },
            );
        }

        const data = await res.json();

        if (data.success) {
            let url;
            let unique;
            const ipaddress = await fetch('https://api.ipify.org?format=json')
                .then((res) => res.json())
                .then((res) => res.ip);

            url = requestData.url;

            await connectMongoDB();

            if (!requestData.customAddress) {
                unique = nanoid(5);
            } else {
                const existingUrl = await UrlModels.findOne({
                    unique: requestData.customAddress,
                });

                if (existingUrl) {
                    return NextResponse.json(
                        { message: 'Custom unique already exists' },
                        { status: 400 },
                    );
                }

                unique = requestData.customAddress;
            }

            const query = await UrlModels.create({
                url: url,
                unique: unique,
                ipaddress: ipaddress,
            });

            return NextResponse.json(
                { message: 'Success shorten URL', data: query },
                { status: 200 },
            );
        } else {
            return NextResponse.json(
                { message: 'Cant confirmation your security code' },
                { status: 400 },
            );
        }
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 },
        );
    }
}
