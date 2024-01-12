// pages/api/bot-guilds.js
import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";
import { Guild } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  // Fetch guilds for your Discord bot using the Discord API
  // You'll need to use your bot's token for authorization
  const botGuildsResponse = await fetch(
    "https://discord.com/api/v8/users/@me/guilds",
    {
      headers: {
        Authorization: process.env.DISCORD_BOT_TOKEN!,
      },
    }
  );

  const botGuilds = await botGuildsResponse.json();

  // Only send back necessary information, such as guild IDs
  const botGuildIds = botGuilds.map((guild: Guild) => guild.id);

  return NextResponse.json(botGuildIds);
}