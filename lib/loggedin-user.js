import "server-only";

import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";
import dbConnect from "@/service/mongo";

export async function getLoggedInUser() {
  await dbConnect();
  
  const session = await auth();

  if (!session?.user) return null;

  return getUserByEmail(session?.user?.email);
}