"use client";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";

import { BiImageAdd } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
export default function EditModal() {
  const [popUp, setPopUp] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [img, setImg] = useState<undefined | File>(undefined);
  function onImgUpload(e: ChangeEvent<HTMLInputElement>) {
    setImg(e.target.files![0]);
  }
  return (
    <>
      <button className="border rounded-full py-2 px-3 hover:text-sky-600" onClick={() => setOpenModal(true)}>
        Edit profile
      </button>
      {openModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => setOpenModal(false)}></div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative p-4 mx-auto bg-white rounded-md shadow-lg">
              <div className="sm:flex">
                <div className="mt-2 text-center sm:text-left mx-auto flex flex-col items-center gap-4">
                  <h3>There is nothing to edit yet. I will add that feature in the next updates.</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
