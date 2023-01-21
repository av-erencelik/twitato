import { db } from "@/components/firebase";
import Profile from "@/components/Profile/Profile";
import ProfilePosts from "@/components/Profile/ProfilePosts";
import { doc, getDoc } from "firebase/firestore";
import { notFound } from "next/navigation";

async function getProfileInfos(userId: string) {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);
  if (!userDoc.exists()) {
    return undefined;
  }
  const user = userDoc.data();
  user.date = user.date.toDate().toISOString();
  return user;
}

const page = async ({ params }: { params: { userId: string } }) => {
  const userData = await getProfileInfos(params.userId);
  if (!userData) {
    notFound();
  }
  return (
    <div className="min-h-[1000px] xl:w-[60%] w-full flex flex-col bg-gray-100">
      {/* @ts-expect-error Server Component */}
      <Profile user={userData} />
      <ProfilePosts user={userData} />
    </div>
  );
};

export default page;
