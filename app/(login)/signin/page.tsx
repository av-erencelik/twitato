"use client";
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
const SignIn = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading" && !session) {
      signIn("google");
    }
    if (status !== "loading" && session) {
      window.close();
    }
  }, [session, status]);

  return <div>signIn</div>;
};

export default SignIn;
