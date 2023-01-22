"use client";

import { Post } from "@/typing";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import PostIndividual from "../main/Posts/PostIndividual";

const BookmarkedPosts = () => {
  const { data: session, status }: { data: any; status: any } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  async function getUsersPosts() {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("bookmarkedBy", "array-contains", session?.user.id));
    const qSnapshots = await getDocs(q);
    const posts: Post[] = [];
    qSnapshots.forEach((doc) => {
      const post = doc.data();
      post.date = post.date.toDate().toString();
      posts.push(post as Post);
    });
    setPosts(posts);
  }
  useEffect(() => {
    getUsersPosts();
  }, []);
  return (
    <div className="flex flex-col md:gap-10 gap-5 mt-10 md:p-10 p-5">
      {posts.map((post) => (
        <div key={post.postId}>
          <PostIndividual post={post}></PostIndividual>
        </div>
      ))}
    </div>
  );
};

export default BookmarkedPosts;
