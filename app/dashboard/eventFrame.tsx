"use client";
import React, { useState } from "react";
import GuildDropdown from "./guildDropdown";
import { Guild } from "@/lib/auth";
import { Event } from "./page";
import EventCard from "./eventCard";

interface EventFrameProps {
  mutualGuilds: Guild[];
  events: Event[];
}

const EventFrame = ({ mutualGuilds, events }: EventFrameProps) => {
  const [selectedGuild, setSelectedGuild] = useState(mutualGuilds[0].id);

  const filteredEvents = events.filter(
    (event) => event.guild === selectedGuild
  );

  const handleGuildChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGuild(event.target.value);
    console.log(`selected guild: ${selectedGuild}`);
  };

  console.log(events);
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/4 mb-4 md:mb-0 bg-white flex-shrink-0">
        <GuildDropdown
          guildList={mutualGuilds}
          onGuildChange={handleGuildChange}
        />
      </div>
      <div className="flex-1 bg-black">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <EventCard key={event.title} event={event} />
          ))
        ) : (
          <p className="text-center text-white">No events available for this guild.</p>
        )}
      </div>
    </div>
  );
};

export default EventFrame;
