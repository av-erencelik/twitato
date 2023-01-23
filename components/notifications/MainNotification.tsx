import Image from "next/image";
import Link from "next/link";
import DeleteNotiButton from "./DeleteNotiButton";

const MainNotification = ({ notification }: { notification: any }) => {
  return (
    <Link
      href={`/post/${notification.postId}`}
      className="hover:bg-white transition-all py-2 px-2 border-b border-gray-300 border-x"
    >
      <div className="text-xs flex items-center justify-between">
        <div className="text-xs flex items-center gap-2">
          <Image
            src={notification.whom.image as string}
            alt="createdBy"
            width={60}
            height={60}
            className="rounded-full"
          />
          <p>
            <span className="text-sky-600 font-medium text-base">{notification.whom.name}</span>
            <span className="text-base">
              {notification.action == "like" ? " liked your post." : " commented on your post."}
            </span>
          </p>
        </div>

        <DeleteNotiButton notification={notification} />
      </div>
    </Link>
  );
};

export default MainNotification;
