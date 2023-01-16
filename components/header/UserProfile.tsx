"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { signOut, useSession } from "next-auth/react";
import NewWindow from "react-new-window";
const Loader = () => (
  <div className="my-flex">
    <div className="circle"></div>
    <div className="lines">
      <div className="line"></div>
    </div>
  </div>
);
const UserProfile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [popup, setPopUp] = useState(false);
  const { data: session, status } = useSession();
  function handleModal() {
    setModalOpen((prev) => !prev);
  }
  useEffect(() => {
    if (session) {
      setPopUp(false);
    }
  }, [session]);
  if (status == "loading" && !session) {
    return <Loader />;
  }
  return (
    <div className="relative">
      {session ? (
        <div className="flex md:gap-4 gap-2 items-center text-sm font-semibold cursor-pointer" onClick={handleModal}>
          <div className="flex gap-2 items-center">
            <Image src={session.user?.image as string} alt="profile" width={40} height={40} className="rounded-full" />
            <h3 className="hidden md:block">{session.user?.name}</h3>
          </div>
          <BsChevronDown className="text-base mt-1 md:block hidden" />
        </div>
      ) : (
        <button
          className="flex items-center gap-2 py-2 px-3 rounded-2xl hover:bg-gray-200 text-sm transition-all"
          onClick={() => setPopUp(true)}
        >
          <FcGoogle className="text-base" /> Sign in with Google
        </button>
      )}

      {modalOpen && (
        <motion.div
          className="border-x border-b border-gray-200 absolute z-10 right-0 bg-white flex justify-end w-[75px] rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {session ? (
            <button className="flex items-center gap-2 p-3 text-sm" onClick={() => signOut()}>
              Log out
            </button>
          ) : null}
        </motion.div>
      )}
      {popup && !session ? (
        <NewWindow
          url="/signin"
          onOpen={(e) => {
            const popupTick = setInterval(() => {
              if (e.closed) {
                clearInterval(popupTick);
                setPopUp(false);
              }
            }, 500);
          }}
        />
      ) : null}
    </div>
  );
};

export default UserProfile;
