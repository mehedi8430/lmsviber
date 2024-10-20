import { getLoggedInUser } from "@/lib/loggedin-user";
import dbConnect from "@/service/mongo";

import { NextResponse } from "next/server";

export const GET = async (request) => {
    const loggedinUser = await getLoggedInUser();

    if (!loggedinUser) {
        return new NextResponse(`You are not authenticated!`, {
            status: 401,
        });
    }

    await dbConnect();

    try {
        return new NextResponse(JSON.stringify(loggedinUser), {
            status: 200,
        });

    } catch (err) {
        return new NextResponse(err.message, {
            status: 500,
        });
    }
}