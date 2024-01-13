import React from "react";
import GuildDropdown from "./guildDropdown";

export default function Usage() {
  return (
    <div className="flex justify-between bg-gradient-to-r from-green-700 to-blue-700 h-screen">
      <div className="container p-4 w-1/5 bg-slate-800">
        <span className="mx-2">Server:</span>
        <GuildDropdown />
      </div>
      <div>Main Content</div>
    </div>
  );
}
