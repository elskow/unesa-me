import { NextResponse } from "next/server";

import connectMongoDB from "@/utils/connectMongoDb";
import UrlModels from "@/db/UrlModels";

export async function POST(request: Request) {
    try {
        const requestData = await request.json();

        if (!requestData.customAddress) {
            return NextResponse.json(
                { message: "Invalid parameters" },
                { status: 400 }
            );
        }

        const customAddress = requestData.customAddress;

        await connectMongoDB();

        const existingUrl = await UrlModels.findOne({
            unique: customAddress,
        });

        if (existingUrl) {
            return NextResponse.json(
                { message: "Custom address is unavailable" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "Custom address is available" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "There was a network error. Please try again later." },
            { status: 500 }
        );
    }
}