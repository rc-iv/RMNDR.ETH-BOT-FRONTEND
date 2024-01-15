import React, { useState } from "react";
import { Event } from "../page";
import { on } from "events";

interface EventCardProps {
  event: Event;
  userId: string;
  onEdit: (event: Event) => void;
}

const EventCard = ({ event, userId, onEdit }: EventCardProps) => {
  const dateString = parseDateTime(event.eventDateTime);
  const links = findLinks(event.description);
  const description = removeLinks(event.description);

  const subscribeHandler = async (subscribeOption: string) => {
    const payload = {
      eventId: event.id,
      guildId: event.guild,
      userId: userId,
    };
    const url = `https://f7rymis8k3.execute-api.us-east-1.amazonaws.com/default/rmndrbot-${subscribeOption}ToEvent`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    // reload page using nextjs
    window.location.reload();

    // if response is ok, pop up a success message, otherwise pop up an error message
    if (response.ok) {
      alert(`Successfully ${subscribeOption}d to event!`);
    } else {
      alert(`Failed to ${subscribeOption} to event.`);
    }
  };

  const handleEditClick = () => {
    onEdit(event);
  };

  return (
    <div className="md:w-full bg-slate-700 rounded-lg p-3">
      <div className="my-2">
        <h1 className="text-2xl font-bold">{event.eventName}</h1>
      </div>
      <div className="text-xl">
        <h2>Type</h2>
      </div>
      <div className="my-2 bg-slate-600">
        <p className="">{event.eventType}</p>
      </div>
      <div className="text-xl">
        <p>Description</p>
      </div>
      <div className="my-2 bg-slate-600">
        <p className="break-all">{description}</p>
      </div>
      <div className="text-xl">
        <p>Links</p>
      </div>
      <div className="my-2 bg-slate-600">
        {links.map((link) => {
          return (
            <div key={link}>
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="break-all text-xs text-blue-300"
              >
                {link}
              </a>
            </div>
          );
        })}
      </div>
      <div className="text-xl">
        <p>Event Date</p>
      </div>
      <div className="my-2 bg-slate-600">
        <p className="">{dateString}</p>
      </div>
      <div className="text-xl">
        <p>Chain</p>
      </div>
      <div className="my-2 bg-slate-600">
        <p className="">{event.chain}</p>
      </div>
      <div className="text-xl">
        <p>Creator</p>
      </div>
      <div className="my-2 bg-slate-600">
        <p className="">{event.creatorName}</p>
      </div>
      <div className="flex justify-between text-center mt-5">
        {event.subscribedUsers.includes(userId) ? (
          <button
            className="bg-red-500 w-1/4 rounded-md text-sm"
            onClick={() => subscribeHandler("unsubscribe")}
          >
            Unsubscribe ({event.subscribedUsers.length})
          </button>
        ) : (
          <button
            className="bg-green-500 w-1/4 rounded-md text-sm"
            onClick={() => subscribeHandler("subscribe")}
          >
            Subscribe ({event.subscribedUsers.length})
          </button>
        )}

        <div
          className="bg-blue-500 w-1/4 rounded-md text-sm"
          onClick={handleEditClick}
        >
          Edit
        </div>
        <div className="bg-blue-500 w-1/4 rounded-md text-sm">Delete</div>
      </div>
    </div>
  );
};

const parseDateTime = (dateTime: string) => {
  // Datetime passed in at UTC Time in form of YYYY-MM-DDTHH:MM:SSZ
  // Convert to local time
  const date = new Date(dateTime);
  // convert date to string
  return date.toString();
};

const findLinks = (description: string) => {
  const links = [];
  const regex = /(https?:\/\/[^\s]+)/g;
  let match = regex.exec(description);
  while (match != null) {
    links.push(match[0]);
    match = regex.exec(description);
  }
  return links;
};

const removeLinks = (description: string) => {
  const regex = /(https?:\/\/[^\s]+)/g;
  return description.replace(regex, "");
};
export default EventCard;
