"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { HiHeart } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { TiTimes } from "react-icons/ti";
import NewWindow from "react-new-window";
export default function Modal({ setOpenModal }: { setOpenModal: Dispatch<SetStateAction<boolean>> }) {
  const [popUp, setPopUp] = useState(false);
  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => setOpenModal(false)}></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="sm:flex">
              <div className="mt-2 text-center sm:text-left mx-auto flex flex-col items-center gap-4">
                <TiTimes
                  className="absolute top-2 right-2 text-2xl cursor-pointer hover:bg-gray-100 rounded-full"
                  onClick={() => setOpenModal(false)}
                />
                <HiHeart className="mx-auto text-2xl text-sky-600" />
                <div>
                  <h4 className="text-base font-medium text-gray-800">Like this post to share the love.</h4>
                  <p className="text-[12px] leading-relaxed text-gray-500 text-center">
                    Join Twitato Now to share the love!
                  </p>
                </div>

                <button
                  className="flex items-center gap-2 py-2 px-3 rounded-2xl hover:bg-gray-200 text-sm transition-all border"
                  onClick={() => setPopUp(true)}
                >
                  <FcGoogle className="text-base" /> Sign in
                  <span className="hidden md:block">with Google</span>
                </button>
                {popUp && (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
