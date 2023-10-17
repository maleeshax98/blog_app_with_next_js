import { getServerSession } from "next-auth";
import { AuthOptions } from "../auth/[...nextauth]/route";
import prisma from "@/libs/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { useSearchParams } from "next/navigation";

export async function POST(req) {
    try {
        const session = await getServerSession(AuthOptions)
        if(!session){
            return NextResponse.json({error: "User is not authenticated"}, { status: 403 })
        }

        if (!mongoose.Types.ObjectId.isValid(session?.user?.id)) {
            return NextResponse.json({error: "User is not authenticated"}, { status: 403 })
        } 

        const body = await req.json()
        
        const { title, content, img, cato } = body

        if(!title.trim()){
            return NextResponse.json({error: "Please give a title"}, { status: 400 })
        }

        if(!content.trim()){
            return NextResponse.json({error: "Please give a content"}, { status: 400 })
        }

        if(!cato.trim()){
            return NextResponse.json({error: "Please select a category"}, { status: 400 })
        }

        if(!img.trim()){
            return NextResponse.json({error: "Please upload a image"}, { status: 400 })
        }

        const post = await prisma.post.create({
            data: {
                title,
                content,
                img,
                cato,
                userId: session?.user?.id
            }
        })

        console.log(post)

        return NextResponse.json({ post }, { status: 200 })

    } catch(err) {
        console.log(err)

        return NextResponse.json({error: "Somthing wesnt wrong"}, { status: 400 })
    }
}


export async function GET(req){
    try {
        const { searchParams } = new URL(req.url);
 
        const page = searchParams.get('page') || 1
        const posts_per_page = 15
        const skip = posts_per_page * (page - 1)

        


        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: posts_per_page,
            skip: skip
        })

        const count = await prisma.post.count()
        console.log(count)
        // console.log(posts)

        return NextResponse.json({ posts, count }, { status: 200 })
    } catch (error) {
        console.log(err)
        return NextResponse.json({error: "Somthing went wrong"}, { status: 400 })
    }
}