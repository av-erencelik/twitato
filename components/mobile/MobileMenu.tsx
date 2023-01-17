"use client";
import Link from "next/link";
import { IoHomeOutline, IoBookmarkOutline } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const MobileMenu = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  return (
    <div className="fixed left-0 bottom-0 sm:hidden flex justify-around w-full bg-white border-t border-gray-200">
      <Link
        href="/"
        className={`flex items-center gap-3 p-3 ${
          pathname == "/" ? "bg-gray-100 rounded-full text-sky-600 font-semibold" : ""
        }`}
      >
        <IoHomeOutline className="text-xl" />
      </Link>
      {session && (
        <>
          <Link
            href="/messages"
            className={`flex items-center gap-3 p-3 ${
              pathname == "/messages" ? "bg-gray-100 rounded-full text-sky-600 font-semibold" : ""
            }`}
          >
            <FiMessageSquare className="text-xl" />
          </Link>
          <Link
            href="/bookmarks"
            className={`flex items-center gap-3 p-3 ${
              pathname == "/bookmarks" ? "bg-gray-100 rounded-full text-sky-600 font-semibold" : ""
            }`}
          >
            <IoBookmarkOutline className="text-xl" />
          </Link>
          <Link
            href="/profile"
            className={`flex items-center gap-3 p-3 ${
              pathname == "/profile" ? "bg-gray-100 rounded-full text-sky-600 font-semibold" : ""
            }`}
          >
            <BiUser className="text-xl" />
          </Link>
        </>
      )}
    </div>
  );
};

export default MobileMenu;
