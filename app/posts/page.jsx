import CardList from '@/components/cardList/CardList'
import Featured from '@/components/featured/Featured'
import useGetAllPosts from '@/hooks/useGetAllPosts';
import React from 'react'


export default async function Page( { searchParams } ) {
  const page = parseInt(searchParams?.page) || 1;  
  const data = await useGetAllPosts(page)
  return (
    <div>
      <div className='mt-[50px]'>
        <h1 className='font-bold text-2xl'>All posts</h1>
        <h1 className='mb-[10px] font-light text-sm text-gray-400'>That&apos;s it</h1>
        { data?.posts && <CardList data={data?.posts} count={data?.count}/>}
        
      </div>
    </div>
  )
}
