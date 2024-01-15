"use client";
import React, { useState } from "react";
import GuildDropdown from "./ui/guildDropdown";
import { Guild } from "@/lib/auth";
import { Event } from "../page";
import EventCard from "./eventCard";
import SubscriberOptionDropdown from "./ui/subscribeDropdown";

interface EventFrameProps {
  mutualGuilds: Guild[];
  events: Event[];
  userId: string;
}

const EventFrame = ({ mutualGuilds, events, userId}: EventFrameProps) => {
  const [selectedGuild, setSelectedGuild] = useState(mutualGuilds[0].id);
  
  const filteredEvents = events.filter( 
    (event) => event.guild === selectedGuild
  );

  const handleGuildChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGuild(event.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="bg-slate-900">
        <GuildDropdown
          guildList={mutualGuilds}
          onGuildChange={handleGuildChange}
        />
      </div>
      <div className="flex-1 p-4">
        <div className="flex flex-wrap justify-center md:justify-between -mx-2">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event.eventName} className="w-2/5 my-2 mx-10 p-2">
                <EventCard event={event} userId={userId} />
              </div>
            ))
          ) : (
            <p className="text-white text-center w-full">
              No events available for this guild.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventFrame;
