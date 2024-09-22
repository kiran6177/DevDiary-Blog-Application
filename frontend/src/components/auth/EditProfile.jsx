"use client"
import useFetch from "@/hooks/fetch";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SmallButton from "../Button/SmallButton";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

function EditProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("Developer");

  const { data, loading, error, fetchData } = useFetch();

const {user,setUser} = useAuth();

useEffect(()=>{
    if(user){
        setName(user?.name)
        setEmail(user?.email)
        setDesignation(user?.designation)
    }
},[user])

useEffect(()=>{
  if(data?.success){
    setUser(data.success);
    toast.success("Profile Updated Successfully.",{duration:1000});
  }
},[data])

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    fetchData("/api/auth/profile",JSON.stringify({name,email,designation}),"PUT")
  };

  return (
    <div className="w-full flex justify-center ">
      <Toaster position="top-right" containerStyle={{ top: 90, right: 50 }} />
      <form
        onSubmit={handleUpdateSubmit}
        className="border-2 rounded-md border-black p-5 w-[90%] sm:w-[75%] md:w-[65%] lg:w-[45%] xl:w-[35%] flex flex-col gap-5 bg-[#fcf8f8]"
      >
        <div className="flex justify-center overflow-hidden">
          <Image
            priority
            src={"/LoginLogo.jpg"}
            alt="LoginLogo"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col px-5 gap-1">
          <label htmlFor="#name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="inp-type1"
          />
        </div>
        <div className="flex flex-col px-5 gap-1">
          <label htmlFor="#email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="inp-type1"
          />
        </div>
        <div className="flex flex-col px-5 gap-1">
          <label htmlFor="#designation">Designation</label>
          <select
            id="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="select-type1"
          >
            <option value="Developer">Developer</option>
            <option value="Student">Student</option>
          </select>
        </div>
        
        <div className="px-5">
          {error && <p className="text-xs text-red-700">{error}</p>}
        </div>
        <SmallButton
          title={loading ? "Loading..." : "UPDATE"}
          type={"submit"}
          styles={"tracking-widest"}
        />
      </form>
    </div>
  );
}

export default EditProfile;
