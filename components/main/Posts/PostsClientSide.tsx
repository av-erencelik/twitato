"use client";

import { db } from "@/components/firebase";
import {
  collection,
  DocumentData,
  endBefore,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Post } from "@/typing";
import PostIndividual from "./PostIndividual";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";

const PostsClientSide = ({ serverPosts }: { serverPosts: Post[] }) => {
  const [posts, setPosts] = useState(serverPosts);
  const [loadMore, setLoadMore] = useState(false);
  const [lastQueryDoc, setLastQueryDoc] = useState<null | QueryDocumentSnapshot<DocumentData>>(null);
  const [firstQueryDoc, setFirstQueryDoc] = useState<null | QueryDocumentSnapshot<DocumentData>>(null);
  const [newPosts, setNewPosts] = useState<Post[]>([]);
  async function getPostsOnLoad() {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("date", "desc"), limit(5));
    const querySnapshot = await getDocs(q);
    const posts: Post[] = [];
    querySnapshot.forEach((doc) => {
      const post = doc.data();
      post.date = post.date.toDate().toString();
      posts.push(post as Post);
    });
    setFirstQueryDoc(querySnapshot.docs[0]);
    setLastQueryDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setPosts(posts);
  }
  async function getPostsOnLoadMore() {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("date", "desc"), startAfter(lastQueryDoc), limit(5));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return;
    }
    const posts: Post[] = [];
    querySnapshot.forEach((doc) => {
      const post = doc.data();
      post.date = post.date.toDate().toString();
      posts.push(post as Post);
    });
    setLastQueryDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setPosts((prev) => [...prev, ...posts]);
    setLoadMore(false);
  }
  function loadNewPosts() {
    setPosts((prev) => [...newPosts, ...prev]);
    setNewPosts([]);
  }
  useEffect(() => {
    getPostsOnLoad();
  }, []);
  useEffect(() => {
    if (!loadMore) {
      return;
    }
    getPostsOnLoadMore();
  }, [loadMore]);
  useEffect(() => {
    if (!firstQueryDoc) {
      return;
    }
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("date", "desc"), endBefore(firstQueryDoc), limit(1));
    const unsub = onSnapshot(q, (qsnapshot) => {
      const posts: Post[] = [];
      qsnapshot.forEach((doc) => {
        const post = doc.data();
        post.date = post.date.toDate().toString();
        posts.push(post as Post);
        setFirstQueryDoc(doc);
      });
      setNewPosts((prev) => [...posts, ...prev]);
    });
    return () => {
      unsub();
    };
  }, [firstQueryDoc]);
  return (
    <div className="flex flex-col gap-10 mt-10">
      {newPosts?.length > 0 ? <button onClick={loadNewPosts}>Load New {newPosts?.length}</button> : null}
      <AnimateSharedLayout>
        <AnimatePresence>
          {posts.map((post) => (
            <motion.div
              key={post.postId}
              layout
              initial="pre"
              animate="visible"
              variants={{ pre: { opacity: 0 }, visible: { opacity: 1 } }}
              transition={{ duration: 0.5 }}
            >
              <PostIndividual post={post}></PostIndividual>
            </motion.div>
          ))}
        </AnimatePresence>
      </AnimateSharedLayout>

      <button onClick={() => setLoadMore((prev) => !prev)}>Load More</button>
    </div>
  );
};

export default PostsClientSide;
