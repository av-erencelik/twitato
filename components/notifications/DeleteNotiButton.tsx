"use client";

import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { MouseEventHandler, MouseEvent } from "react";
import { MdDelete } from "react-icons/md";
import { db } from "../firebase";
const DeleteNotiButton = ({ notification }: { notification: any }) => {
  async function deleteNotificiation(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    e.preventDefault();
    const notificationsRef = doc(db, "notifications", notification.whom.id);
    await updateDoc(notificationsRef, {
      notifications: arrayRemove(notification),
    });
  }
  return (
    <div className="p-2 hover:bg-gray-300 rounded-full transition-all" onClick={(e) => deleteNotificiation(e)}>
      <MdDelete className="text-xl text-red-700" />
    </div>
  );
};

export default DeleteNotiButton;
