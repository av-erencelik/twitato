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
  let recentNotificationData = [];
  if (notificationData!.notifications.length >= 4) {
    recentNotificationData.push(notificationData!.notifications[notificationData!.notifications.length - 1]);
    recentNotificationData.push(notificationData!.notifications[notificationData!.notifications.length - 2]);
    recentNotificationData.push(notificationData!.notifications[notificationData!.notifications.length - 3]);
    recentNotificationData.push(notificationData!.notifications[notificationData!.notifications.length - 4]);
  } else {
    recentNotificationData = notificationData!.notifications.reverse();
  }

  return (
    <div className="bg-gray-100 rounded-md p-4 flex flex-col gap-0">
      <h3 className="text-center text-sky-600">My Activity</h3>
      <div className="h-[1px] mt-1 mb-2 bg-sky-600" />
      {recentNotificationData!.map((notification: any, index: number) => {
        return <Notification key={index as any} notification={notification} />;
      })}
      {notificationData!.notifications.length == 0 && <p className="text-center">No activity</p>}
    </div>
  );
};

export default Notifications;
