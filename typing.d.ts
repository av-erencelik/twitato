import { Timestamp } from "firebase/firestore";

interface Post {
  postId: string;
  postText: string;
  postImg: string;
  hashtags: [] | RegExpMatchArray;
  createdBy:
    | {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | undefined;
  likes: never[];
  date: Timestamp;
}
