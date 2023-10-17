import prisma from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET(req){
    try {
        const posts = await prisma.post.findMany({
            orderBy: [
                {
                  views: 'desc'
                },
                {
                  createdAt: 'desc'
                }
            ]
        })
        return NextResponse.json({ posts }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Somthing went wrong"}, { status: 400 })
    }
}