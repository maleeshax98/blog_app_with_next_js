"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function useGetSinglePost(id) {
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    console.log(process.env.NEXT_PUBLIC_BASE_URL)
    const get = async (id) => {

        try {
            setError(null)
            setLoading(true)
            
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`)
            
            console.log(res)

            if(res?.data?.posts){
                setLoading(false)
                setData(res?.data?.posts)
            }

            setLoading(false)
        } catch(err){
            setLoading(false)
            if(err?.response?.data?.error){
                setError(err?.response?.data?.error)
            }else{
                setError("Somthing went wrong")
            }
        }
    }

    useEffect(() => {
        get(id)
    }, [id])

    return { error, loading, data}

}
