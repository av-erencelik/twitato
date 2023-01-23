"use client";
import { Post } from "@/typing";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import PostIndividual from "../main/Posts/PostIndividual";
import Modal from "../modal/Modal";

const MainTrends = ({ hashtag }: { hashtag: { params: { hashtag: string } } }) => {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState<Post[] | []>([]);
  async function getPosts() {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("hashtags", "array-contains", `#${hashtag.params.hashtag}`));
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
    getPosts();
  }, []);
  return (
    <div className="flex flex-col md:gap-10 gap-5 mt-10">
      {posts.map((post, index) => {
        return <PostIndividual setShowModal={setShowModal} key={index as any} post={post} />;
      })}
      {showModal && <Modal setOpenModal={setShowModal} />}
    </div>
  );
};

export default MainTrends;
