"use client";
import Link from "next/link";
import { IoHomeOutline, IoBookmarkOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiUser } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Menu = () => {
  const { data: session, status }: { data: any; status: any } = useSession();
  const pathname = usePathname();
  return (
    <div className="w-full">
      <Link
        href="/"
        className={`flex items-center gap-3 p-3 ${
          pathname == "/" ? "bg-gray-100 rounded-md text-sky-600 font-semibold" : ""
        }`}
      >
        <IoHomeOutline className="text-xl" />
        <span className="hidden xl:block">Home</span>
      </Link>
      {session && (
        <>
          <Link
            href="/notifications"
            className={`flex items-center gap-3 p-3 ${
              pathname == "/notifications" ? "bg-gray-100 rounded-md text-sky-600 font-semibold" : ""
            }`}
          >
            <IoMdNotificationsOutline className="text-xl" />
            <span className="hidden xl:block">Notifications</span>
          </Link>
          <Link
            href="/bookmarks"
            className={`flex items-center gap-3 p-3 ${
              pathname == "/bookmarks" ? "bg-gray-100 rounded-md text-sky-600 font-semibold" : ""
            }`}
          >
            <IoBookmarkOutline className="text-xl" />
            <span className="hidden xl:block">Bookmarks</span>
          </Link>
          <Link
            href={`/profile/${session.user.id}`}
            className={`flex items-center gap-3 p-3 ${
              pathname == `/profile/${session.user.id}` ? "bg-gray-100 rounded-md text-sky-600 font-semibold" : ""
            }`}
          >
            <BiUser className="text-xl" />
            <span className="hidden xl:block">Profile</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default Menu;
