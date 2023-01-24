"use client";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Profile from "./Profile";
import ProfilePosts from "./ProfilePosts";
import { useEffect, useState } from "react";
const ProfileContainer = (userId: any) => {
  const [userData, setUserData] = useState<any>(null);
  async function getProfileInfos() {
    const userRef = doc(db, "users", userId.userId.params.userId);
    const userDoc = await getDoc(userRef);
    const user = userDoc.data();
    setUserData(user);
  }
  useEffect(() => {
    getProfileInfos();
  }, []);
  return (
    <>
      {userData && (
        <>
          <Profile user={userData} />
          <ProfilePosts user={userData} />
        </>
      )}
    </>
  );
};

export default ProfileContainer;
