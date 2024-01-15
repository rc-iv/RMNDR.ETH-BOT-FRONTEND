"use client";
import React, { useEffect, useState } from "react";
import GuildDropdown from "./ui/guildDropdown";
import { Guild } from "@/lib/auth";
import { Event } from "../page";
import EventCard from "./eventCard";
import EditEventModal from "./ui/editEventModal";
import { convertToUTC, validateDateTime } from "@/lib/utils";
interface EventFrameProps {
  mutualGuilds: Guild[];
  events: Event[];
  userId: string;
}

const EventFrame = ({ mutualGuilds, events, userId }: EventFrameProps) => {
  const [selectedGuild, setSelectedGuild] = useState(mutualGuilds[0].id);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
  };

  const handleModalClose = () => {
    setEditingEvent(null);
  };

  const handleSave = (updatedEvent: Event, originalEvent: Event) => {

    if (userId !== originalEvent.creatorId) {
      alert("You are not the creator of this event.");
      return;
    }
    // loop through keys in event and compare to original event
    const updatedFields = {} as Event;
    for (const key in updatedEvent) {
      if (updatedEvent[key] !== originalEvent[key]) {
        updatedFields[key] = updatedEvent[key];
      }
    }
    console.log(`Updated fields: ${JSON.stringify(updatedFields)}`);

    // check is eventDate or eventTime has changed
    if (updatedFields.eventDate || updatedFields.eventTime) {
      if (!validateDateTime(updatedEvent.eventDate, updatedEvent.eventTime)) {
        alert("Invalid date and or time. Please use the format MM-DD-YYYY HH:MM");
        return;
      }
      // convert to UTC
      const convertedDateTime = convertToUTC(
        updatedEvent.eventDate,
        updatedEvent.eventTime,
        originalEvent.eventTimezone
      );
      console.log(`original event time: ${originalEvent.eventDateTime}`)
      console.log(`Converted date time: ${convertedDateTime}`);
      if (convertedDateTime === "Invalid date") {
        alert("Invalid date and or time. Please use the format MM-DD-YYYY HH:MM");
        return;
      }
      updatedFields.eventDateTime = convertedDateTime;
    }

    const payload = {
      eventId: originalEvent.id,
      guildId: originalEvent.guild,
      updatedFields: updatedFields,
    };
    const url =
      "https://f7rymis8k3.execute-api.us-east-1.amazonaws.com/default/rmndrbot-editEvent";

    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      cache: "no-store",
    }).then((response) => {
      if (response.ok) {
        alert("Successfully updated event!");
        window.location.reload();
      } else {
        alert("Failed to update event.");
      }
    });

    setEditingEvent(null);
  };

  useEffect(() => {
    if (selectedGuild === "all") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(
        events.filter((event) => event.guild === selectedGuild)
      );
    }
  }, [selectedGuild]);
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
        <div className="flex flex-wrap justify-center gap-x-5">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event.eventName} className="w-2/5 my-2 p-2">
                <EventCard
                  event={event}
                  userId={userId}
                  onEdit={handleEditEvent}
                />
              </div>
            ))
          ) : (
            <p className="text-white text-center w-full">
              No events available for this guild.
            </p>
          )}
        </div>
      </div>
      {editingEvent && (
        <EditEventModal
          event={editingEvent}
          isOpen={editingEvent != null}
          onClose={handleModalClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default EventFrame;
