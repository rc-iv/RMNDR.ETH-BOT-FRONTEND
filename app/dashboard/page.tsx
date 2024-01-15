"use server";
import React from "react";
import EventFrame from "./components/eventFrame";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { Guild, ExtendedUser } from "@/lib/auth";

export interface Event {
  [key:string] : any;
  id: string;
  guild: string;
  chain: string;
  channelId: string;
  channelName: string;
  description: string;
  eventDate: string;
  eventDateTime: string;
  eventName: string;
  eventTime: string;
  eventTimezone: string;
  eventType: string;
  subscribedUsers: string[];
  creatorId: string;
  creatorName: string;
}

export default async function Dashboard() {
  const session = await getServerSession(authConfig);
  const user = session!.user as ExtendedUser;
  const mutualGuilds = await getMutualGuilds(user.guilds!);
  const events = await getAllEvents(mutualGuilds);

  return (
    <div className="bg-gradient-to-r from-green-700 to-blue-700 min-h-screen">
      <div>
        <EventFrame
          mutualGuilds={mutualGuilds}
          events={events}
          userId={user.id!}
        />
      </div>
    </div>
  );
}

const getMutualGuilds = async (userGuilds: Guild[]) => {
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
    console.error("botGuilds is not an array:", botGuilds);
    throw new Error("Invalid bot guilds response");
  }

  // find mutual guilds by id
  const filteredGuilds = userGuilds.filter((guild) =>
    botGuilds.some((botGuild) => botGuild.id === guild.id)
  );
  const allGuildsOption = {
    id: "all",
    name: "All",
    isOwner: false,
  } as Guild;
  filteredGuilds.unshift(allGuildsOption);
  console.log(filteredGuilds);
  return filteredGuilds; 
};

const getAllEvents = async (guildList: Guild[]) => {
  const url =
    "https://f7rymis8k3.execute-api.us-east-1.amazonaws.com/default/rmndrbot-getEventsForGuild";
  const eventList = [] as Event[];

  for (const guild of guildList) {
    const body = {
      guildId: guild.id,
    };

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      cache: "no-store",
    });

    // check if the response is valid, skip guild if not
    if (!response.ok) {
      console.error(
        `Failed to get events for guild ${guild.id}: ${response.statusText}`
      );
      continue;
    }

    const data = await response.json();
    for (const event of data) {
      const tempEvent = {} as Event;
      tempEvent.id = event.pk;
      tempEvent.guild = event.sk;
      tempEvent.chain = event.chain;
      tempEvent.channelId = event.channelId;
      tempEvent.channelName = event.channelName;
      tempEvent.description = event.description;
      tempEvent.eventDate = event.eventDate;
      tempEvent.eventDateTime = event.eventDateTime;
      tempEvent.eventName = event.eventName;
      tempEvent.eventTime = event.eventTime;
      tempEvent.eventTimezone = event.eventTimezone;
      tempEvent.eventType = event.eventType;
      tempEvent.subscribedUsers = event.subscribedUsers;
      tempEvent.creatorId = event.userId;
      tempEvent.creatorName = event.userName;

      console.log(JSON.stringify(tempEvent));
      eventList.push(tempEvent);
    }
  }

  // sort events by date
  eventList.sort((a, b) => {
    const aDate = new Date(a.eventDateTime);
    const bDate = new Date(b.eventDateTime);
    return aDate.getTime() - bDate.getTime();
  });

  return eventList;
};
