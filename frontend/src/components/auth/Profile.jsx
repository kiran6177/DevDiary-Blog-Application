"use client"
import React, { useEffect } from 'react'
import SmallButton from '../Button/SmallButton'
import useFetch from '@/hooks/fetch'
import toast, { Toaster } from 'react-hot-toast';
import { redirect } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

function Profile() {
    const {data,error,loading,fetchData} = useFetch();
    const {setUser} = useAuth();

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
      <SmallButton title={'LOGOUT'} styles={'tracking-wider'} type={"button"} clickHandler={handleLogout} />
    </div>
  )
}

export default Profile
