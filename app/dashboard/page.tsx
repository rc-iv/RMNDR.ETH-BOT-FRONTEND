import React from "react";
import GuildDropdown from "./guildDropdown";

export default function Usage() {
  return (
    <div className="bg-gradient-to-r from-green-700 to-blue-700 h-screen">
      <div className="container mx-auto p-4">Dashboard:</div>
      <GuildDropdown />
    </div>
  );
}
