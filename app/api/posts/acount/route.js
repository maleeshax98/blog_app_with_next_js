import prisma from "@/libs/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/route";
import mongoose from "mongoose";

export async function GET(){
    try {
        const session = await getServerSession(AuthOptions)
        if(!session){
            return NextResponse.json({error: "User is not authenticated"}, { status: 403 })
        }

        if (!mongoose.Types.ObjectId.isValid(session?.user?.id)) {
            
            return NextResponse.json({error: "User is not authenticated"}, { status: 403 })
        }

        const posts = await prisma.post.findMany({
            where: {
                userId: session?.user?.id
            }
        })

        return NextResponse.json({ posts }, {status: 200})

    } catch (error) {
        console.log(error)

        return NextResponse.json({ error: "Somthing went w2355rong!"}, {status: 400})
    }

}