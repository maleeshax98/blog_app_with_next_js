"use client"

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from 'react'
import { storage } from "@/firebase/firebase";
import useAddPost from "@/hooks/useAddPost";
import Image from "next/image";
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const options = [
  { value: 'Health', label: 'Health' },
  { value: 'Science', label: 'Science' },
  { value: 'Technlogoy', label: 'Technlogoy' },
  { value: 'Food', label: 'Food' },
  { value: 'Any', label: 'Any' },
];


export default function page() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [cato, setCato] = useState(null);

  const [file, setFile] = useState("")
  const [media, setMedia] = useState("")
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const upload = async () => {
      setUploading(true)
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              break;
            case 'storage/canceled':
              break;
            case 'storage/unknown':
              break;
          }
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL)
            setUploading(false)
          });
        }
      );
    }
    file && upload()
  }, [file])

  const { loading, error, add } = useAddPost()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await add(title, content, media, cato.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1 className='mt-[30px] text-2xl font-bold'>Add Post</h1>
        <h1 className='text-sm font-light mb-[50px]'>Add post and share</h1>
        <center>
          { error && <h1 className="m-[40px] font-bold text-2xl text-center text-red-700"> { error }</h1> }
        </center>
        <label>
          <p className='font-semibold text-lg'>Title</p>
          <input type="text" className='mb-[20px] w-[100%]' onChange={(e) => setTitle(e.target.value)} required/>
        </label>
        <label>
          <p className='font-semibold text-lg'>Select Category</p>
            <Select
              defaultValue={cato}
              onChange={setCato}
              options={options}
              className='mb-[20px] w-[100%]'
              required
            />
        </label>
        <div className="col-span-full">
              <label htmlFor="cover-photo" className="block  font-semibold text-lg leading-6 text-gray-900">
                Main Photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" required name="file-upload" type="file" className="sr-only" onChange={(e) => setFile(e.target.files[0])}/>
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
      </div>
      <label>
          <p className='font-semibold text-lg mt-[20px]'>Content</p>
          <ReactQuill theme="snow" value={content} onChange={setContent} className="h-[50vh]"/>
        </label>

        <br />
        <br />

        { uploading ? (
          <button className='btn cursor-not-allowed bg-green-300' disabled>Uploading...</button>
        ) : loading ? (
            <button className='btn flex items-center gap-2'>
              <Image src="/icons/spin.svg" className=" animate-spin" alt="" width={20} height={20} />
              Processing...
            </button>
        ) : (
          <button className='btn'>Publish Post</button>
        )}
    </form>
  )
}
