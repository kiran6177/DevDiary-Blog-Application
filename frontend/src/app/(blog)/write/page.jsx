import ProtectedRoutes from "@/components/auth/ProtectedRoutes";
import WriteBlog from "@/components/blog/WriteBlog";

export default function Page() {
  return (
    <ProtectedRoutes>
      <div className="pt-[8rem] pb-[7rem] px-[3rem] flex flex-col justify-start  min-h-screen gap-3 ">
        <h2 className="text-xl">Write Your Blog</h2>
        <WriteBlog/>
      </div>
    </ProtectedRoutes>
  );
}
