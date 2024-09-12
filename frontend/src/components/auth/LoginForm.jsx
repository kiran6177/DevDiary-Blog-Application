"use client"

import Image from "next/image"
import SmallButton from "../Button/SmallButton"
import { useEffect, useState } from "react"
import useFetch from "@/hooks/fetch";

export default function LoginForm() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {data,loading,error,fetchData} = useFetch();

    const handleLoginSubmit = (e)=>{
        e.preventDefault();
        console.log(email,password);
        fetchData('/api/auth/login',{email,password},"POST")
        
    }

    useEffect(()=>{
        console.log(loading,error,data);
    },[data,error,loading])

  return (
    <div className="w-screen flex justify-center ">
      <form onSubmit={handleLoginSubmit} className="border-2 rounded-md border-black p-5 w-[35%] flex flex-col gap-5 bg-[#fcf8f8]">
        <div className="flex justify-center overflow-hidden">
            <Image priority src={'/LoginLogo.jpg'} alt="LoginLogo" width={100} height={100} className="rounded-full" />
        </div>
        <div className="flex flex-col px-5 gap-1">
            <label htmlFor="#email">Email</label>
            <input type="text" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="inp-type1" />
        </div>
        <div className="flex flex-col px-5 gap-1">
            <label htmlFor="#password">Password</label>
            <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="inp-type1" />
        </div>
        <div className="px-5">
            {error && <p className="text-xs text-red-700">{error}</p>}
        </div>
        <SmallButton title={loading ? 'Loading...' :'Login'} type={'submit'} />
      </form>
    </div>
  )
}

