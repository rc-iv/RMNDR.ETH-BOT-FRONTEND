import { getServerSession } from "next-auth";
import React from "react";
import { authConfig } from "@/lib/auth";
import { Guild, ExtendedUser } from "@/lib/auth";

const GuildDropdown = async () => {
  const session = await getServerSession(authConfig);
  const user = session!.user as ExtendedUser;
  const userGuilds = user.guilds as Guild[];

  const botGuildsResponse = await fetch(
    "https://discord.com/api/v8/users/@me/guilds",
    {
      headers: {
        Authorization: "Bot " + process.env.DISCORD_BOT_TOKEN!,
      },
    }
  );

  const botGuilds = await botGuildsResponse.json();

  console.log(`userGuilds: ${JSON.stringify(userGuilds)}`);
  console.log(`botGuilds: ${JSON.stringify(botGuilds)}`);

  // find mutual guilds by id
  const mutualGuilds = userGuilds.filter((guild) =>
    botGuilds.some((botGuild : Guild) => botGuild.id === guild.id)
  );

  return (
    <select className="w-auto text-black">
      {mutualGuilds.map((guild) => (
        <option key={guild.id} value={guild.id}>
          {guild.name}
        </option>
      ))}
    </select>
  );
};

export default GuildDropdown;
