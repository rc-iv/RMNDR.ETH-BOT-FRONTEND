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

  const filteredEvents = events.filter((event) => event.guild === selectedGuild);
  const handleGuildChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGuild(event.target.value);
    console.log(`selected guild: ${selectedGuild}`);
  };

  console.log(events);
  return (
    <div>
      <GuildDropdown
        guildList={mutualGuilds}
        onGuildChange={handleGuildChange}
      />
      <div>
        {filteredEvents.map((event) => (
          <EventCard key={event.title} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventFrame;
