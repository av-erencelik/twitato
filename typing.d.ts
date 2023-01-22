import { Timestamp } from "firebase/firestore";

export interface Post {
  postId: string;
  postText: string;
  postImg: string;
  hashtags: [] | RegExpMatchArray;
  createdBy:
    | {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
        id?: string | null | undefined;
      }
    | undefined;
  likes: never[];
  date: Timestamp;
  commentsLength: number;
  lastComment: { commentText: string; user: any; date: Timestamp } | "";
  bookmarkedBy: never[];
}
