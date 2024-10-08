"use client"
import { useAuth } from '@/context/AuthContext'
import { montserrat } from '@/fonts';
import React from 'react'
import { FaUser } from 'react-icons/fa';
import { RiLoginCircleLine } from 'react-icons/ri';
import { IoCreateOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation';

const Header = () => {
    const {user} = useAuth();
    const router = useRouter();

  return (
    <header className="fixed w-screen bg-[#fffbfb] min-h-[5rem] z-40">
        <nav className="px-12 py-5 flex items-center justify-between">
        <div>
            <h1 className={`font-bold text-3xl ${montserrat.className} antialiased cursor-pointer`} onClick={()=>router.push("/")}>DevDiary</h1>
        </div>
        <div className='flex items-center gap-8 w-[70%] justify-end'>
            <IoCreateOutline onClick={()=>router.push('/write')} className="w-[1.5rem] h-[1.5rem] cursor-pointer" />
            {user ? 
            <FaUser onClick={()=>router.push('/profile')} className="w-[1.5rem] h-[1.5rem] cursor-pointer"/>
            :
            <RiLoginCircleLine onClick={()=>router.push('/login')} className="w-[1.5rem] h-[1.5rem] cursor-pointer" /> 
            }
        </div>
        </nav>
    </header>
  )
}

export default Header
