
import axios from "axios";

async function useGetPopularPosts() {
        console.log(typeof window)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/popular`);

        if (!res.ok) {
                // This will activate the closest `error.js` Error Boundary
                throw new Error('Failed to fetch data')
        }

        return res.json()
    
}

export default useGetPopularPosts