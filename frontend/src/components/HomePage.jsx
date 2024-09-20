"use client";
import { useBlog } from "@/context/BlogContext";
import useFetch from "@/hooks/fetch";
import React, { useEffect } from "react";
import BlogBox from "./blog/BlogBox";

function HomePage() {
  const { blogs, setBlogs } = useBlog();
  const { data, error, loading, fetchData } = useFetch();

  useEffect(() => {
    fetchData("/api/blog");
  }, []);

  useEffect(() => {
    if (data) {
      setBlogs(data?.blogs);
    }
  }, [data]);

  return <div className="flex flex-col gap-4">
    {
        blogs?.length > 0 && blogs.map(blog=>{
            return <BlogBox key={blog?._id} blog={blog} />
        })
    }
  </div>;
}

export default HomePage;
