"use client"
import useGetSinglePost from '@/hooks/useGetSinglePost'
import React from 'react'
import Image from 'next/image'

export default function Page({ params }) {
  const { id } = params
  const { data, error, loading } = useGetSinglePost(id)
  console.log(data)
  return (
    <div>
      <div className="mt-20px">
        { error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{ error }</span>
          </div>
        )}
        {loading && (
          <h1 className='font-bold text-xl text-center'>Loading....</h1>
        )}
      </div>
      { data && (
        <div className='mt-[20px]'>
          <h1 className='text-2xl font-bold'>{data?.title}</h1>
          <div className="flex items-center gap-[10px]">
            <Image src={data?.user?.image} width={20} height={20} className="rounded-full" alt={data?.user?.name}/>
            <p className="font-light text-sm">{data?.user?.name}</p>
          </div>
          <div className="w-[100%] h-[350px] overflow-hidden relative mt-[30px]">
            <Image src={data?.img} priority fill className="rounded-md w-[100%] h-[100%] max-h-[450px] object-cover"  alt={data?.title}/>
          </div>
          <div dangerouslySetInnerHTML={{__html: data?.content}} className="mt-[20px] text-md"></div>
        </div>
      )}
    </div>
  )
}
