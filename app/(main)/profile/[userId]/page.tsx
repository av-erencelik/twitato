import ProfileContainer from "@/components/Profile/ProfileContainer";

export const dynamic = "force-dynamic";
const page = (userId: any) => {
  return (
    <div className="min-h-[1000px] xl:w-[60%] w-full flex flex-col bg-gray-100">
      <ProfileContainer userId={userId} />
    </div>
  );
};

export default page;
