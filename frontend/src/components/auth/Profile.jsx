"use client"
import React, { useEffect, useState } from 'react'
import SmallButton from '../Button/SmallButton'
import useFetch from '@/hooks/fetch'
import toast, { Toaster } from 'react-hot-toast';
import { redirect } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import BlogList from '../blog/BlogList';

function Profile() {
    const {data,error,loading,fetchData} = useFetch();
    const {setUser} = useAuth();
    const [selected,setSelected] = useState("ACCOUNT");

    const handleLogout = ()=>{
        console.log("CALLED");
        fetchData('/api/auth/logout')
    }

    useEffect(()=>{
        if(data?.success){
            toast.success("Logout Successfully.")
            setTimeout(()=>{
                setUser(null)
                redirect('/login')
            },1000)
            return
        }
    },[data])

  return (
    <div>
    <Toaster position="top-right" containerStyle={{top:90,right:50}} />
      <div className='flex gap-5 mt-2 mb-5' ><h3 onClick={()=>setSelected("ACCOUNT")} className={selected === "ACCOUNT" ? "font-medium cursor-pointer ":'font-normal cursor-pointer'}>Account</h3><h3 onClick={()=>setSelected("MYBLOGS")} className={selected === "MYBLOGS" ? "font-medium cursor-pointer":'font-normal cursor-pointer'}>My Blogs</h3></div>
      {
        selected === "MYBLOGS" ?
        <BlogList/>
        :
        <SmallButton title={'LOGOUT'} styles={'tracking-wider'} type={"button"} clickHandler={handleLogout} />
      }
    </div>
  )
}

export default Profile
