"use client";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function DiscordSignInButton() {
  const { status, data: session } = useSession();

  const handleSignInClick = () => {
    signIn("discord");
  };

  const handleSignOutClick = () => {
    signOut();
  };
  return (
    <>
      {status === "loading" && (
        <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium">
          Loading...
        </button>
      )}
      {status === "unauthenticated" && (
        <button
          className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium"
          onClick={handleSignInClick}
        >
          Sign in with Discord
        </button>
      )}
      {status === "authenticated" && (
        <>
          <Link href="/dashboard">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium">
              Dashboard
            </button>
          </Link>
          <button
            className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium"
            onClick={handleSignOutClick}
          >
            Sign Out
          </button>
        </>
      )}
    </>
  );
}
