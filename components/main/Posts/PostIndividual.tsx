"use client";

import { Post } from "@/typing";
import Image from "next/image";
import moment from "moment";
import { HiHeart } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { MdOutlineBookmarkAdded } from "react-icons/md";
const PostIndividual = ({ post }: { post: Post }) => {
  const coloredWords = post.postText.split(" ").map((word, index) => {
    if (word[0] === "#") {
      return (
        <span className="text-sky-600" key={index}>
          {word}{" "}
        </span>
      );
    }
    return word + " ";
  });
  return (
    <div className="bg-white rounded-2xl p-5 pb-2">
      <div className="flex gap-2 items-center">
        <Image src={post.createdBy?.image as string} alt="createdBy" width={40} height={40} className="rounded-full" />
        <div>
          <h3 className="font-semibold text-sm">{post.createdBy?.name}</h3>
          <h6 className="text-[0.70rem]">{moment(post.date).fromNow()}</h6>
        </div>
      </div>
      <div className="mt-5 text-sm font-normal">
        <p>{coloredWords}</p>
      </div>
      {post.postImg && (
        <div className="w-full flex justify-center mt-5 relative h-[300px] overflow-hidden">
          <Image src={post.postImg} alt="post img" style={{ objectFit: "contain" }} fill className="rounded-lg" />
        </div>
      )}
      <div className="md:mt-4 md:mb-2 mt-2 mb-1 h-[1px] bg-gray-100" />
      <div className="flex gap-4 text-sky-600 items-center">
        <div className="hover:bg-gray-100 p-2 rounded-full cursor-pointer transition-all">
          <HiOutlineHeart className="text-2xl" />
        </div>
        <div className="hover:bg-gray-100 p-[0.6rem] rounded-full cursor-pointer transition-all">
          <FaRegComment className="text-xl" />
        </div>
        <div className="hover:bg-gray-100 p-[0.6rem] rounded-full cursor-pointer transition-all">
          <MdOutlineBookmarkAdd className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default PostIndividual;
