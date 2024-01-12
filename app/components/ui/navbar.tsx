import React from "react";
import { FaDiscord, FaTwitter, FaQuestionCircle } from "react-icons/fa";
import Link from "next/link";
import { DiscordSignInButton } from "./authButton";

const Navbar = () => {
  return (
    <nav className="bg-slate-700 p-6 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/">RMNDR.ETH</Link>
        </h1>
        <div className="flex items-center gap-4">
          <DiscordSignInButton />
          {/* Discord Icon with link */}
          <a
            href="https://discord.gg/EEPfDWj4"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
          >
            <FaDiscord className="text-2xl hover:text-blue-400" />
          </a>
          {/* Twitter Icon with link */}
          <a
            href="https://twitter.com/rmndrbot"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter className="text-2xl hover:text-blue-400" />
          </a>
          {/* Question icon with link to usage page */}
          <Link href="/usage">
            <FaQuestionCircle className="text-2xl hover:text-blue-400" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
