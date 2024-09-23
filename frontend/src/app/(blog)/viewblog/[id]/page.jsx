import { BLOG_BASE_URL } from "@/app/api/config";
import Image from "next/image";
import { FaUserPen } from "react-icons/fa6";

const dateTimeOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: true 
  };

async function getBlog(id) {
  try {
    const res = await fetch(BLOG_BASE_URL + `/${id}`, {
      next: { revalidate:  60 },
    });
    const blogData = await res.json();
    return blogData?.blog;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

export default async function Page({ params }) {
  const { id } = params;

  const blog = await getBlog(id);

  return (
    <div className="pt-[7rem] px-12 flex justify-center">
      <div className="w-[90%] md:w-[60%] flex flex-col gap-7 py-10">
        <h1 className="text-3xl font-bold">{blog?.title}</h1>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-center text-sm">
            <FaUserPen className="w-[1.5rem] h-[1.5rem]" />
            <h5>{blog?.user_id?.name}</h5>
          </div>
          <p className="text-xs">{new Date(blog?.createdAt).toLocaleDateString("en-US",dateTimeOptions)}</p>
        </div>
        <div className="h-[1px] w-[100%] bg-black"></div>
        {
            blog?.sections?.length > 0 && blog?.sections.map((section,i)=>{
                if(section?.type === "IMAGE" ){
                    return (
                        <div key={i} className="w-[90%] mx-auto">
                            <img src={section?.content} alt="SectionImage" className="w-full" />
                        </div>
                    )
                }else if(section?.type === "SUBTITLE" ){
                    return (
                        <div key={i} >
                            <p className="font-semibold">{section?.content}</p>
                        </div>
                    )
                }else if(section?.type === "DESCRIPTION"){
                    return (
                        <div key={i} className="leading-7">
                            <pre>{section?.content}</pre>
                        </div>
                    )
                }else{
                    return null
                }
            })
        }
      </div>
    </div>
  );
}
