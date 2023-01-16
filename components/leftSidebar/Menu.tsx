"use client";
import Link from "next/link";
import { IoHomeOutline, IoBookmarkOutline } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { usePathname } from "next/navigation";

const Menu = () => {
  const pathname = usePathname();
  return (
    <div>
      <Link
        href="/"
        className={`flex items-center gap-3 p-3 ${
          pathname == "/" ? "bg-gray-100 rounded-md text-sky-600 font-semibold" : ""
        }`}
      >
        <IoHomeOutline className="text-xl" />
        <span>Home</span>
      </Link>
      <Link
        href="/messages"
        className={`flex items-center gap-3 p-3 ${
          pathname == "/messages" ? "bg-gray-100 rounded-md text-sky-600 font-semibold" : ""
        }`}
      >
        <FiMessageSquare className="text-xl" />
        <span>Messages</span>
      </Link>
      <Link
        href="/bookmarks"
        className={`flex items-center gap-3 p-3 ${
          pathname == "/bookmarks" ? "bg-gray-100 rounded-md text-sky-600 font-semibold" : ""
        }`}
      >
        <IoBookmarkOutline className="text-xl" />
        <span>Bookmarks</span>
      </Link>
      <Link
        href="/profile"
        className={`flex items-center gap-3 p-3 ${
          pathname == "/profile" ? "bg-gray-100 rounded-md text-sky-600 font-semibold" : ""
        }`}
      >
        <BiUser className="text-xl" />
        <span>Profile</span>
      </Link>
    </div>
  );
};

export default Menu;
