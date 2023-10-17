
import CardList from '@/components/cardList/CardList'
import useGetPopularPosts from '@/hooks/useGetPopularPosts'
import React from 'react'

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

export default async function Page() {
  const data = await useGetPopularPosts()
  return (
    <div>
      <div className='mt-[50px]'>
        <h1 className='font-bold text-2xl'>Popular Posts</h1>
        <h1 className='mb-[10px] font-light text-sm text-gray-400'>Hot & Popular posts</h1>
        { data?.posts && <CardList data={data?.posts.slice(0, 15)} />}

      </div>
    </div>
  )
}
