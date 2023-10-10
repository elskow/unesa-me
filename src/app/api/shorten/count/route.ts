import { NextResponse } from "next/server";

import connectMongoDB from "@/utils/connectMongoDb";
import UrlModels from "@/db/UrlModels";

export async function GET(request: Request) {
    await connectMongoDB();
    const count = await UrlModels.countDocuments();

    return NextResponse.json({ count });
}