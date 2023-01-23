import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import MainNotification from "./MainNotification";

async function getNotifications(userId: string) {
  const notificationsRef = doc(db, "notifications", userId);
  const notificationDoc = await getDoc(notificationsRef);
  return notificationDoc.data();
}
export const revalidate = 0;

const MainNotifications = async () => {
  const session = await unstable_getServerSession(authOptions);
  if (!session) {
    return <div></div>;
  }
  const notificationData = await getNotifications(session.user.id);
  return (
    <div className="bg-gray-100 rounded-md p-4 flex flex-col gap-0">
      <h3 className="text-center text-sky-600 font-bold">Notifications</h3>
      <div className="h-[1px] mt-1 bg-sky-600" />
      {notificationData!.notifications.reverse().map((notification: any, index: number) => {
        return <MainNotification key={index as any} notification={notification} />;
      })}
    </div>
  );
};

export default MainNotifications;
