"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function useGetSinglePost(id) {
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    const get = async (id) => {

        try {
            setError(null)
            setLoading(true)
            
            const res = await axios.get(`http://localhost:3000/api/posts/${id}`)
            
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
