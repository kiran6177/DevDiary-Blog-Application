import Profile from "@/components/auth/Profile";
import ProtectedRoutes from "@/components/auth/ProtectedRoutes";

export const metadata = {
  title: `Profile | DevDiary`,
  description: "Profile details of User.",
};

export default function Page() {
  return (
    <ProtectedRoutes>
      <div className="pt-[7rem] pb-[7rem] px-[3rem] flex flex-col justify-start  min-h-screen gap-3 ">
        <h2 className="text-2xl font-medium tracking-widest">Profile</h2>
        <div className="bg-black w-full h-[1px]" ></div>
        <Profile />
      </div>
    </ProtectedRoutes>
  );
}
