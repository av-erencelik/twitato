"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, useState, FormEvent } from "react";
import { BiImageAdd } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import PostsSuspense from "../suspense/PostsSuspense";
import { v4 as uuidv4 } from "uuid";
import writePost from "@/libs/writePost";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
const PostInput = () => {
  const { data: session, status }: { data: any; status: any } = useSession();
  const [img, setImg] = useState<undefined | File>(undefined);
  const [text, setText] = useState<string>("");
  const [hashtags, setHashtag] = useState<RegExpMatchArray | null>(null);
  const [error, setError] = useState("");
  if (status === "loading") {
    return <PostsSuspense />;
  }
  function onImgUpload(e: ChangeEvent<HTMLInputElement>) {
    setImg(e.target.files![0]);
  }
  function onTextInput(e: ChangeEvent<HTMLTextAreaElement>) {
    setError("");
    setText(e.target.value.trim());
    setHashtag(e.target.value.trim().match(/#[\p{L}]+/giu));
  }
  async function onPostSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (text.trim().length <= 0 && !img) {
      setError("You can't submit an empty post!");
      return;
    }
    if (hashtags && hashtags.length >= 3) {
      setError("You can't add more than two hashtag!");
      return;
    }
    if (hashtags?.length != new Set(hashtags).size) {
      setError("You can't add same hashtag for more than once");
      return;
    }

    const post: Post = {
      postId: uuidv4(),
      postText: text,
      postImg: "",
      hashtags: hashtags ? hashtags : [],
      createdBy: session?.user,
      likes: [],
    };
    const storageRef = ref(storage, post.postId);
    if (img) {
      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          post.postImg = downloadUrl;
        });
      });
    }
    await writePost(post);

    setText("");
    setImg(undefined);
    setHashtag(null);
    const textInput = document.getElementById("textInput") as HTMLTextAreaElement;
    textInput.value = "";
  }
  return (
    <>
      {session && (
        <div className="w-full bg-white rounded-2xl md:p-5 p-2">
          <form onSubmit={onPostSubmit}>
            <div className="flex justify-center gap-2 mb-2">
              {hashtags &&
                hashtags.map((hashtag, index) => {
                  return (
                    <div
                      key={index}
                      className="text-xs p-2 bg-gray-200 text-gray-600 border border-gray-600 rounded-sm "
                    >
                      {hashtag}
                    </div>
                  );
                })}
            </div>

            <div>
              <div className="flex gap-4">
                <div className="flex flex-col justify-center">
                  <Image
                    src={session.user?.image as string}
                    alt="profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>

                <textarea
                  placeholder="Share a something..."
                  className="w-full bg-gray-100 rounded-xl p-2 placeholder:text-xs outline-none border-2 border-gray-200 focus:border-sky-600 placeholder:font-normal text-xs font-normal"
                  cols={10}
                  rows={2}
                  style={{ resize: "none" }}
                  onChange={onTextInput}
                  maxLength={240}
                  id="textInput"
                />
              </div>
              <div className="flex justify-end mr-3">
                <p className={`text-[0.7rem] ${text.length >= 240 ? "text-red-700" : "text-sky-600"}`}>
                  {text.length}/240
                </p>
              </div>
              {img && (
                <div className="overflow-hidden my-2 relative w-[250px] mx-auto">
                  <Image src={URL.createObjectURL(img)} alt="img" width={250} height={250} className="rounded-lg" />
                  <IoClose
                    className="absolute top-2 right-2 text-2xl text-white bg-gray-900 hover:bg-gray-600 transition-all cursor-pointer rounded-full"
                    onClick={() => setImg(undefined)}
                  />
                </div>
              )}
            </div>

            <div className="md:mt-4 md:mb-2 mt-2 mb-1 h-[1px] bg-gray-100" />
            <div className="flex gap-1 justify-between items-center">
              <label htmlFor="img" className="cursor-pointer hover:bg-gray-200 p-2 rounded-full transition-all">
                <BiImageAdd className="text-2xl text-sky-600" />
              </label>
              <input
                type="file"
                alt="Img"
                width="48"
                height="48"
                className="hidden"
                id="img"
                name="img"
                accept="image/*"
                onChange={onImgUpload}
              />
              {error && <p className="text-xs text-red-700">{error}</p>}

              <button
                type="submit"
                className="text-sm px-3 py-2 font-semibold hover:bg-gray-100 transition-all rounded-md text-sky-600"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default PostInput;
