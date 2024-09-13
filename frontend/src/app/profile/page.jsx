import Profile from "@/components/auth/Profile";
import ProtectedRoutes from "@/components/auth/ProtectedRoutes";

export const metadata = {
  title: `Profile | DevDiary`,
  description: "Profile details of User.",
};

export default function Page() {
  return (
    <ProtectedRoutes>
      <div className="pt-[13rem] pb-[7rem] px-[3rem] flex flex-col justify-start items-center min-h-screen gap-3 ">
        <h2 className="text-xl">Profile</h2>
        <Profile />
      </div>
    </ProtectedRoutes>
  );
}
