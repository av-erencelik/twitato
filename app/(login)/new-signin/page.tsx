"use client";
import { useSession } from "next-auth/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "@/components/firebase";
import { useRouter } from "next/navigation";
import { DocumentData, DocumentReference, setDoc } from "@firebase/firestore";

const Check = () => {
  const { data: session, status }: { data: any; status: any } = useSession();
  const router = useRouter();
  async function getDocAll(d: DocumentReference<DocumentData>) {
    const docSnap: any = await getDoc(d);
    if (!docSnap.data().userId) {
      sendData(d);
      router.push("/");
    } else {
      router.push("/");
    }
  }
  async function sendData(d: DocumentReference<DocumentData>) {
    await updateDoc(d, {
      userId: session!.user!.id,
    });
    await setDoc(doc(db, "notifications", session.user.id), { notifications: [] });
  }

  useEffect(() => {
    if (session) {
      const d = doc(db, "users", session.user!.id);
      getDocAll(d);
    } else if (status != "loading") {
      router.push("/");
    }
  }, [session]);
  return <div></div>;
};

export default Check;
