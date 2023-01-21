"use client";

import { Post } from "@/typing";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import PostIndividual from "../main/Posts/PostIndividual";

const ProfilePosts = ({ user }: { user: any }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  async function getUsersPosts(user: any) {
    const postsRef = collection(db, "posts");
    const q = query(
      postsRef,
      where("createdBy", "==", { email: user.email, id: user.userId, image: user.image, name: user.name })
    );
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
    getUsersPosts(user);
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

export default ProfilePosts;
