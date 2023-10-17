import React from 'react'
import Tags from '../tags/Tags'
import SingleMenuCard from '../singleMenuCard/SingleMenuCard'

export default async function Menu() {
  const getData = async () => {
    const res = await fetch("http://localhost:3000/api/posts/popular", {
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
              <SingleMenuCard 
                key={doc._id} 
                title={doc.title}
                cato={doc.cato}
                img={doc.img}
                content={doc.content}
              />
            ))}
          </div>
        </div>
    </div>
  )
}
