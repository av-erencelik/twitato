import { db } from "@/components/firebase";
import { runTransaction, doc, increment, getDoc, setDoc, updateDoc } from "firebase/firestore";

export default async function writePost(post: Post) {
  const postRef = doc(db, "posts", post.postId);
  try {
    await writeHashtags(post.hashtags);
    const status = await runTransaction(db, async (transaction) => {
      transaction.set(postRef, post);
    });
  } catch (e) {
    console.log(e);
  }
}
export async function writeHashtags(hashtags: [] | RegExpMatchArray) {
  hashtags.map(async (hashtag) => {
    const hashtagRef = doc(db, "trends", hashtag);
    const hashtagDoc = await getDoc(hashtagRef);
    if (!hashtagDoc.exists()) {
      await setDoc(hashtagRef, { number: 1 });
    } else {
      await updateDoc(hashtagRef, { number: increment(1) });
    }
  });
}
