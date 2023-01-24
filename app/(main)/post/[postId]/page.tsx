import PostDetailsContainer from "@/components/postDetails/PostDetailsContainer";
export const dynamic = "force-dynamic";
const page = (postId: any) => {
  return (
    <div className="min-h-[1000px] xl:w-[60%] w-full flex flex-col bg-gray-100 md:p-10 p-3">
      <PostDetailsContainer postId={postId} />
    </div>
  );
};

export default page;
