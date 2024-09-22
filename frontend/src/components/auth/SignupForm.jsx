"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import SmallButton from "../Button/SmallButton";
import useFetch from "@/hooks/fetch";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("Developer");
  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");
  const { data, loading, error, fetchData } = useFetch();

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    fetchData(
      "/api/auth/signup",
      JSON.stringify({ name, email, designation, password, cPassword }),
      "POST"
    );
  };

  useEffect(() => {
    if (data?.success) {
      toast.success("Account Created Successfully.");
    }
  }, [data]);

  return (
    <div className="w-full flex justify-center ">
      <Toaster position="top-right" containerStyle={{top:90,right:50}} />
      <form
        onSubmit={handleSignupSubmit}
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
        <div className="flex flex-col px-5 gap-1">
          <label htmlFor="#password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="inp-type1"
          />
        </div>
        <div className="flex flex-col px-5 gap-1">
          <label htmlFor="#cpassword">Confirm Password</label>
          <input
            type="password"
            id="cpassword"
            value={cPassword}
            onChange={(e) => setCpassword(e.target.value)}
            className="inp-type1"
          />
        </div>
        <div className="px-5">
          {error && <p className="text-xs text-red-700">{error}</p>}
        </div>
        <SmallButton
          title={loading ? "Loading..." : "SIGNUP"}
          type={"submit"}
          styles={"tracking-widest"}
        />
        <p className="text-xs mx-auto">
          Already Have An Account ?{" "}
          <span className="text-blue-600">
            {" "}
            <Link href={"/login"}>Login</Link>{" "}
          </span>
        </p>
      </form>
    </div>
  );
}
