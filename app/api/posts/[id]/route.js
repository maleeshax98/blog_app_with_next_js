import prisma from "@/libs/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/route";
import mongoose from "mongoose";

export async function GET(req, { params }){
    try {
        console.log("params")
        
        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            
            return NextResponse.json({error: "Not Found"}, { status: 404 })
        }

        const posts = await prisma.post.update({
            where: {
                id: params.id
            },
            include: {
                user: true,
            },
            data: {
                views: {
                  increment: 1, // Increment by 1
                },
            },
        })

        return NextResponse.json({ posts }, {status: 200})

    } catch (error) {
        console.log(error)

        return NextResponse.json({ error: "Somthing went wrong!"}, {status: 400})
    }

}


export async function DELETE(req, { params }){
    try {
        
        const session = await getServerSession(AuthOptions)
        console.log(session)
        if(!session){
            return NextResponse.json({error: "User is not authenticated1"}, { status: 403 })
        }

        if (!mongoose.Types.ObjectId.isValid(session?.user?.id)) {
            
            return NextResponse.json({error: "User is not authenticated2"}, { status: 404 })
        }

        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            
            return NextResponse.json({error: "Not Found"}, { status: 404 })
        }

        
        const post = await prisma.post.findUnique({
            where: {
                id: params.id
            },
            include: {
                user: true,
            }
        })

        if(post.userId != session?.user?.id){
            return NextResponse.json({ error: "Somthing went wrong!"}, {status: 400})
        }

        const del = await prisma.post.delete({
            where: {
                id: params.id
            }
        })

        return NextResponse.json({ deleted: true }, {status: 200})

    } catch (error) {
        console.log(error)

        return NextResponse.json({ error: "Somthing went wrong!"}, {status: 400})
    }

}