import Image from "next/image";
import Link from "next/link";

const Notification = ({ notification }: { notification: any }) => {
  return (
    <Link href={`/post/${notification.postId}`} className="hover:bg-white transition-all py-2 px-1">
      <div className="text-xs flex items-center gap-2">
        <Image
          src={notification.whom.image as string}
          alt="createdBy"
          width={40}
          height={40}
          className="rounded-full"
        />
        <p>
          <span className="text-sky-600">{notification.whom.name}</span>
          <span>{notification.action == "like" ? " liked your post." : " commented on your post."}</span>
        </p>
      </div>
    </Link>
  );
};

export default Notification;
