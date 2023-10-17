import CardList from '@/components/cardList/CardList'
import Featured from '@/components/featured/Featured'
import useGetAllPosts from '@/hooks/useGetAllPosts'


export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

export default async function Page() {
  const data = await useGetAllPosts()

  return (
    <div>
      <div>
       {data?.posts && <Featured featured={data.posts[Math.floor(Math.random() * data.posts.length)]}/>}
      </div>
      <div className='mt-[50px]'>
        <h1 className='font-bold text-2xl'>Recent</h1>
        <h1 className='mb-[10px] font-light text-sm text-gray-400'>Recent posts</h1>

          { data?.posts && <CardList data={data?.posts.slice(0, 15 )}/>}
      </div>
    </div>
  )
}
