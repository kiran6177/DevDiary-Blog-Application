"use client";
import React, { useEffect, useState } from "react";
import SmallButton from "../Button/SmallButton";
import useFetch from "@/hooks/fetch";
import toast, { Toaster } from "react-hot-toast";
import { redirect } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import BlogList from "../blog/BlogList";
import EditProfile from "./EditProfile";
import PasswordModal from "./PasswordModal";

function Profile() {
  const { data, error, loading, fetchData } = useFetch();
  const { setUser } = useAuth();
  const [selected, setSelected] = useState("ACCOUNT");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogout = () => {
    fetchData("/api/auth/logout");
  };

  const handleChangePassword = () =>{
    setShowPassword(true)
  }

  useEffect(() => {
    if (data?.success) {
      toast.success("Logout Successfully.");
      setTimeout(() => {
        setUser(null);
        redirect("/login");
      }, 1000);
      return;
    }
  }, [data]);

  return (
    <>
    <div>
      <Toaster position="top-right" containerStyle={{ top: 90, right: 50 }} />
      <div className="flex justify-between">
        <div className="flex gap-5 mt-2 mb-5">
          <h3
            onClick={() => setSelected("ACCOUNT")}
            className={
              selected === "ACCOUNT"
                ? "font-medium cursor-pointer "
                : "font-normal cursor-pointer"
            }
          >
            Account
          </h3>
          <h3
            onClick={() => setSelected("MYBLOGS")}
            className={
              selected === "MYBLOGS"
                ? "font-medium cursor-pointer"
                : "font-normal cursor-pointer"
            }
          >
            My Blogs
          </h3>
        </div>
        <div className="flex gap-3 py-2">
        <SmallButton
          title={"CHANGE PASSWORD"}
          styles={"tracking-wider "}
          type={"button"}
          clickHandler={handleChangePassword}
        />  
        <SmallButton
          title={"LOGOUT"}
          styles={"tracking-wider "}
          type={"button"}
          clickHandler={handleLogout}
        />
        </div>
      </div>
      {selected === "MYBLOGS" ? (
        <BlogList />
      ) : (
        <>
          <EditProfile />
        </>
      )}
    </div>
    {
      showPassword && <PasswordModal setShowPassword={setShowPassword} />
    }
    </>
  );
}

export default Profile;
