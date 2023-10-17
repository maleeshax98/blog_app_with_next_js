import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function useGetMyPosts() {
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    const get = async () => {

        try {
            setError(null)
            setLoading(true)
            
            const res = await axios.get("/api/posts/acount")
            
            console.log(res)

            if(res?.data?.posts){
                setLoading(false)
                setData(res?.data?.posts)
            }

            setLoading(false)
        } catch(err){
            setLoading(false)
            console.log("error", err)
            if(err?.response?.data?.error){
                console.log(err?.response?.data?.error)
                setError(err?.response?.data?.error)
            }else{
                setError("Somthing went wrong")
            }
        }
    }

    useEffect(() => {
        get()
    }, [])

    return { error, loading, get, data}

}
