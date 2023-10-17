"use client"
import axios from 'axios'
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function useDeletePost() {
    const [error, setError] = useState(null)
    const router = useRouter()

    const deletePost = async (id) => {

        try {
            setError(null)
            
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`)

            if(res?.data?.deleted){
                router.push("/posts/my-posts")
                return ( toast.success('Successfully Deleted!') )
            } 

            console.log(res)

        } catch(err){
            console.log(err)
            if(err?.response?.data?.error){
                setError(err?.response?.data?.error)
                return ( toast.error(err?.response?.data?.error) )

            }else{
                setError("Somthing went wrong")
            }
        }
    }

    return { error, deletePost}

}
