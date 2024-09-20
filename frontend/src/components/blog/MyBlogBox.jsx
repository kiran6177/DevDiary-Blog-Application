"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { IoCreateOutline } from 'react-icons/io5';
import { MdOutlineOpenInNew } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import useFetch from '@/hooks/fetch';
import toast, { Toaster } from 'react-hot-toast';
import { useBlog } from '@/context/BlogContext';

const dateTimeOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: true 
  };

function MyBlogBox({blog}) {
  const router = useRouter();
  const {data,error,loading,fetchData} = useFetch();
  const {myBlog,setMyBlog} = useBlog();

  useEffect(()=>{
    if(data?.deleted){
      toast.success("Blog Deleted Successfully.",{duration:1000})
      setTimeout(()=>{
        const newMyBlog = [...myBlog];
        const deletedBlogs = newMyBlog.filter(myblog=>myblog._id !== blog._id)
        setMyBlog(deletedBlogs)
        localStorage.setItem("myBlog",JSON.stringify(deletedBlogs))
      },1000)
    }
  },[data])

  return (
    <div className='relative border-2 border-black rounded-md w-full p-4 flex flex-col gap-2' >
      <Toaster position="top-right" containerStyle={{ top: 90, right: 50 }} />
        <AiOutlineDelete onClick={()=>fetchData(`/api/blog/${blog?._id}`,"_","DELETE")} className='text-gray-600 w-[1.5rem] h-[1.5rem] absolute right-28 cursor-pointer hover:text-black transition-all duration-100 ease-linear  '  />
        <IoCreateOutline onClick={()=>router.push(`/editblog/${blog._id}`)} className='text-gray-600 w-[1.5rem] h-[1.5rem] absolute right-16 cursor-pointer hover:text-black transition-all duration-100 ease-linear  ' />
        <MdOutlineOpenInNew onClick={()=>router.push(`/viewblog/${blog._id}`)} className='text-gray-600 w-[1.5rem] h-[1.5rem] absolute right-5 cursor-pointer hover:text-black transition-all duration-100 ease-linear  ' />
      <h1 className='font-semibold tracking-widest text-xl overflow-hidden text-ellipsis whitespace-nowrap'>{blog?.title}</h1>
      <h6 className='text-xs text-gray-600' >{new Date(blog?.createdAt).toLocaleDateString("en-US",dateTimeOptions)}</h6>
      <p className='text-sm  overflow-hidden text-ellipsis whitespace-nowrap'>
        {blog?.brief}
        </p>
    </div>
  )
}

export default MyBlogBox
