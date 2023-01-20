import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Notification from "./Notification";

async function getNotifications(userId: string) {
  const notificationsRef = doc(db, "notifications", userId);
  const notificationDoc = await getDoc(notificationsRef);
  return notificationDoc.data();
}
export const revalidate = 0;

const Notifications = async () => {
  const session = await unstable_getServerSession(authOptions);
  if (!session) {
    return <div></div>;
  }
  const notificationData = await getNotifications(session.user.id);
  const recentNotificationData = [
    notificationData!.notifications[notificationData!.notifications.length - 1],
    notificationData!.notifications[notificationData!.notifications.length - 2],
    notificationData!.notifications[notificationData!.notifications.length - 3],
    notificationData!.notifications[notificationData!.notifications.length - 4],
  ];
  return (
    <div className="bg-gray-100 rounded-md p-4 flex flex-col gap-0">
      <h3 className="text-center text-sky-600">My Activity</h3>
      <div className="h-[1px] mt-1 mb-2 bg-sky-600" />
      {recentNotificationData!.map((notification: any, index: number) => {
        return <Notification key={index as any} notification={notification} />;
      })}
    </div>
  );
};

export default Notifications;
