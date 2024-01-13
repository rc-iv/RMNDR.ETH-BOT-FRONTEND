import React from "react";
import EventFrame from "./eventFrame";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { Guild, ExtendedUser } from "@/lib/auth";

export interface Event {
  guild: string;
  title: string;
  type: string;
  description: string;
  chain: string;
  creator: string;
  timestamp: string;
}

export default async function Dashboard() {
  const mutualGuilds = await getMutualGuilds();
  const events = await getAllEvents(mutualGuilds);
  return (
    <div className="flex justify-between bg-gradient-to-r from-green-700 to-blue-700 min-h-screen">
      <div className="container p-4 w-1/5 bg-slate-800">Sidebar</div>
      <div>
        <EventFrame mutualGuilds={mutualGuilds} events={events}/>
      </div>
    </div>
  );
}

const getMutualGuilds = async () => {
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

  if (!Array.isArray(botGuilds)) {
    console.error('botGuilds is not an array:', botGuilds);
    throw new Error("Invalid bot guilds response");
  }

  // find mutual guilds by id
  return userGuilds.filter(guild =>
    botGuilds.some(botGuild => botGuild.id === guild.id)
  );
}

const getAllEvents = async (guildList: Guild[]) => {
  const url =
    "https://hnrkhewcy8.execute-api.us-east-1.amazonaws.com/default/rmndrBotMain";
  const eventList = [] as Event[];
  for (const guild of guildList) {
    const body = {
      guild: {
        id: guild.id,
      },
      data: {
        name: "list",
        options: [
          {
            name: "all",
            value: true,
          },
        ],
      },
    };
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const data = await response.json();
    if (data.data.content === "Here are the events I found:") {
      const components = data.data.components;
      for (const component of components) {
        const componentDetails = component.components[0].custom_id;
        const componentBody = {
          "guild": {
            "id": guild.id
          },
          "data": {
            "component_type": 2,
            "custom_id": componentDetails,
          }
        }
        const componentResponse = await fetch(url, {
          method: "POST",
          body: JSON.stringify(componentBody),
          cache: "no-store"
        })
        const eventData = await componentResponse.json();
        // raw discord timestamp
        const discordTimestamp = eventData.data.embeds[0].fields[2].value;
        // remove the first and last 3 characters
        const timestamp = discordTimestamp.substring(3, discordTimestamp.length - 3);
        const event ={
          "guild": guild.id,
          "title": eventData.data.embeds[0].title,
          "type": eventData.data.embeds[0].fields[0].value,
          "description": eventData.data.embeds[0].fields[1].value,
          "chain": eventData.data.embeds[0].fields[3].value,
          "creator": eventData.data.embeds[0].fields[4].value,
          "timestamp": timestamp,
        } as Event;
        eventList.push(event);
      }
    }
  }
  return eventList;
};
