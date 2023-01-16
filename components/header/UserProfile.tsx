"use client";
import Image from "next/image";

import { BsChevronDown } from "react-icons/bs";
const UserProfile = () => {
  return (
    <div className="flex md:gap-4 gap-2 items-center text-sm font-semibold">
      <div className="flex gap-2 items-center">
        <Image src="/Img/profile.webp" alt="profile" width={40} height={40} className="rounded-full" />
        <h3 className="hidden md:block">Mehmet Eren Çelik</h3>
      </div>
      <BsChevronDown className="text-base mt-1 md:block hidden" />
    </div>
  );
};

export default UserProfile;
