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
    <div>
      {newPosts?.length > 0 ? <button onClick={loadNewPosts}>Load New {newPosts?.length}</button> : null}
      {posts.map((post) => (
        <div key={post.postId}>{post.postText}</div>
      ))}
      <button onClick={() => setLoadMore((prev) => !prev)}>Load More</button>
    </div>
  );
};

export default PostsClientSide;
