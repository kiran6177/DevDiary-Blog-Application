import SignupForm from "@/components/auth/SignupForm";

export const metadata = {
    title:"SignUp | DevDiary",
    description:"SignUp Page for User Authentication in DevDiary."
}

export default function Page() {
    return (
        <div className="py-[7rem] px-[3rem] flex flex-col justify-start items-center min-h-screen gap-3 ">
        <h2 className='text-xl'>Create Your Account</h2>
        <SignupForm/>
        </div>
    );
}