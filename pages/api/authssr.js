import { authOptions } from "./auth/[...nextauth]";

import { unstable_getServerSession } from "next-auth";

export default async function handle(req, res) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    const isAuth = !!session;
    res.json({ data: { auth: isAuth } });
  } catch (e) {
    console.log(e);
  }
}
