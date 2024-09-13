"use client"

import Image from "next/image"
import SmallButton from "../Button/SmallButton"
import { useEffect, useLayoutEffect, useState } from "react"
import useFetch from "@/hooks/fetch";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {data,loading,error,fetchData} = useFetch();

    const {user,setUser} = useAuth();
    const router = useRouter();

    const handleLoginSubmit = (e)=>{
        e.preventDefault();
        console.log(email,password);
        fetchData('/api/auth/login',{email,password},"POST")
        
    }

    useLayoutEffect(()=>{
      if(user){
        router.replace("/");
        return
      }
    },[user])

    useEffect(()=>{
      
      if(data?.user){
        toast.success("Login Successfully.",{duration:1000});
        setTimeout(()=>{
          setUser(data?.user)
          localStorage.setItem("user",JSON.stringify(data?.user))
        },1000)
      }
    },[data])    

  return (
    <div className="w-screen flex justify-center ">
      <Toaster position="top-right" containerStyle={{top:90,right:50}} />
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
        <SmallButton title={loading ? 'Loading...' :'LOGIN'} type={'submit'} styles={'tracking-widest'}/>
        <p className="text-xs mx-auto">Create New Account ? <span className="text-blue-600"> <Link href={"/signup"}>Signup</Link>  </span></p>
      </form>
    </div>
  )
}

