"use client"
import SingleCard from '@/components/singleCard/SingleCard';
import useDeletePost from '@/hooks/useDeletePost';
import useGetMyPosts from '@/hooks/useGetMyPosts';
import Image from 'next/image';
import React from 'react'

export default function Page(  ) {

  const { data, error, loading } = useGetMyPosts()
  const { deletePost, error: delError } = useDeletePost()
  return (
    <div>
      <div className='mt-[50px]'>
        <h1 className='font-bold text-2xl'>My posts posts</h1>
        <h1 className='mb-[10px] font-light text-sm text-gray-400'>Posts Uploaded by you</h1>
        { error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{ error }</span>
          </div>
        )}
        { delError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{ delError }</span>
          </div>
        )}
        {loading && (
          <h1 className='font-bold text-xl text-center'>Loading....</h1>
        )}
        <div>
          { data && data.map((doc) => (
            <div className='mt-[20px]'>
              <Image src="/icons/delete.svg" width={20} height={20} onClick={() => { deletePost(doc.id) }}/>
              <SingleCard 
                key={doc.id}
                id={doc.id}
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
