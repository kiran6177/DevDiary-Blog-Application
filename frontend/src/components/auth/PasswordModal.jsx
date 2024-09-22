"use client";
import React, { useEffect, useState } from "react";
import LongButton from "../Button/LongButton";
import toast from "react-hot-toast";
import { passwordRegex } from "@/app/api/config";
import useFetch from "@/hooks/fetch";
import { ImCross } from "react-icons/im";

function PasswordModal({setShowPassword}) {
  const [oPassword, setOPassword] = useState("");
  const [newPass, setNewPass] = useState("");
  const {data,loading,error,fetchData} = useFetch();

  const handleChangePassword = (e)=>{
    e.preventDefault();
    if(oPassword.trim() === "" || newPass.trim() === ""){
        toast.error("Please fill the fields!!")
        return
    }
    if(!passwordRegex.test(newPass)){
        toast.error("Invalid Password!!")
        return
    }
    fetchData("/api/auth/changepass",JSON.stringify({oPassword,newPass}),"PUT")
  }

  useEffect(()=>{
    if(error){
        toast.error(error)
        return
    }
    if(data?.success){
        toast.success("Password Updated Successfully.",{duration:1000});
        setTimeout(()=>{
            setShowPassword(false)
        },1000)
        return
    }
  },[data,error])


  return (
    <div className="fixed inset-0 w-screen min-h-screen flex justify-center items-center bg-[#00000060]">
      <form onSubmit={handleChangePassword} className="w-[40%] bg-white border-black border-2 rounded-md p-5 flex flex-col gap-4 relative">
        <ImCross onClick={()=>setShowPassword(false)} className="w-[1.5rem] h-[1.5rem] absolute -top-6 -right-9 cursor-pointer" />
        <div className="flex flex-col px-5 gap-1">
          <label htmlFor="#opassword">Old Password</label>
          <input
            type="password"
            id="opassword"
            value={oPassword}
            onChange={(e) => setOPassword(e.target.value)}
            className="inp-type1"
          />
        </div>
        <div className="flex flex-col px-5 gap-1">
          <label htmlFor="#newpassword">New Password</label>
          <input
            type="password"
            id="newpassword"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            className="inp-type1"
          />
        </div>
          <LongButton title={"CHANGE"} type={"submit"} />
      </form>
    </div>
  );
}

export default PasswordModal;
