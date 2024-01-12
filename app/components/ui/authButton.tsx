"use client";
import { signIn } from "next-auth/react";

export function DiscordSignInButton(){
const handleClick = () => {
    signIn("discord");
}
return (
    <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium" onClick={handleClick}>
        Sign in with Discord
    </button>
)
}