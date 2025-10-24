import { Connect } from "../../../database/connection";
import { User } from "../../../model/user";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        // Ensure we have a database connection
        await Connect();
 
        const { email } = await request.json();
 
        if (!email) {
            return NextResponse.json({ message: "Email is required." }, { status: 400 });
        }
 
        // Check if user already exists
        const existingUser = await User.findOne({ email });
 
        if (existingUser) {
            return NextResponse.json({ message: "User with this email already exists." }, { status: 409 }); // 409 Conflict
        }
 
        // Create and save the new user
        const newUser = new User({ email });
        await newUser.save();
 
        return NextResponse.json({ message: "User created successfully!", user: newUser }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "An internal server error occurred." }, { status: 500 });
    }
};

export const GET = async () => {
    try {
        await Connect();
        const users = await User.find({});
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ message: "An internal server error occurred." }, { status: 500 });
    }
};

export const DELETE = async (request) => {
    try {
        await Connect();

        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ message: "Email query parameter is required." }, { status: 400 });
        }

        const userToDelete = await User.findOne({ email });

        if (!userToDelete) {
            return NextResponse.json({ message: "User with this email not found." }, { status: 404 });
        }

        await User.deleteOne({ email });

        return NextResponse.json({ message: "User deleted successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ message: "An internal server error occurred." }, { status: 500 });
    }
};