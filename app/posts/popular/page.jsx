import CardList from '@/components/cardList/CardList'
import React from 'react'

const getData = async () => {
  const res = await fetch(`/api/posts/popular`, {
      cache: "no-store",
  });

  if (!res.ok) {
      throw new Error("Failed");
  }

  return res.json();
}
export default async function Page() {

const data = await getData()
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
