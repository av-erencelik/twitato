import { Post } from "@/typing";
import { db } from "@/components/firebase";
import {
  runTransaction,
  doc,
  increment,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from "firebase/firestore";
export default async function writePost(post: Post) {
  const postRef = doc(db, "posts", post.postId);
  const commentsRef = doc(db, "comments", post.postId);
  try {
    await writeHashtags(post.hashtags);
    const status = await runTransaction(db, async (transaction) => {
      transaction.set(postRef, post);
      transaction.set(commentsRef, { comments: [] });
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
      await setDoc(hashtagRef, { number: 1, hashtag: hashtag });
    } else {
      await updateDoc(hashtagRef, { number: increment(1) });
    }
  });
}
export async function handleLikeWrite(postId: string, user: any, createdBy: any) {
  const postRef = doc(db, "posts", postId);
  const notificationsRef = doc(db, "notifications", createdBy.id);
  try {
    await updateDoc(postRef, {
      likes: arrayUnion(user.id),
    });
    await updateDoc(notificationsRef, {
      notifications: arrayUnion({ action: "like", whom: user, postId: postId }),
    });
  } catch (e) {
    console.log(e);
  }
}
export async function handleDislikeWrite(postId: string, user: any, createdBy: any) {
  const postRef = doc(db, "posts", postId);
  const notificationsRef = doc(db, "notifications", createdBy.id);
  try {
    await updateDoc(postRef, {
      likes: arrayRemove(user.id),
    });
    await updateDoc(notificationsRef, {
      notifications: arrayRemove({ action: "like", whom: user, postId: postId }),
    });
  } catch (e) {
    console.log(e);
  }
}
export async function handleCommentWrite(
  postId: string,
  createdBy: any,
  comment: { commentText: string; user: any; date: Timestamp }
) {
  const postRef = doc(db, "posts", postId);
  const notificationsRef = doc(db, "notifications", createdBy.id);
  const commentsRef = doc(db, "comments", postId);
  try {
    await updateDoc(postRef, {
      commentsLength: increment(1),
      lastComment: comment,
    });
    await updateDoc(notificationsRef, {
      notifications: arrayUnion({ action: "comment", whom: comment.user, postId: postId }),
    });
    await updateDoc(commentsRef, {
      comments: arrayUnion(comment),
    });
  } catch (e) {
    console.log(e);
  }
}
export async function handleBookmarkWrite(postId: string, userId: string, type: string) {
  const postRef = doc(db, "posts", postId);
  if (type === "add") {
    try {
      await updateDoc(postRef, {
        bookmarkedBy: arrayUnion(userId),
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      await updateDoc(postRef, {
        bookmarkedBy: arrayRemove(userId),
      });
    } catch (e) {
      console.log(e);
    }
  }
}
