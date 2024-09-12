import LoginForm from '@/components/auth/LoginForm';
import React from 'react'

export const metadata = {
    title:"Login | DevDiary",
    description:"Login Page for User Authentication in DevDiary."
}

export default function page() {
    console.log("Login");
    
  return (
    <div className='pt-[13rem] px-[3rem] flex flex-col justify-start items-center h-screen gap-3 '>
        <h2 className='text-xl'>Login to Continue</h2>
        <LoginForm/>
    </div>
  )
}

