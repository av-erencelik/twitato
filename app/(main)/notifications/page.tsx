import MainNotifications from "@/components/notifications/MainNotifications";

const page = () => {
  return (
    <div className="min-h-[1000px] xl:w-[60%] w-full flex flex-col bg-gray-100 md:p-10 p-3">
      {/* @ts-expect-error Server Component */}
      <MainNotifications />
    </div>
  );
};

export default page;
