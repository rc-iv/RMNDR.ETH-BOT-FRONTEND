import { Guild } from "@/lib/auth";
import React from "react";

interface GuildDropdownProps {
  guildList: Guild[];
  onGuildChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const GuildDropdown = ({ guildList, onGuildChange }: GuildDropdownProps) => {
  return (
    <>
      <div className="m-2">
        <strong className="text-2xl text-white mx-2">Server:</strong>
        <select className="w-auto text-black" onChange={onGuildChange}>
          {guildList.map((guild) => (
            <option key={guild.id} value={guild.id}>
              {guild.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default GuildDropdown;
