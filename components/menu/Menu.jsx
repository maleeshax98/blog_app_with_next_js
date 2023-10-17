
import React from 'react'
import Tags from '../tags/Tags'
import SingleMenuCard from '../singleMenuCard/SingleMenuCard'
import useGetPopularPosts from '@/hooks/useGetPopularPosts'


export default async function Menu() {
  const data = await useGetPopularPosts()
  return (
    <div>
        <div>
          <h1 className='font-bold text-2xl'>Categories</h1>
          <h1 className='mb-[20px] font-light text-sm text-gray-400'>Categories we have</h1>
          <div className='flex gap-[10px] flex-wrap'>
            <Tags tag={"Health"} type={"card"} />
            <Tags tag={"Science"} type={"card"} />
            <Tags tag={"Technlogoy"} type={"card"} />
            <Tags tag={"Food"} type={"card"} />
            <Tags tag={"Any"} type={"card"} />
          </div>
        </div>
        <div className='mt-[30px]'>
          <h1 className='font-bold text-2xl'>Most Popular</h1>
          <h1 className='mb-[20px] font-light text-sm text-gray-400'>Most popular posts</h1>
          <div>
            
            { data?.posts && data?.posts.slice(0, 5).map((doc) => (
              <div key={doc.id}>
                  <SingleMenuCard 
                key={doc._id} 
                title={doc.title}
                cato={doc.cato}
                img={doc.img}
                content={doc.content}
              />
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}
