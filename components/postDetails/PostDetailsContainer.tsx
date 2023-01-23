"use client";
import { Post } from "@/typing";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import Modal from "../modal/Modal";
import PostDetails from "./PostDetails";
const PostDetailsContainer = ({ postId }: { postId: { params: { postId: string } } }) => {
  const [showModal, setShowModal] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  async function getPost() {
    console.log(postId);
    const postsRef = doc(db, "posts", postId.params.postId);
    const docSnapshot = await getDoc(postsRef);
    setPost(docSnapshot.data() as Post);
  }
  useEffect(() => {
    getPost();
  }, []);
  return (
    <div>
      {post && <PostDetails setShowModal={setShowModal} post={post as Post} />}

      {showModal && <Modal setOpenModal={setShowModal} />}
    </div>
  );
};

export default PostDetailsContainer;
