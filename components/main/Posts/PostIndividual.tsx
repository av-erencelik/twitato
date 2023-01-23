"use client";

import { Post } from "@/typing";
import Image from "next/image";
import moment from "moment";
import { HiHeart } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { useSession } from "next-auth/react";
import { useEffect, useState, ChangeEvent, FormEvent, Dispatch, SetStateAction } from "react";
import { handleBookmarkWrite, handleCommentWrite, handleDislikeWrite, handleLikeWrite } from "@/libs/writePost";
import { Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import Link from "next/link";

const PostIndividual = ({ post, setShowModal }: { post: Post; setShowModal?: Dispatch<SetStateAction<boolean>> }) => {
  const { data: session, status }: { data: any; status: any } = useSession();
  const [likedByUser, setLikedByUser] = useState<boolean>(false);
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [newUserComments, setNewUserComments] = useState<{ commentText: string; user: any; date: Timestamp }[]>([]);
  const [bookmarkedByUser, setBookmarkedByUser] = useState(false);
  const coloredWords = post.postText.split(" ").map((word, index) => {
    if (word[0] === "#") {
      return (
        <Link
          href={`/trends/${word}`}
          className="text-sm font-bold text-sky-600 hover:underline underline-offset-2"
          key={index}
        >
          {word}{" "}
        </Link>
      );
    }
    return word + " ";
  });
  function onCommentInput(e: ChangeEvent<HTMLTextAreaElement>) {
    setComment(e.target.value.trim());
  }
  function handleLike() {
    if (!session) {
      setShowModal!(true);
      return;
    }
    if (!likedByUser) {
      handleLikeWrite(post.postId, session.user, post.createdBy);
    } else {
      handleDislikeWrite(post.postId, session.user, post.createdBy);
    }
    setLikedByUser((prev) => !prev);
  }
  function handleComment(e: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    if (comment.length <= 0) {
      return;
    }
    handleCommentWrite(post.postId, post.createdBy, {
      commentText: comment,
      user: session.user,
      date: Timestamp.now(),
    });
    (document.getElementById("comment") as HTMLTextAreaElement).value = "";
    setComment("");
    setNewUserComments((prev) => [
      {
        commentText: comment,
        user: session.user,
        date: Timestamp.now(),
      },
      ...prev,
    ]);
  }
  function handleBookmarking() {
    if (!session) {
      setShowModal!(true);
      return;
    }
    if (bookmarkedByUser) {
      handleBookmarkWrite(post.postId, session.user.id, "delete");
      setBookmarkedByUser((prev) => !prev);
    } else {
      handleBookmarkWrite(post.postId, session.user.id, "add");
      setBookmarkedByUser((prev) => !prev);
    }
  }
  useEffect(() => {
    if (session) {
      setLikedByUser(post.likes.includes(session.user.id as never));
    }
  }, [session]);
  useEffect(() => {
    if (session) {
      setBookmarkedByUser(post.bookmarkedBy.includes(session.user.id as never));
    }
  }, [session]);
  return (
    <div className="bg-white rounded-2xl p-5 pb-2 hover:bg-gray-200 transition-all cursor-pointer">
      <Link href={`/post/${post.postId}`}>
        <div className="flex gap-2 items-center">
          <Image
            src={post.createdBy?.image as string}
            alt="createdBy"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <Link href={`/profile/${post.createdBy!.id}`}>
              <h3 className="font-semibold text-sm underline-offset-1 hover:underline">{post.createdBy?.name}</h3>
            </Link>

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
      </Link>
      <div className="md:mt-4 md:mb-2 mt-2 mb-1 h-[1px] bg-gray-100" />
      <div className="flex gap-4 text-sky-600 items-center">
        <div className="transition-all flex gap-0 items-center">
          <div className="hover:bg-gray-100 p-2 rounded-full cursor-pointer transition-all" onClick={handleLike}>
            {likedByUser ? <HiHeart className="text-2xl" /> : <HiOutlineHeart className="text-2xl" />}
          </div>

          {post.likes.length > 0 ? (
            <span className="text-sm">
              {post.likes.length +
                (likedByUser && !post.likes.includes(session.user.id as never) ? 1 : 0) +
                (!likedByUser && session && post.likes.includes(session.user.id as never) ? -1 : 0)}
            </span>
          ) : (
            <span className="text-sm">{likedByUser ? 1 : null}</span>
          )}
        </div>
        <div className=" transition-all flex gap-0 items-center" onClick={() => setShowComments((prev) => !prev)}>
          <div className="hover:bg-gray-100 p-2 rounded-full cursor-pointer transition-all">
            <FaRegComment className="text-xl" />
          </div>
          {post.commentsLength > 0 ? (
            <span className="text-sm">{post.commentsLength + newUserComments.length}</span>
          ) : null}
        </div>

        <div
          className="hover:bg-gray-100 p-[0.6rem] rounded-full cursor-pointer transition-all"
          onClick={handleBookmarking}
        >
          {bookmarkedByUser ? (
            <MdOutlineBookmarkAdded className="text-2xl" />
          ) : (
            <MdOutlineBookmarkAdd className="text-2xl" />
          )}
        </div>
      </div>

      {showComments && (
        <motion.div
          className="flex flex-col mt-2 gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {session && (
            <>
              <div className="flex gap-2 items-center">
                <Image
                  src={session.user.image as string}
                  alt="createdBy"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <form className=" flex-1 flex items-center relative" onSubmit={handleComment}>
                  <textarea
                    className="rounded-2xl w-full p-3 outline-none text-xs bg-gray-100 pl-5 pr-10 border-2 border-gray-200 focus:border-sky-600"
                    placeholder="What's on your mind?"
                    cols={10}
                    rows={1}
                    style={{ resize: "none" }}
                    maxLength={240}
                    onChange={onCommentInput}
                    id="comment"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 text-xl hover:bg-white transition-all p-3 text-sky-600"
                  >
                    <IoMdSend className="text-xl" />
                  </button>
                </form>
              </div>
              <div className="flex justify-end mr-3">
                <p className={`text-[0.7rem] ${comment.length >= 240 ? "text-red-700" : "text-sky-600"}`}>
                  {comment.length}/240
                </p>
              </div>
            </>
          )}

          {newUserComments.length > 0 && (
            <div>
              {newUserComments.map((comment, index) => {
                return (
                  <div className="flex flex-col gap-2 px-2 pb-2" key={index}>
                    <div className="flex gap-2 items-center">
                      <Image src={comment.user.image} alt="createdBy" width={40} height={40} className="rounded-full" />
                      <div className="flex flex-col justify-center items-start">
                        <h3 className="font-semibold text-xs">{comment.user.name}</h3>
                        <h6 className="text-[0.60rem]">{moment(comment.date.toDate()).fromNow()}</h6>
                      </div>
                    </div>
                    <p className="text-xs ml-2 pl-[40px] text-gray-500">{comment.commentText}</p>
                    {index != newUserComments.length - 1 && (
                      <div className="md:mt-4 md:mb-2 mt-0 mb-4 h-[1px] bg-gray-200" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {post.lastComment != "" && post.lastComment && (
            <>
              <div className="flex flex-col gap-2 px-2">
                <div className="flex gap-2 items-center">
                  <Image
                    src={post.lastComment.user.image}
                    alt="createdBy"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex flex-col justify-center items-start">
                    <h3 className="font-semibold text-xs">{post.lastComment.user.name}</h3>
                    <h6 className="text-[0.60rem]">{moment(post.lastComment.date.toDate()).fromNow()}</h6>
                  </div>
                </div>
                <p className="text-xs ml-2 pl-[40px] text-gray-500">{post.lastComment.commentText}</p>
              </div>
              <Link
                href={`/posts/${post.postId}`}
                className="px-4 py-2 m-auto text-sky-600 rounded-md hover:bg-gray-100 font-semibold transition-all text-xs"
              >
                See All Comments
              </Link>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default PostIndividual;
