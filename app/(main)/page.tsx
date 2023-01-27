import PostInput from "../../components/main/PostInput";
import PostsServerSide from "../../components/main/Posts/PostsServerSide";
export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <div className="min-h-[1000px] xl:w-[60%] md:w-[75%] w-full flex flex-col bg-gray-100 md:p-10 p-3">
      <PostInput />
      {/* @ts-expect-error Server Component */}
      <PostsServerSide />
    </div>
  );
}
