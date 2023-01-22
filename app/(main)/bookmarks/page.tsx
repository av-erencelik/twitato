import BookmarkedPosts from "@/components/bookmarks/BookmarkedPosts";

const page = () => {
  return (
    <div className="min-h-[1000px] xl:w-[60%] w-full flex flex-col bg-gray-100">
      <BookmarkedPosts />
    </div>
  );
};

export default page;
