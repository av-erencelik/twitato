import MainTrends from "@/components/trends/MainTrends";

const page = (hashtag: any) => {
  return (
    <div className="min-h-[1000px] xl:w-[60%] w-full flex flex-col bg-gray-100 md:p-10 p-3">
      <MainTrends hashtag={hashtag} />
    </div>
  );
};

export default page;
