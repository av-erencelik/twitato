import { db } from "@/components/firebase";
import { Post } from "@/typing";
import { collection, getDocs, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import moment from "moment";
import PostsClientSide from "./PostsClientSide";

async function getPosts() {
  const postsRef = collection(db, "posts");
  const q = query(postsRef, orderBy("date", "desc"), limit(5));
  const querySnapshot = await getDocs(q);
  const posts: Post[] = [];
  querySnapshot.forEach((doc) => {
    const post = doc.data();
    post.date = post.date.toDate().toString();
    posts.push(post as Post);
  });
  return posts;
}
export const revalidate = 60;

const PostsServerSide = async () => {
  const serverPosts = await getPosts();
  return <PostsClientSide serverPosts={serverPosts} />;
};

export default PostsServerSide;
