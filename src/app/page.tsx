"use server";

import { useChat } from "ai/react";
import { SignIn } from "../components/signInButton";
import { SignOut } from "../components/signOutButton";
import { auth } from "../auth";

export default async function Page() {
  const session = await auth();
  return (
    <>
      {session && session.user ? <SignOut /> : <SignIn />}
      {session && session.user && (
        <img src={session.user.image ?? ""} alt="User Avatar" />
      )}
    </>
  );
}
