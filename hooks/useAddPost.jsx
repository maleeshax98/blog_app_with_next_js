import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function useAddPost( ) {
    const router = useRouter()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const add = async (title, content, media, cato) => {

        try {
            setError(null)
            setLoading(true)
            let img = media
            
            const res = await axios.post("/api/posts", {
                title,
                content,
                img,
                cato
            })
            

            if(res?.data?.post){
                setLoading(false)
                router.push("/")
                return ( toast.success('Successfully Added!') )
            }

            setLoading(false)
        } catch(err){
            setLoading(false)
            if(err?.response?.data?.error){
                setError(err?.response?.data?.error)
                return ( toast.error(err?.response?.data?.error) )

            }else{
                return ( toast.error('Somthing went wrong!') )
            }
        }
    }
    return { error, loading, add}
}
