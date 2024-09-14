"use client"
import useFetch from "@/hooks/fetch";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SmallButton from "../Button/SmallButton";
import LongButton from "../Button/LongButton";
import Section from "./Section";
import { useRouter } from "next/navigation";

function WriteBlog() {
    const router = useRouter();
    const {data,error,loading,fetchData} = useFetch();
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');

    const [sections,setSections] = useState([]);

    useEffect(()=>{
      if(data?.success){
        toast.success("Blog Posted Successfully.",{duration:1000});
        setTimeout(()=>{
          router.push("/")
        },1000)
      }
    },[data])


    const handleAddSection = ()=>{
        setSections([...sections,{}])
    }

    const handleAddSectionData = (data,index)=>{
        const newSections = [...sections];
        newSections[index] = data;
        setSections(newSections)
    }

    const handleCreateBlog = (e)=>{
      e.preventDefault();

      const formData = new FormData();
      formData.append("title",title);
      formData.append("brief",description);

      sections.forEach((section,index)=>{
        formData.append(`sections[${index}][type]`,section.type);

        if(section.type === "SUBTITLE"){
          formData.append(`sections[${index}][content]`,section.subtitle);
        }else if(section.type === "DESCRIPTION"){
          formData.append(`sections[${index}][content]`,section.description);
        }else{
          formData.append(`${index}`,section.image);
        }
      })
      fetchData('/api/blog',formData,"POST");
    }

  return (
    <div className="w-full flex justify-center ">
      <Toaster position="top-right" containerStyle={{ top: 90, right: 50 }} />
      <form
        onSubmit={handleCreateBlog}
        className=" border-2 border-black rounded-sm py-10 p-5 w-[100%] flex flex-col gap-5 bg-[#fcf8f8]"
      >
        
        <div className="flex flex-col px-5 gap-1">
          <label htmlFor="#title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="inp-type1"
          />
        </div>
        <div className="flex flex-col px-5 gap-1">
          <label htmlFor="#desc">Description</label>
          <textarea id="desc" className="textarea-type1" value={description} rows={5} onChange={(e)=>setDescription(e.target.value)}></textarea>
        </div>
        {
            sections.map((_,index)=>{
                return(
                    <Section key={index} index={index} serveSectionData={handleAddSectionData} />
                )
            })
        }
        <div className="flex justify-center">
            <SmallButton title={'Add Section'} type={'button'}  clickHandler={handleAddSection} />
        </div>

        <div className="px-5">
          {error && <p className="text-xs text-red-700">{error}</p>}
        </div>
        <LongButton
          title={loading ? "Loading..." : "POST"}
          type={"submit"}
          styles={"tracking-widest "}
        />
      </form>
    </div>
  );
}

export default WriteBlog;
