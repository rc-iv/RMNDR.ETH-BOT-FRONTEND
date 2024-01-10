import React from "react";
import { FaDiscord, FaTwitter } from 'react-icons/fa';

const Navbar = () => {
    return (
      <nav className="bg-slate-700 p-6 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">RMNDR.ETH</h1>
          <div className="flex items-center gap-4">
            {/* Discord Icon with link */}
            <a href="https://discord.gg/EEPfDWj4" target="_blank" rel="noopener noreferrer" aria-label="Discord">
              <FaDiscord className="text-2xl hover:text-blue-400" />
            </a>
            {/* Twitter Icon with link */}
            <a href="https://twitter.com/rmndrbot" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter className="text-2xl hover:text-blue-400" />
            </a>
          </div>
        </div>
      </nav>
    );
}
  
export default Navbar;