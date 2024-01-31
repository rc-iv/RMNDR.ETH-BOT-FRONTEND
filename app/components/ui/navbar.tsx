import React from "react";
import { FaDiscord, FaTwitter, FaQuestionCircle } from "react-icons/fa";
import Link from "next/link";
import { DiscordSignInButton } from "./authButton";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-green-900 to-blue-900 p-6 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/">RMNDR.ETH</Link>
        </h1>
        <div className="flex items-center gap-4">
          {/* <DiscordSignInButton /> */}
          <a
            href="https://discord.com/api/oauth2/authorize?client_id=1192672583615783012&permissions=2147503104&scope=bot"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium"
          >
            Invite
          </a>
          {/* Discord Icon with link */}
          <a
            href="https://discord.gg/EEPfDWj4"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
          >
            <FaDiscord className="text-sm md:text-2xl hover:text-blue-400" />
          </a>
          {/* Twitter Icon with link */}
          <a
            href="https://twitter.com/rmndrbot"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter className="text-sm md:text-2xl hover:text-blue-400" />
          </a>
          {/* Question icon with link to usage page */}
          <Link href="/usage">
            <FaQuestionCircle className="text-sm md:text-2xl hover:text-blue-400" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
