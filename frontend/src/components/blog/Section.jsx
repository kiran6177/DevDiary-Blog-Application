"use client";
import React, { useEffect, useState } from "react";

function Section({index,serveSectionData}) {
  const [type, setType] = useState("SUBTITLE");
  const [description,setDescription] = useState('');
  const [image,setImage] = useState('');
  const [subtitle,setSubtitle] = useState('');

  useEffect(()=>{
    if(type === "SUBTITLE"){
      serveSectionData({type,subtitle},index)
    }else if(type === "IMAGE"){
      serveSectionData({type,image},index)
    }else{
      serveSectionData({type,description},index)
    }
  },[description,image,subtitle])

  const handleImage = (e)=>{
    console.log(e.target.files[0]);
    
    setImage(e.target.files[0])
  }


  return (
    <div>
      <div className="flex flex-col px-5 gap-1">
        <label htmlFor="#type">Type</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="select-type1"
        >
          <option value="SUBTITLE">SubTitle</option>
          <option value="IMAGE">Image</option>
          <option value="DESCRIPTION">Description</option>
        </select>
      </div>

      {
        type === "DESCRIPTION" ?
        <div className="flex flex-col px-5 gap-1">
        <label htmlFor="#desc">Enter the Description</label>
        <textarea
          id="desc"
          className="textarea-type1"
          value={description}
          rows={5}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      : type === "SUBTITLE" ?
        <div className="flex flex-col px-5 gap-1">
          <label htmlFor="#subtitle">Enter the Subtitle</label>
          <textarea
            id="subtitle"
            className="textarea-type1"
            value={subtitle}
            rows={5}
            onChange={(e) => setSubtitle(e.target.value)}
          ></textarea>
        </div>
      :
      <div className="flex flex-col px-5 gap-1">
            <label htmlFor="#image">Image</label>
            <input type="file" id="image" onChange={handleImage} className="inp-type1" />
        </div>
      }
    </div>
  );
}

export default Section;
