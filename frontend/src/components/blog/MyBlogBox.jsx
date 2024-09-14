"use client"
import React from 'react'
import { MdOutlineOpenInNew } from "react-icons/md";
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

function MyBlogBox() {
  return (
    <div className='relative border-2 border-black rounded-md w-full p-4 flex flex-col gap-2' >
        <MdOutlineOpenInNew className='text-gray-600 w-[1.5rem] h-[1.5rem] absolute right-5 cursor-pointer hover:text-black transition-all duration-100 ease-linear  ' />
      <h1 className='font-semibold tracking-widest text-xl'>Title</h1>
      <h6 className='text-xs text-gray-600' >{new Date().toLocaleDateString("en-US",dateTimeOptions)}</h6>
      <p className='text-sm  overflow-hidden text-ellipsis whitespace-nowrap'>
        So you want to allow image uploads in your app/site? This quick guide aims to help you set up a REST endpoint to do exactly this using Cloudinary, Express and Multer. I’m assuming prior experience with Node and Express so we can get to the point quickly and get you on your way with whatever you’re working on.
        So you want to allow image uploads in your app/site? This quick guide aims to help you set up a REST endpoint to do exactly this using Cloudinary, Express and Multer. I’m assuming prior experience with Node and Express so we can get to the point quickly and get you on your way with whatever you’re working on.
        So you want to allow image uploads in your app/site? This quick guide aims to help you set up a REST endpoint to do exactly this using Cloudinary, Express and Multer. I’m assuming prior experience with Node and Express so we can get to the point quickly and get you on your way with whatever you’re working on.
        So you want to allow image uploads in your app/site? This quick guide aims to help you set up a REST endpoint to do exactly this using Cloudinary, Express and Multer. I’m assuming prior experience with Node and Express so we can get to the point quickly and get you on your way with whatever you’re working on.
        So you want to allow image uploads in your app/site? This quick guide aims to help you set up a REST endpoint to do exactly this using Cloudinary, Express and Multer. I’m assuming prior experience with Node and Express so we can get to the point quickly and get you on your way with whatever you’re working on.
        So you want to allow image uploads in your app/site? This quick guide aims to help you set up a REST endpoint to do exactly this using Cloudinary, Express and Multer. I’m assuming prior experience with Node and Express so we can get to the point quickly and get you on your way with whatever you’re working on.
        So you want to allow image uploads in your app/site? This quick guide aims to help you set up a REST endpoint to do exactly this using Cloudinary, Express and Multer. I’m assuming prior experience with Node and Express so we can get to the point quickly and get you on your way with whatever you’re working on.
        So you want to allow image uploads in your app/site? This quick guide aims to help you set up a REST endpoint to do exactly this using Cloudinary, Express and Multer. I’m assuming prior experience with Node and Express so we can get to the point quickly and get you on your way with whatever you’re working on.
        
        </p>
    </div>
  )
}

export default MyBlogBox
