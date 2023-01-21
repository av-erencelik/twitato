import { authOptions } from "@/pages/api/auth/[...nextauth]";
import moment from "moment";
import { unstable_getServerSession } from "next-auth";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BsCalendar } from "react-icons/bs";
import { GoLocation } from "react-icons/go";

const Profile = async ({
  user,
}: {
  user: { date: string; email: string; emailVerified: null; image: string; name: string; userId: string } | any;
}) => {
  const session = await unstable_getServerSession(authOptions);
  if (!session) {
    notFound();
  }
  return (
    <div className="flex flex-col gap-4 bg-white">
      <div className="h-[250px] w-full bg-gray-200 flex flex-col gap-4">
        {user.bgImage && <Image src={user.bgImage} alt="user bg image" fill />}
      </div>
      <div className="px-10 flex justify-between  items-end">
        <Image src={user.image} alt="user pp" width={150} height={150} className="mt-[-100px] rounded-full" />
        {session.user.id === user.userId ? (
          <button className="border rounded-full py-2 px-3 hover:text-sky-600">Edit profile</button>
        ) : (
          <button className="border rounded-full py-2 px-3 hover:text-sky-600">Message</button>
        )}
      </div>
      <div className="px-10">
        <h3 className="font-bold text-xl">{user.name}</h3>
      </div>
      {user.bio && (
        <div className="px-10">
          <h3 className="font-normal text-xs">{user.bio}</h3>
        </div>
      )}
      <div className="flex items-center px-10 pb-10">
        {user.location && (
          <div className="flex gap-2 items-center">
            <GoLocation className="text-sm" />
            <span className="text-xs font-light">{user.location}</span>
          </div>
        )}
        <div className="flex gap-2 items-center">
          <BsCalendar className="text-sm" />
          <span className="text-xs font-light">Joined {moment(user.date).format("MMMM YYYY")}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
