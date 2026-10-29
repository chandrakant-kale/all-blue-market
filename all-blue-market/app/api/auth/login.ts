import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        const { shopname, phone, password } = await request.json();
        if (!shopname || !phone || !password ) {
            return NextResponse.json(
                {message:"shopname, number, & password required."},
                {status:400}
            );
        }

        return NextResponse.json(
            {message:"login sucessfully"},
            {status:200}
        );
    } catch (error) {
        return NextResponse.json(
            {message:"internal server error"},
            {status:500}
        )
    }
}