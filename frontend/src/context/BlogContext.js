"use client"
import React, { useContext, useEffect, useState } from "react";

const Context = React.createContext(null);

export const BlogProvider = ({children})=>{
    const [myBlog,setMyBlog] = useState(null);
    const [blogs,setBlogs] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        if(localStorage.getItem("myBlog")){
            setMyBlog(JSON.parse(localStorage.getItem("myBlog")))
            setLoading(false)
            return
        }else{
            setLoading(false);
        }
    },[])

    useEffect(()=>{
        if(localStorage.getItem("blogs")){
            setBlogs(JSON.parse(localStorage.getItem("blogs")))
            setLoading(false)
            return
        }else{
            setLoading(false);
        }
    },[])


    return (
        <Context.Provider value={{blogs,myBlog,loading,setBlogs,setMyBlog}}>
            {children}
        </Context.Provider>
    )
}

export const useBlog = () => useContext(Context); 