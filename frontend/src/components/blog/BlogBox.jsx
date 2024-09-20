"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineOpenInNew } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
const dateTimeOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
};

function BlogBox({ blog }) {
  const [firstImage,setFirstImage] = useState("");
  const router = useRouter();

  useEffect(()=>{
    if(blog?.sections?.length > 0){
      for(let each of blog?.sections){
        if(each.type === "IMAGE"){
          setFirstImage(each.content)
          break;
        }
      }
    }
  },[blog])

  return (
    <div className="relative border-2 border-black rounded-md w-full p-4 flex flex-col lg:flex-row justify-between gap-8">
      <div className="flex flex-col gap-2 lg:w-[80%]">
        <div className="flex gap-2 text-xs lg:text-sm items-center">
          <FaRegUserCircle />
          <p>{blog?.user_id?.name}</p>
        </div>
        <MdOutlineOpenInNew onClick={()=>router.push(`/viewblog/${blog._id}`)} className="text-gray-600 w-[1.5rem] h-[1.5rem] absolute right-5 cursor-pointer hover:text-black transition-all duration-100 ease-linear  " />
        <h1 className="font-semibold tracking-widest text-sm lg:text-xl overflow-hidden text-ellipsis lg:whitespace-nowrap">
          {blog?.title}
        </h1>
        <h6 className="text-[10px] lg:text-xs text-gray-600">
          {new Date(blog?.createdAt).toLocaleDateString(
            "en-US",
            dateTimeOptions
          )}
        </h6>
        <p className="text-xs lg:text-sm  overflow-hidden text-ellipsis whitespace-nowrap">
          {blog?.brief}
        </p>
      </div>
      {firstImage && 
      <div className="lg:w-[20%] h-[150px] mr-10 flex justify-center lg:justify-end">
        <img src={firstImage} alt="Image"  className="object-contain max-h-full " />
      </div>}
    </div>
  );
}

export default BlogBox;
