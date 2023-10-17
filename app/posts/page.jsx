import CardList from '@/components/cardList/CardList'
import Featured from '@/components/featured/Featured'
import React from 'react'

export default async function Page( { searchParams } ) {
  const page = parseInt(searchParams?.page) || 1;  

  const getData = async () => {
      const res = await fetch(`http://localhost:3000/api/posts?page=${page}`, {
          cache: "no-store",
      });

      if (!res.ok) {
          throw new Error("Failed");
      }

      return res.json();
  }

  const data = await getData()

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
