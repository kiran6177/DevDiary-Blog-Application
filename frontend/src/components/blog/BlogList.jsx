import React, { useEffect } from "react";
import MyBlogBox from "./MyBlogBox";
import useFetch from "@/hooks/fetch";
import { useBlog } from "@/context/BlogContext";
import Loading from "../Loading";

function BlogList() {
  const { data, loading, error, fetchData } = useFetch();
  const { myBlog, setMyBlog } = useBlog();
  useEffect(() => {
    fetchData("/api/blog/getmyblog");
  }, []);

  useEffect(() => {
    setMyBlog(data?.myBlogs);
    localStorage.setItem("myBlog",JSON.stringify(data?.myBlogs))
  }, [data]);

  return (
    <div className="flex flex-col gap-5 h-full my-8">
      {
        (myBlog?.length > 0 && !loading) ? myBlog.map(blog=>{
          return <MyBlogBox  key={blog?._id} blog={blog} />
        }) :
        (myBlog?.length === 0 && !loading) ?
        <div className="flex justify-center items-center "><p>NO BLOGS</p></div>
        : <Loading />
      }
    </div>
  );
}

export default BlogList;
