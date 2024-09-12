"use client"
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'

export default function ProtectedRoutes({children}) {
    const {user} = useAuth();
    const router = useRouter();

    // useEffect(()=>{
    //     if(!user){
    //         router.push('/login')
    //     }
    // },[user])

  return  !user ? children : null
  
}

