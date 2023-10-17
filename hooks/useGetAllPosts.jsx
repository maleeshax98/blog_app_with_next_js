import axios from "axios";
async function useGetAllPosts(page) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?page=${page || 1}`);
        if (!res.ok) {
                // This will activate the closest `error.js` Error Boundary
                throw new Error('Failed to fetch data')
        }
    
        return res.json()
}

export default useGetAllPosts