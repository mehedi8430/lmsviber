import { User } from "@/model/user-model";
import dbConnect from "@/service/mongo";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    const { firstName, lastName, email, password, confirmPassword, userRole } = await request.json();

    await dbConnect();

    if (password !== confirmPassword) {
        return new NextResponse("Passwords do not match!", {
            status: 401,
        });
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
        return new NextResponse("User with this Email already in exist!", {
            status: 400,
        });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: userRole
    }

    try {
        await User.create(newUser);

        return new NextResponse("User has been created", {
            status: 201,
        });
    } catch (error) {
        console.error(error);
        return new NextResponse(error.message, {
            status: 500,
        });
    }
}