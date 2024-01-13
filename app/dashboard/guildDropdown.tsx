import { Guild } from "@/lib/auth";
import React, { useState } from "react";

interface GuildDropdownProps {
  guildList: Guild[];
  onGuildChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const GuildDropdown = ({ guildList, onGuildChange }: GuildDropdownProps) => {
  return (
    <select className="w-auto text-black" onChange={onGuildChange}>
      {guildList.map((guild) => (
        <option key={guild.id} value={guild.id}>
          {guild.name}
        </option>
      ))}
    </select>
  );
};

export default GuildDropdown;
