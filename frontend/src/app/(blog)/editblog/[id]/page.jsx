import ProtectedRoutes from "@/components/auth/ProtectedRoutes";
import Edit from "@/components/blog/Edit";

export default function Page({ params }) {
  const { id } = params;
  return (
    <ProtectedRoutes>
      <div className="pt-[8rem] pb-[7rem] px-[3rem] flex flex-col justify-start  min-h-screen gap-3 ">
        <h2 className="text-xl">Edit Your Blog</h2>
        <Edit id={id} />
      </div>
    </ProtectedRoutes>
  );
}
